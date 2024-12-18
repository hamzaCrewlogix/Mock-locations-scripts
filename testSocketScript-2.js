const io = require("socket.io-client");
const axios = require("axios");
require('dotenv').config();
// Connect to the Socket.IO server
const socket = io(process.env.SOCKET_URL); // Update the URL if your server runs elsewhere

// Latitude and longitude array

const users = ["2659","2661"]; // Add your user IDs here
// Base object template for sending data
const baseObject = {
  activity: {
    activity: "still",
    confidence: 0,
    isMoving: false,
  },
  direction: "",
  direction_degree: "",
  live_address: {
    address: {
      "ISO3166-2-lvl3": "PK-PB",
      country: "Pakistan",
      country_code: "pk",
      district: "Lahore District",
      historical_division: "Lahore Division",
      municipality: "Model Town Tehsil",
      postcode: "57760",
      state: "Punjab",
      suburb: "Shah Jamal",
    },
    addresstype: "road",
    boundingbox: ["31.5173280", "31.5174066", "74.3407342", "74.3413798"],
    class: "highway",
    display_name: null,
    importance: 0.10000999999999993,
    lat: "31.5174066",
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
    lon: "74.3413798",
    name: "",
    osm_id: 1148336140,
    osm_type: "way",
    place_id: 211583349,
    place_rank: 26,
    type: "residential",
  },
  location: {
    activity: {
      confidence: 100,
      type: "still",
    },
    battery: {
      is_charging: true,
      level: 1,
    },
    coords: {
      accuracy: 12.1,
      altitude: 193.4,
      altitude_accuracy: 0.8,
      ellipsoidal_altitude: 193.4,
      heading: 39.2112,
      heading_accuracy: -1,
      latitude: 31.5176868,
      longitude: 74.3414852,
      speed: 0.62,
      speed_accuracy: -1,
    },
    extras: {},
    is_moving: true,
    odometer: 3666.60009765625,
    timestamp: new Date().toISOString(),
    uuid: "12074163-6ef5-445" + new Date().getTime(),
  },
  user_id: "",
};

// console.log('tiume', new Date().toISOString());
// return
// Helper function to update lat/lon in baseObject
// Helper function to update lat/lon and user ID in baseObject// Function to fetch live address
async function getLiveAddress(lat, lon) {
  try {
    const response = await axios.get(process.env.NOMINATUM_URL, {
      params: {
        lat: lat,
        lon: lon,
        format: "json",
        "accept-language": "en"
      },
    });

    const data = response.data;
    
    const address = data.address || {};
    return {
      display_name: data.display_name || "Unknown Location",
      address: {
        country: address.country || "",
        state: address.state || "",
        city: address.city || address.town || address.village || "",
        suburb: address.suburb || "",
        postcode: address.postcode || "",
      },
    };
  } catch (error) {
    console.error("Error fetching live address:", error.message);
    return null;
  }
}

// Function to calculate direction degree
function calculateBearing(lat1, lon1, lat2, lon2) {
  const toRadians = (deg) => (deg * Math.PI) / 180;
  const toDegrees = (rad) => (rad * 180) / Math.PI;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);

  const x = Math.sin(Δλ) * Math.cos(φ2);
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  let bearing = toDegrees(Math.atan2(x, y));
  bearing = (bearing + 360) % 360; // Normalize to 0–360
  return bearing;
}

// Updated loop
async function sendLocations() {
  const locations = require("./coordinates_2.json");

  for (let i = 0; i < locations.length; i++) {
    const { lat, lon } = locations[i];
    const liveAddress = await getLiveAddress(lat, lon);

    const nextCoord = locations[i + 1] || locations[0]; // Loop back to the start
    const directionDegree = calculateBearing(lat, lon, nextCoord.lat, nextCoord.lon);

    for (let user of users) {
      const dataToSend = {
        ...baseObject,
        user_id: user,
        location: {
          ...baseObject.location,
          timestamp:new Date().toISOString(),
          coords: { ...baseObject.location.coords,heading:directionDegree,latitude: lat, longitude: lon,
            speed : Math.random() * (2 - 0.62) + 0.62
           },
        },
        live_address: liveAddress || baseObject.live_address,
        direction_degree: directionDegree,
      };

      console.log(`Sending data for user ${user}:`, dataToSend, `for index ${i}`);
      socket.emit("location", dataToSend);
    }

    // Delay between iterations
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  console.log("All locations sent.");
  socket.disconnect();
}
  
  // Handle connection events
  socket.on("connect", () => {
    console.log("Connected to server.");
    sendLocations();
  });
  
  socket.on("disconnect", () => {
    console.log("Disconnected from server.");
  });
  
  socket.on("response", (data) => {
    console.log("Server response:", data);
  });
  
  // Handle errors
  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });
  
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
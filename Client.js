const mqtt = require("mqtt");
const axios = require("axios");
require('dotenv').config();

// Connect to the MQTT broker
const client = mqtt.connect(process.env.MQTT_BROKER_URL, {
  username: process.env.MQTT_USERNAME || undefined,
  password: process.env.MQTT_PASSWORD || undefined,
  // Add other options like reconnectPeriod: 1000 if needed
});

// const users = [
//     "2831", "2681", "2800", "2641", "2628", "2808", "3967", "3968", "3969", "3970",
//     "3971", "3972", "3974", "3976", "3978", "3980", "3973", "3975", "3979", "3981",
//     "3983", "2601", "2830", "2814", "4752", "5332", "4592", "5061", "5084", "4671",
//     "4705", "4583", "4683", "5176", "4801", "4989", "4985", "4438", "5293", "4925",
//     "4807", "5071", "4578", "5101", "5270", "4485", "5168", "5294", "4350", "5244",
//     "4623", "4933", "5251", "4368", "4458", "5286", "4847", "4557", "5033", "4500",
//     "4345", "4631", "5082", "4638", "4921", "5282", "5309", "5195", "5162", "4385",
//     "4674", "5143", "4460", "4435", "4377", "4747", "4681", "5104", "4573", "4703",
//     "4626", "4944", "4877", "5262", "4632", "4706", "4541", "5017", "4699", "5051",
//     "5317", "4831", "5175", "5059", "4721", "4448", "4913", "4374", "4947", "4474",
//     "5079", "4813", "5217", "4343", "4664", "4821", "5069", "5183", "4547", "4630",
//     "4800", "5075", "4702", "4793", "4517", "4906", "4710", "2670"
// ]; // Add your user IDs here

const users =['2628','2661']
// Base object template for sending data (unchanged)
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
      heading: '',
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

// Function to fetch live address (unchanged)
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

// Function to calculate direction degree (unchanged)
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

// Function to send one full trip loop (no time check here)
async function sendOneTrip(startTime) {
  const locations = require("./coordinates_1.json");
  for (let i = 0; i < locations.length; i++) {
    // Check if 1 hour has elapsed before each point
    if (Date.now() - startTime >= 3600000) { // 1 hour in ms
      return false; // Signal to stop
    }

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
          coords: { 
            ...baseObject.location.coords, 
            heading: directionDegree, 
            latitude: lat, 
            longitude: lon 
          },
          timestamp: new Date().toISOString(), // Fresh timestamp per send
        },
        live_address: liveAddress || baseObject.live_address,
        direction_degree: directionDegree,
      };

      const topic = 'location/updates'; // Shared topic matching Laravel subscriber
      client.publish(topic, JSON.stringify(dataToSend), { qos: 1 }); // QoS 1 for at-least-once
      const now = new Date();
      const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                         now.getMinutes().toString().padStart(2, '0') + ':' + 
                         now.getSeconds().toString().padStart(2, '0') + '.' + 
                         now.getMilliseconds().toString().padStart(3, '0');
      console.log(`Location published by user ${user} at ${timeString}`);
    }

    // Delay between iterations (2s to match Laravel rate limit)
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return true; // Continue
}

// Main simulation loop
async function startSimulation(startTime) {
  console.log(`Starting 1-hour location simulation at ${new Date().toISOString()}`);
  while (true) {
    const shouldContinue = await sendOneTrip(startTime);
    if (!shouldContinue) {
      console.log("1 hour simulation completed.");
      break;
    }
    // No extra delay: immediately start next trip
  }
}

// Handle connection events
client.on("connect", () => {
  const startTime = Date.now();
  startSimulation(startTime);
});

client.on("reconnect", () => {
  console.log("Reconnecting to MQTT broker...");
});

client.on("close", () => {
  console.log("Disconnected from MQTT broker.");
});

client.on("error", (error) => {
  console.error("MQTT error:", error);
});

// Optional: Listen for responses from Laravel (e.g., 'location/response')
client.subscribe('location/response', (err) => {
  if (err) {
    console.error('Failed to subscribe to responses:', err);
  }
});

client.on('message', (topic, message) => {
if (topic === 'location/response') {
    console.log('Received response from Laravel');
  }
});
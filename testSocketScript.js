const io = require("socket.io-client");

// Connect to the Socket.IO server
const socket = io("https://sdlocationupdate.serendipity.app"); // Update the URL if your server runs elsewhere

// Latitude and longitude array
const locations = [
  {
    lat: 31.5176891,
    lon: 74.3414806,
  },
  {
    lat: 31.51635,
    lon: 74.34119,
  },
  {
    lat: 31.51629,
    lon: 74.34126,
  },
  {
    lat: 31.51623,
    lon: 74.34133,
  },
  {
    lat: 31.51617,
    lon: 74.34142,
  },
  {
    lat: 31.51606,
    lon: 74.34157,
  },
  {
    lat: 31.51603,
    lon: 74.34156,
  },
  {
    lat: 31.51589,
    lon: 74.34147,
  },
  {
    lat: 31.51574,
    lon: 74.34139,
  },
  {
    lat: 31.51558,
    lon: 74.3413,
  },
  {
    lat: 31.5155,
    lon: 74.34125,
  },
  {
    lat: 31.51538,
    lon: 74.34118,
  },
  {
    lat: 31.51514,
    lon: 74.34105,
  },
  {
    lat: 31.51488,
    lon: 74.3409,
  },
  {
    lat: 31.5146,
    lon: 74.34074,
  },
  {
    lat: 31.51431,
    lon: 74.34058,
  },
  {
    lat: 31.51406,
    lon: 74.34044,
  },
  {
    lat: 31.5138,
    lon: 74.34029,
  },
  {
    lat: 31.51352,
    lon: 74.34013,
  },
  {
    lat: 31.51326,
    lon: 74.33998,
  },
  {
    lat: 31.513,
    lon: 74.33984,
  },
  {
    lat: 31.51291,
    lon: 74.33978,
  },
  {
    lat: 31.51279,
    lon: 74.33969,
  },
  {
    lat: 31.51259,
    lon: 74.33952,
  },
  {
    lat: 31.51257,
    lon: 74.33949,
  },
  {
    lat: 31.51237,
    lon: 74.33929,
  },
  {
    lat: 31.51234,
    lon: 74.33926,
  },
  {
    lat: 31.51211,
    lon: 74.33903,
  },
  {
    lat: 31.51205,
    lon: 74.33896,
  },
  {
    lat: 31.51198,
    lon: 74.33892,
  },
  {
    lat: 31.51193,
    lon: 74.33886,
  },
  {
    lat: 31.51191,
    lon: 74.33885,
  },
  {
    lat: 31.5119,
    lon: 74.33885,
  },
  {
    lat: 31.51186,
    lon: 74.33883,
  },
  {
    lat: 31.51175,
    lon: 74.33883,
  },
  {
    lat: 31.51171,
    lon: 74.33884,
  },
  {
    lat: 31.51169,
    lon: 74.33885,
  },
  {
    lat: 31.51163,
    lon: 74.33886,
  },
  {
    lat: 31.51157,
    lon: 74.33885,
  },
  {
    lat: 31.51153,
    lon: 74.33894,
  },
  {
    lat: 31.51152,
    lon: 74.33897,
  },
  {
    lat: 31.51144,
    lon: 74.33918,
  },
  {
    lat: 31.51128,
    lon: 74.33954,
  },
  {
    lat: 31.51115,
    lon: 74.33985,
  },
  {
    lat: 31.51104,
    lon: 74.34011,
  },
  {
    lat: 31.51094,
    lon: 74.34037,
  },
  {
    lat: 31.51103,
    lon: 74.34045,
  },
  {
    lat: 31.51104,
    lon: 74.34045,
  },
  {
    lat: 31.51114,
    lon: 74.34058,
  },
  {
    lat: 31.51124,
    lon: 74.34075,
  },
  {
    lat: 31.51131,
    lon: 74.34087,
  },
  {
    lat: 31.51138,
    lon: 74.34096,
  },
  {
    lat: 31.51147,
    lon: 74.34102,
  },
  {
    lat: 31.51159,
    lon: 74.34109,
  },
  {
    lat: 31.51184,
    lon: 74.34123,
  },
  {
    lat: 31.5121,
    lon: 74.34138,
  },
  {
    lat: 31.51215,
    lon: 74.34142,
  },
  {
    lat: 31.51228,
    lon: 74.34149,
  },
  {
    lat: 31.51236,
    lon: 74.34153,
  },
  {
    lat: 31.51263,
    lon: 74.34168,
  },
  {
    lat: 31.51287,
    lon: 74.34182,
  },
  {
    lat: 31.51307,
    lon: 74.34193,
  },
  {
    lat: 31.51315,
    lon: 74.34197,
  },
  {
    lat: 31.51345,
    lon: 74.34214,
  },
  {
    lat: 31.51377,
    lon: 74.34232,
  },
  {
    lat: 31.51411,
    lon: 74.34251,
  },
  {
    lat: 31.51446,
    lon: 74.3427,
  },
  {
    lat: 31.51481,
    lon: 74.3429,
  },
  {
    lat: 31.51515,
    lon: 74.34309,
  },
  {
    lat: 31.5154,
    lon: 74.34323,
  },
  {
    lat: 31.51544,
    lon: 74.34325,
  },
  {
    lat: 31.51571,
    lon: 74.34341,
  },
  {
    lat: 31.516,
    lon: 74.34357,
  },
  {
    lat: 31.51629,
    lon: 74.34374,
  },
  {
    lat: 31.5166,
    lon: 74.34391,
  },
  {
    lat: 31.51695,
    lon: 74.34411,
  },
  {
    lat: 31.51725,
    lon: 74.34428,
  },
  {
    lat: 31.51762,
    lon: 74.34449,
  },
  {
    lat: 31.51795,
    lon: 74.34468,
  },
  {
    lat: 31.51826,
    lon: 74.34486,
  },
  {
    lat: 31.51827,
    lon: 74.34486,
  },
  {
    lat: 31.5186,
    lon: 74.34505,
  },
  {
    lat: 31.5187,
    lon: 74.34511,
  },
  {
    lat: 31.51884,
    lon: 74.34519,
  },
  {
    lat: 31.5191,
    lon: 74.34534,
  },
  {
    lat: 31.51938,
    lon: 74.3455,
  },
  {
    lat: 31.51967,
    lon: 74.34566,
  },
  {
    lat: 31.51992,
    lon: 74.3458,
  },
  {
    lat: 31.52014,
    lon: 74.34593,
  },
  {
    lat: 31.52041,
    lon: 74.34608,
  },
  {
    lat: 31.52055,
    lon: 74.34617,
  },
  {
    lat: 31.52074,
    lon: 74.34627,
  },
  {
    lat: 31.52075,
    lon: 74.34628,
  },
  {
    lat: 31.52101,
    lon: 74.34643,
  },
  {
    lat: 31.52124,
    lon: 74.34655,
  },
  {
    lat: 31.52131,
    lon: 74.34655,
  },
  {
    lat: 31.52132,
    lon: 74.34655,
  },
  {
    lat: 31.52139,
    lon: 74.34654,
  },
  {
    lat: 31.52147,
    lon: 74.34651,
  },
  {
    lat: 31.52148,
    lon: 74.34651,
  },
  {
    lat: 31.52155,
    lon: 74.34646,
  },
  {
    lat: 31.52157,
    lon: 74.3464,
  },
  {
    lat: 31.52167,
    lon: 74.34616,
  },
  {
    lat: 31.52175,
    lon: 74.34598,
  },
  {
    lat: 31.52178,
    lon: 74.34591,
  },
  {
    lat: 31.52189,
    lon: 74.34556,
  },
  {
    lat: 31.52194,
    lon: 74.3454,
  },
  {
    lat: 31.52198,
    lon: 74.34529,
  },
  {
    lat: 31.52204,
    lon: 74.34511,
  },
  {
    lat: 31.52205,
    lon: 74.34507,
  },
  {
    lat: 31.5221,
    lon: 74.34488,
  },
  {
    lat: 31.52217,
    lon: 74.34461,
  },
  {
    lat: 31.52226,
    lon: 74.3443,
  },
  {
    lat: 31.52228,
    lon: 74.34419,
  },
  {
    lat: 31.52234,
    lon: 74.3439,
  },
  {
    lat: 31.52241,
    lon: 74.34349,
  },
  {
    lat: 31.52242,
    lon: 74.3434,
  },
  {
    lat: 31.52246,
    lon: 74.34318,
  },
  {
    lat: 31.52247,
    lon: 74.34312,
  },
  {
    lat: 31.52252,
    lon: 74.34272,
  },
  {
    lat: 31.52253,
    lon: 74.34258,
  },
  {
    lat: 31.52256,
    lon: 74.34231,
  },
  {
    lat: 31.52259,
    lon: 74.34202,
  },
  {
    lat: 31.5226,
    lon: 74.34188,
  },
  {
    lat: 31.5226,
    lon: 74.34188,
  },
  {
    lat: 31.52262,
    lon: 74.34171,
  },
  {
    lat: 31.52262,
    lon: 74.34157,
  },
  {
    lat: 31.52262,
    lon: 74.34149,
  },
  {
    lat: 31.52261,
    lon: 74.34136,
  },
  {
    lat: 31.5226,
    lon: 74.34115,
  },
  {
    lat: 31.52259,
    lon: 74.34112,
  },
  {
    lat: 31.52257,
    lon: 74.34079,
  },
  {
    lat: 31.52255,
    lon: 74.3406,
  },
  {
    lat: 31.52253,
    lon: 74.3404,
  },
  {
    lat: 31.52253,
    lon: 74.34033,
  },
  {
    lat: 31.52247,
    lon: 74.34032,
  },
  {
    lat: 31.52242,
    lon: 74.34029,
  },
  {
    lat: 31.52239,
    lon: 74.34026,
  },
  {
    lat: 31.52238,
    lon: 74.34024,
  },
  {
    lat: 31.52235,
    lon: 74.34018,
  },
  {
    lat: 31.52234,
    lon: 74.34012,
  },
  {
    lat: 31.52222,
    lon: 74.34013,
  },
  {
    lat: 31.522,
    lon: 74.34016,
  },
  {
    lat: 31.52177,
    lon: 74.34019,
  },
  {
    lat: 31.52174,
    lon: 74.34019,
  },
  {
    lat: 31.52151,
    lon: 74.34022,
  },
  {
    lat: 31.52144,
    lon: 74.34023,
  },
  {
    lat: 31.52129,
    lon: 74.34024,
  },
  {
    lat: 31.52116,
    lon: 74.34026,
  },
  {
    lat: 31.52085,
    lon: 74.34029,
  },
  {
    lat: 31.52064,
    lon: 74.34032,
  },
  {
    lat: 31.52064,
    lon: 74.34032,
  },
  {
    lat: 31.5204,
    lon: 74.34034,
  },
  {
    lat: 31.52037,
    lon: 74.34035,
  },
  {
    lat: 31.5201,
    lon: 74.34038,
  },
  {
    lat: 31.51981,
    lon: 74.34042,
  },
  {
    lat: 31.51949,
    lon: 74.34045,
  },
  {
    lat: 31.51924,
    lon: 74.34049,
  },
  {
    lat: 31.51916,
    lon: 74.34049,
  },
  {
    lat: 31.51894,
    lon: 74.34051,
  },
  {
    lat: 31.51891,
    lon: 74.34052,
  },
  {
    lat: 31.518914,
    lon: 74.3405704,
  },
];


const userIds = ["2628", "2601"]; // Add your user IDs here
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
    timestamp: "2023-09-19T10:42:01.045Z",
    uuid: "12074163-6ef5-4457-a8b0-817d08a72c82",
  },
  user_id: "",
};

// Helper function to update lat/lon in baseObject
// Helper function to update lat/lon and user ID in baseObject
const updateLocationAndUser = (base, lat, lon, userId) => {
    const updatedObject = { ...base };
    updatedObject.live_address.lat = lat.toString();
    updatedObject.live_address.lon = lon.toString();
    updatedObject.location.coords.latitude = lat;
    updatedObject.location.coords.longitude = lon;
    updatedObject.user_id = userId;
    return updatedObject;
  };
  
  // Function to send location data for all users
  const sendLocations = async () => {
    for (let i = 0; i < locations.length; i++) {
      const { lat, lon } = locations[i];
  
      for (const userId of userIds) {
        // Update the baseObject with new lat/lon and userId
        const dataToSend = updateLocationAndUser(baseObject, lat, lon, userId);
  
        console.log(`Sending data for user ${userId}:`, dataToSend);
        socket.emit("location", dataToSend);
  
        // Wait for 1 second before sending data for the next user
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
  
      // Wait for 1 second before processing the next location
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    console.log("All locations sent for all users.");
    socket.disconnect();
  };
  
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
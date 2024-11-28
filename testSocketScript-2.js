const io = require("socket.io-client");

// Connect to the Socket.IO server
const socket = io("https://sdlocationupdate.serendipity.app"); // Update the URL if your server runs elsewhere

// Latitude and longitude array
const locations =  [
  {
    "lat": 31.517711323062922,
    "lon": 74.34148413607397
  },
  {
    "lat": 31.52108,
    "lon": 74.34027
  },
  {
    "lat": 31.52124,
    "lon": 74.34025
  },
  {
    "lat": 31.52129,
    "lon": 74.34024
  },
  {
    "lat": 31.52151,
    "lon": 74.34022
  },
  {
    "lat": 31.52153,
    "lon": 74.34022
  },
  {
    "lat": 31.5217,
    "lon": 74.34019
  },
  {
    "lat": 31.52177,
    "lon": 74.34019
  },
  {
    "lat": 31.52197,
    "lon": 74.34016
  },
  {
    "lat": 31.52223,
    "lon": 74.34013
  },
  {
    "lat": 31.52234,
    "lon": 74.34012
  },
  {
    "lat": 31.52235,
    "lon": 74.34004
  },
  {
    "lat": 31.52237,
    "lon": 74.33998
  },
  {
    "lat": 31.52242,
    "lon": 74.33992
  },
  {
    "lat": 31.52243,
    "lon": 74.33991
  },
  {
    "lat": 31.52247,
    "lon": 74.33989
  },
  {
    "lat": 31.52247,
    "lon": 74.3398
  },
  {
    "lat": 31.52247,
    "lon": 74.33957
  },
  {
    "lat": 31.52248,
    "lon": 74.33943
  },
  {
    "lat": 31.52249,
    "lon": 74.3394
  },
  {
    "lat": 31.5225,
    "lon": 74.33931
  },
  {
    "lat": 31.52257,
    "lon": 74.33902
  },
  {
    "lat": 31.52258,
    "lon": 74.339
  },
  {
    "lat": 31.52269,
    "lon": 74.33866
  },
  {
    "lat": 31.52273,
    "lon": 74.33856
  },
  {
    "lat": 31.52282,
    "lon": 74.33834
  },
  {
    "lat": 31.5229,
    "lon": 74.33814
  },
  {
    "lat": 31.52295,
    "lon": 74.33805
  },
  {
    "lat": 31.52311,
    "lon": 74.33775
  },
  {
    "lat": 31.52321,
    "lon": 74.33758
  },
  {
    "lat": 31.5233,
    "lon": 74.33744
  },
  {
    "lat": 31.52347,
    "lon": 74.33719
  },
  {
    "lat": 31.52364,
    "lon": 74.33693
  },
  {
    "lat": 31.5238,
    "lon": 74.33669
  },
  {
    "lat": 31.52382,
    "lon": 74.33667
  },
  {
    "lat": 31.52399,
    "lon": 74.3364
  },
  {
    "lat": 31.52408,
    "lon": 74.33627
  },
  {
    "lat": 31.52418,
    "lon": 74.33615
  },
  {
    "lat": 31.52439,
    "lon": 74.33589
  },
  {
    "lat": 31.52441,
    "lon": 74.33585
  },
  {
    "lat": 31.52459,
    "lon": 74.33564
  },
  {
    "lat": 31.52478,
    "lon": 74.3354
  },
  {
    "lat": 31.52479,
    "lon": 74.3354
  },
  {
    "lat": 31.52496,
    "lon": 74.33515
  },
  {
    "lat": 31.52513,
    "lon": 74.33491
  },
  {
    "lat": 31.52515,
    "lon": 74.33487
  },
  {
    "lat": 31.52533,
    "lon": 74.33459
  },
  {
    "lat": 31.52547,
    "lon": 74.33435
  },
  {
    "lat": 31.52548,
    "lon": 74.33434
  },
  {
    "lat": 31.52559,
    "lon": 74.33416
  },
  {
    "lat": 31.52569,
    "lon": 74.33399
  },
  {
    "lat": 31.52584,
    "lon": 74.33373
  },
  {
    "lat": 31.52591,
    "lon": 74.3336
  },
  {
    "lat": 31.52602,
    "lon": 74.33344
  },
  {
    "lat": 31.52605,
    "lon": 74.33338
  },
  {
    "lat": 31.52612,
    "lon": 74.33328
  },
  {
    "lat": 31.52619,
    "lon": 74.33317
  },
  {
    "lat": 31.52612,
    "lon": 74.33309
  },
  {
    "lat": 31.52618,
    "lon": 74.33301
  },
  {
    "lat": 31.52603,
    "lon": 74.33286
  },
  {
    "lat": 31.52578,
    "lon": 74.33262
  },
  {
    "lat": 31.52557,
    "lon": 74.33241
  },
  {
    "lat": 31.52535,
    "lon": 74.33219
  },
  {
    "lat": 31.52512,
    "lon": 74.33196
  },
  {
    "lat": 31.5249,
    "lon": 74.33174
  },
  {
    "lat": 31.52469,
    "lon": 74.33153
  },
  {
    "lat": 31.52467,
    "lon": 74.33151
  },
  {
    "lat": 31.52442,
    "lon": 74.3313
  },
  {
    "lat": 31.52417,
    "lon": 74.33109
  },
  {
    "lat": 31.52392,
    "lon": 74.33088
  },
  {
    "lat": 31.52391,
    "lon": 74.33086
  },
  {
    "lat": 31.52364,
    "lon": 74.33062
  },
  {
    "lat": 31.52338,
    "lon": 74.33039
  },
  {
    "lat": 31.52311,
    "lon": 74.33015
  },
  {
    "lat": 31.52286,
    "lon": 74.32991
  },
  {
    "lat": 31.52284,
    "lon": 74.3299
  },
  {
    "lat": 31.52258,
    "lon": 74.32971
  },
  {
    "lat": 31.52236,
    "lon": 74.32955
  },
  {
    "lat": 31.52229,
    "lon": 74.32948
  },
  {
    "lat": 31.52201,
    "lon": 74.32924
  },
  {
    "lat": 31.52193,
    "lon": 74.32917
  },
  {
    "lat": 31.52174,
    "lon": 74.32903
  },
  {
    "lat": 31.52146,
    "lon": 74.32881
  },
  {
    "lat": 31.52133,
    "lon": 74.32872
  },
  {
    "lat": 31.52118,
    "lon": 74.32859
  },
  {
    "lat": 31.5209,
    "lon": 74.32836
  },
  {
    "lat": 31.52078,
    "lon": 74.32825
  },
  {
    "lat": 31.52009,
    "lon": 74.32767
  },
  {
    "lat": 31.51984,
    "lon": 74.32743
  },
  {
    "lat": 31.51974,
    "lon": 74.32734
  },
  {
    "lat": 31.5197,
    "lon": 74.3273
  },
  {
    "lat": 31.51962,
    "lon": 74.32722
  },
  {
    "lat": 31.51957,
    "lon": 74.32717
  },
  {
    "lat": 31.5195,
    "lon": 74.3271
  },
  {
    "lat": 31.51928,
    "lon": 74.32686
  },
  {
    "lat": 31.51991,
    "lon": 74.32599
  },
  {
    "lat": 31.52013,
    "lon": 74.3262
  },
  {
    "lat": 31.52008,
    "lon": 74.32631
  },
  {
    "lat": 31.51997,
    "lon": 74.32643
  },
  {
    "lat": 31.51991,
    "lon": 74.32651
  },
  {
    "lat": 31.51965,
    "lon": 74.32688
  },
  {
    "lat": 31.51961,
    "lon": 74.32694
  },
  {
    "lat": 31.5195,
    "lon": 74.3271
  },
  {
    "lat": 31.51928,
    "lon": 74.32686
  },
  {
    "lat": 31.51991,
    "lon": 74.32599
  },
  {
    "lat": 31.52013,
    "lon": 74.3262
  },
  {
    "lat": 31.52008,
    "lon": 74.32631
  },
  {
    "lat": 31.51997,
    "lon": 74.32643
  },
  {
    "lat": 31.51991,
    "lon": 74.32651
  },
  {
    "lat": 31.51976,
    "lon": 74.32673
  },
  {
    "lat": 31.51963,
    "lon": 74.32692
  },
  {
    "lat": 31.51961,
    "lon": 74.32694
  },
  {
    "lat": 31.5195,
    "lon": 74.3271
  },
  {
    "lat": 31.51928,
    "lon": 74.32686
  },
  {
    "lat": 31.51991,
    "lon": 74.32599
  },
  {
    "lat": 31.52013,
    "lon": 74.3262
  },
  {
    "lat": 31.52008,
    "lon": 74.32631
  },
  {
    "lat": 31.51997,
    "lon": 74.32643
  },
  {
    "lat": 31.51991,
    "lon": 74.32651
  },
  {
    "lat": 31.51991,
    "lon": 74.32651
  },
  {
    "lat": 31.52017,
    "lon": 74.32677
  },
  {
    "lat": 31.52028,
    "lon": 74.3269
  },
  {
    "lat": 31.52052,
    "lon": 74.32714
  },
  {
    "lat": 31.52095,
    "lon": 74.32759
  },
  {
    "lat": 31.52147,
    "lon": 74.32809
  },
  {
    "lat": 31.52201,
    "lon": 74.32858
  },
  {
    "lat": 31.52238,
    "lon": 74.32889
  },
  {
    "lat": 31.52455,
    "lon": 74.33091
  },
  {
    "lat": 31.52483,
    "lon": 74.33109
  },
  {
    "lat": 31.52514,
    "lon": 74.33134
  },
  {
    "lat": 31.52568,
    "lon": 74.3318
  },
  {
    "lat": 31.52613,
    "lon": 74.33216
  },
  {
    "lat": 31.52639,
    "lon": 74.33239
  },
  {
    "lat": 31.5265,
    "lon": 74.33249
  },
  {
    "lat": 31.52659,
    "lon": 74.3326
  },
  {
    "lat": 31.52667,
    "lon": 74.33268
  },
  {
    "lat": 31.52664,
    "lon": 74.33272
  },
  {
    "lat": 31.5263,
    "lon": 74.33321
  },
  {
    "lat": 31.52628,
    "lon": 74.33325
  },
  {
    "lat": 31.52615,
    "lon": 74.33345
  },
  {
    "lat": 31.52519,
    "lon": 74.33496
  },
  {
    "lat": 31.52485,
    "lon": 74.33546
  },
  {
    "lat": 31.52449,
    "lon": 74.33588
  },
  {
    "lat": 31.52434,
    "lon": 74.33606
  },
  {
    "lat": 31.52425,
    "lon": 74.33619
  },
  {
    "lat": 31.52413,
    "lon": 74.33635
  },
  {
    "lat": 31.52383,
    "lon": 74.3368
  },
  {
    "lat": 31.52328,
    "lon": 74.33765
  },
  {
    "lat": 31.52304,
    "lon": 74.33806
  },
  {
    "lat": 31.52283,
    "lon": 74.33853
  },
  {
    "lat": 31.52273,
    "lon": 74.33881
  },
  {
    "lat": 31.52267,
    "lon": 74.339
  },
  {
    "lat": 31.52262,
    "lon": 74.3392
  },
  {
    "lat": 31.52259,
    "lon": 74.33936
  },
  {
    "lat": 31.52256,
    "lon": 74.33956
  },
  {
    "lat": 31.52256,
    "lon": 74.33973
  },
  {
    "lat": 31.52258,
    "lon": 74.33989
  },
  {
    "lat": 31.52264,
    "lon": 74.33992
  },
  {
    "lat": 31.52268,
    "lon": 74.33996
  },
  {
    "lat": 31.52271,
    "lon": 74.34003
  },
  {
    "lat": 31.52273,
    "lon": 74.3401
  },
  {
    "lat": 31.52272,
    "lon": 74.34017
  },
  {
    "lat": 31.52269,
    "lon": 74.34024
  },
  {
    "lat": 31.52264,
    "lon": 74.34029
  },
  {
    "lat": 31.52259,
    "lon": 74.34032
  },
  {
    "lat": 31.52256,
    "lon": 74.34033
  },
  {
    "lat": 31.52253,
    "lon": 74.34033
  },
  {
    "lat": 31.52247,
    "lon": 74.34032
  },
  {
    "lat": 31.52242,
    "lon": 74.34029
  },
  {
    "lat": 31.52238,
    "lon": 74.34024
  },
  {
    "lat": 31.52235,
    "lon": 74.34018
  },
  {
    "lat": 31.52234,
    "lon": 74.34012
  },
  {
    "lat": 31.52177,
    "lon": 74.34019
  },
  {
    "lat": 31.52151,
    "lon": 74.34022
  },
  {
    "lat": 31.52129,
    "lon": 74.34024
  },
  {
    "lat": 31.52087,
    "lon": 74.34029
  },
  {
    "lat": 31.52064,
    "lon": 74.34032
  },
  {
    "lat": 31.52051,
    "lon": 74.34033
  },
  {
    "lat": 31.5204,
    "lon": 74.34034
  },
  {
    "lat": 31.52022,
    "lon": 74.34036
  },
  {
    "lat": 31.51995,
    "lon": 74.3404
  },
  {
    "lat": 31.51967,
    "lon": 74.34043
  },
  {
    "lat": 31.51967,
    "lon": 74.34043
  },
  {
    "lat": 31.51936,
    "lon": 74.34047
  },
  {
    "lat": 31.51924,
    "lon": 74.34049
  },
  {
    "lat": 31.51905,
    "lon": 74.3405
  },
  {
    "lat": 31.51876,
    "lon": 74.34053
  },
  {
    "lat": 31.51845,
    "lon": 74.34056
  },
  {
    "lat": 31.51841,
    "lon": 74.34056
  },
  {
    "lat": 31.51814,
    "lon": 74.3406
  },
  {
    "lat": 31.51788,
    "lon": 74.34063
  },
  {
    "lat": 31.51759,
    "lon": 74.34067
  },
  {
    "lat": 31.517724531106513,
    "lon": 74.34144604229922
  }
];


const userIds = ["2661", "2659"]; // Add your user IDs here
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
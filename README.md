# MQTT Location Simulator

A Node.js script that simulates real-time location updates for multiple users via MQTT protocol. This tool is useful for testing location-based applications and services.

## Features

- **Multi-user simulation**: Send location data for multiple users simultaneously
- **Real-time GPS coordinates**: Uses predefined GPS routes from JSON files
- **Live address lookup**: Fetches human-readable addresses using Nominatim API
- **Direction calculation**: Computes bearing between consecutive points
- **MQTT protocol**: Publishes location updates to MQTT broker with QoS 1
- **Time-limited runs**: Automatically stops after 1 hour of simulation

## Prerequisites

- Node.js (v14 or higher)
- MQTT broker (e.g., Mosquitto, HiveMQ, EMQX)
- Internet connection for address lookups

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp env-example .env
```

4. Configure your `.env` file:
```env
MQTT_BROKER_URL=mqtt://your-broker-url:1883
MQTT_USERNAME=your-username
MQTT_PASSWORD=your-password
NOMINATUM_URL=https://nominatim.openstreetmap.org/reverse
```

## Configuration

### User IDs
Edit the `users` array in [Client.js](Client.js) (around line 27):
```javascript
const users = ['2628', '2661']; // Add your user IDs here
```

### Location Data
Coordinates are loaded from [coordinates_1.json](coordinates_1.json). Each entry should have:
```json
{
  "lat": 31.5176868,
  "lon": 74.3414852
}
```

### Timing
- **Update interval**: 2 seconds between location updates (line 185)
- **Simulation duration**: 1 hour (line 151)

## Usage

Run the script:
```bash
node Client.js
```

The script will:
1. Connect to the MQTT broker
2. Loop through coordinates from `coordinates_1.json`
3. Fetch live addresses for each coordinate
4. Publish location updates for all configured users
5. Continue for 1 hour, then automatically stop

### Output
Console output shows each published location:
```
Location published by user 2628 at 14:23:45.123
Location published by user 2661 at 14:23:45.234
```

## MQTT Topic Structure

**Published topic**: `location/updates`

**Subscribed topic**: `location/response` (optional, for server responses)

### Payload Format
```json
{
  "user_id": "2628",
  "location": {
    "coords": {
      "latitude": 31.5176868,
      "longitude": 74.3414852,
      "accuracy": 12.1,
      "altitude": 193.4,
      "heading": 45.5,
      "speed": 0.62
    },
    "timestamp": "2026-03-04T14:23:45.123Z",
    "activity": {
      "type": "still",
      "confidence": 100
    },
    "battery": {
      "level": 1,
      "is_charging": true
    },
    "is_moving": true,
    "odometer": 3666.6
  },
  "live_address": {
    "display_name": "Street Name, City, Country",
    "address": {
      "country": "Pakistan",
      "state": "Punjab",
      "city": "Lahore",
      "suburb": "Shah Jamal",
      "postcode": "57760"
    }
  },
  "direction_degree": 45.5,
  "activity": {
    "activity": "still",
    "confidence": 0,
    "isMoving": false
  }
}
```

## Troubleshooting

### Connection Issues
- Verify MQTT broker URL and credentials in `.env`
- Check if broker is running and accessible
- Ensure firewall allows MQTT port (default: 1883)

### Address Lookup Failures
- Check internet connection
- Verify Nominatim URL is correct
- Consider rate limiting (default OSM Nominatim has usage limits)

### Script Stops Prematurely
- Check console for error messages
- Verify `coordinates_1.json` is valid JSON
- Ensure all dependencies are installed

## Dependencies

- **mqtt**: MQTT client for Node.js
- **axios**: HTTP client for address lookups
- **dotenv**: Environment variable management

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!

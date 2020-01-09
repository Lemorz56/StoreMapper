# StoreMapper
App using Node, Express, Mongo GeoJSON API

> A Node/Express/Mongo API with GeoJSON location field to see store locations. Simple vanilla JS frontend using the Mapbox Library

## Quick Start

Add your MONGO_URI and GEOCODER_API_KEY to the "config/config.env" file (that you need to create)

```bash
# Install dependencies
npm install

# Serve on localhost:2500
npm run dev (nodemon)
or
npm start

# Routes
GET    /api/v1/stores # Get Stores

POST   /api/v1/stores # Add Store
body { storeId: "0001", address: "15 main st Boston MA" }

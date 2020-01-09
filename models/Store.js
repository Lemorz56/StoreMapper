const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema(
{
    storeID: {
        type: String,
        required: [true, "Please add a store ID"],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must be less than 10 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        countryCode: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Middelware GEOCODE & Create Location
StoreSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        countryCode: loc[0].countryCode
    }

    //Dont save the actual address field in the database.
    this.address = undefined;
    //call next since its a piece of middelware
    next();
});

module.exports = mongoose.model('Store', StoreSchema);

//https://youtu.be/9FQrFah9rnc?t=1420
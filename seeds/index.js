const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

//a function to randomly generate a descriptor and a place
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    // delete data from database if any

    await Campground.deleteMany({});

    for (let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground ({
            author: '5f9124c4c8055b38756f69ca',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur iure, magnam mollitia, laborum tenetur error, quidem sint explicabo accusantium ducimus harum officiis voluptatibus autem similique voluptatem ipsum delectus corrupti nemo?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/roseanne/image/upload/v1604130631/YelpCamp/wkx1nwnksg8b6ytgqenp.jpg',
                  filename: 'YelpCamp/vnhrlgqsvzfppyo2plq3'
                },
                // {
                //   url: 'https://res.cloudinary.com/roseanne/image/upload/v1603742366/YelpCamp/adtamkbudbox0azhdhm3.jpg',
                //   filename: 'YelpCamp/adtamkbudbox0azhdhm3'
                // }
              ],
            
        })
        await camp.save();
    }
}

seedDB();
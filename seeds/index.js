const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USERID
            author: '60df84416dede635d010e60b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab pariatur, maiores error fugit reprehenderit ratione ullam ducimus tempora perferendis architecto delectus harum distinctio quis ut reiciendis dolorem nobis suscipit similique.",
            price,
            // shorthand way is used, means price: price
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude,            
                ]
            }, 
            images: [
                {
                    url: 'https://res.cloudinary.com/davmkar6q/image/upload/v1625411701/YelpCamp/j5fcfb8mvie6ttsszg1d.jpg',
                    filename: 'YelpCamp/j5fcfb8mvie6ttsszg1d'
                },
                {
                    url: 'https://res.cloudinary.com/davmkar6q/image/upload/v1625352276/YelpCamp/ckcemfuykkqilim3hveb.jpg',
                    filename: 'YelpCamp/ckcemfuykkqilim3hveb'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
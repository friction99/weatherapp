import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
const ENDPOINT = "http://api.openweathermap.org/geo/1.0/direct";
const APIkey = "b3050804ab2926d21d71100e0d617cb4";
app.get("/",(req,res)=>{
    res.render('index.ejs');
})
app.post("/submit",async(req,res)=>{
    const city = req.body.city;
    const param = `?q=${city}&appid=${APIkey}`;
    const link = ENDPOINT + param;
    try{
        const response = await axios.get(link);
        if(response.data.length>0){
            const lat = response.data[0].lat;
            const lon = response.data[0].lon;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
            const weatherdata = await axios.get(url);
            const temp = weatherdata.data.main.temp;
            const feelsLike = weatherdata.data.main.feels_like;
            const pressure = weatherdata.data.main.pressure;
            const humidity = weatherdata.data.main.humidity;
            res.render('index.ejs',{
                latitude:lat,
                longitude:lon,
                temp:temp,
            })
        }
    }
    catch(error){
        console.log(error.message);
    }
});
app.listen(3000,()=>{
    console.log('Server is up and running on port 3000');
})
//b3050804ab2926d21d71100e0d617cb4
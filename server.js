const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path:"./config.env"})

//create port we can add any number 5000/3000
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is running on Port ${port}`)
})



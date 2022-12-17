const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({path:"./config.env"})

const DB = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)
//console.log(app.get("env"));

mongoose.connect(DB,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true
})
.then((con)=>{
    //console.log(con.connection)
    console.log("DB Connected Succesfully")

})


//create port we can add any number 5000/3000
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`App is running on Port ${port}`)
})



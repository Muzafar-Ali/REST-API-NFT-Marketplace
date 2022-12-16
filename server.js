const app = require('./app')

//create port we can add any number 5000/3000
const port = 3000;
app.listen(port,()=>{
    console.log(`App is running on Port ${port}`)
})



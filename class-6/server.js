const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://kirttibansahu_db_user:XC3hTT7CEx3HCXII@cluster0.th2xzc9.mongodb.net/class-6")
    .then(() => {
        console.log("Connected to Database");
    })
}

connectToDb()

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})
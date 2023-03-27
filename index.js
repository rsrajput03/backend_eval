const express = require("express")
const {connection} = require("./db")
const cors = require("cors")
const auth = require("./middleware/auth.middleware")
const {userRouter} = require("./routes/user.routes")
const {postRouter} = require("./routes/post.routes")
require("dotenv").config()
const app = express();
app.use(express.json());
app.use(cors())
app.use("/users",userRouter);
app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async(req,res)=>{
 try {
    await connection;
    console.log("Connected to MongoDb")
 } catch (error) {
    console.log("Not abel to connected to MongoDb")
    console.log(error)
 }
 console.log(`Server is running on port ${process.env.port}`)
})
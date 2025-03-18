const express=require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.route");
const bookRouter = require("./routes/book.route");
const cors=require("cors");

const app=express();
const port=process.env.PORT || 3000;
 
app.use(express.json());
app.use(
    cors({
        origin: "https://library-management-system-rho-lac.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.get("/", (req, res)=>{
    res.send("API is working");
})
 
//user 
app.use("/user", userRouter);

// book
app.use("/book", bookRouter)
 
app.listen(port, async()=>{
    try {
        await connection;
        console.log("MongoDB connected successfully.")
    } catch (error) {
        console.log("Error while connecting MongoDB", error)
    }
    console.log(`Server is running on port http://localhost:${port}`);
})       
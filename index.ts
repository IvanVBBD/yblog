import express from 'express';
import blogRouter from "./routes/blogRoutes"; // Import the routes module
import userRouter from "./routes/userRoutes"

const port = process.env.PORT || 3000;

const app = express();

app.use("/posts", blogRouter);
app.use("/user", userRouter);

app.listen(port, async () => {
    console.log("server is running!");
})
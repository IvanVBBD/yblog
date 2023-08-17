import express from 'express';
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";
import siteRouter from "./routes/siteRoutes";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('scripts'));
app.use(express.static('static/images'));
app.use(express.static('static/css'));
app.use(express.static('dist'));

app.use("/posts", blogRouter);
app.use("/user", userRouter);
app.use("/", siteRouter);

app.listen(port, async () => {
    console.log("server is running on port: " + port);
})
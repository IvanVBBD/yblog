const express = require("express");
const expressSwaggerGenerator = require('express-swagger-generator');
const blogRouter = require("./routes/blogRoutes");
const siteRouter = require("./routes/siteRoutes");

const port = process.env.PORT || 3000;

const app = express();
// const expressSwagger = expressSwaggerGenerator(app);
// expressSwagger(require('./swagger.json'), '/swagger');


app.use(express.static('scripts'));
app.use(express.static('static/images'));
app.use(express.static('static/css'));
app.use(express.static('dist'));

app.use("/posts", blogRouter);

app.use("/", siteRouter);

app.listen(port, async () => {
    console.log("server is running!");
})


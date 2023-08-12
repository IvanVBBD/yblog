const express = require("express");
const expressSwaggerGenerator = require('express-swagger-generator');
const blogRouter = require("./routes/blogRoutes");

const port = process.env.PORT || 3000;

const app = express();
// const expressSwagger = expressSwaggerGenerator(app);
// expressSwagger(require('./swagger.json'), '/swagger');

app.use("/posts", blogRouter);

app.listen(port, async () => {
    console.log("server is running!");
})


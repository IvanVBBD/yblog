// src/routes.ts
import express, { Request, Response } from 'express';
import bodyParser from "body-parser"
const siteRouter = express.Router();
const path = require('path');

//body parser configs
siteRouter.use(bodyParser.json());
siteRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false 
});

//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const BATCH = 10;

  
// Get a user's blog posts with comments
siteRouter.get('/', urlencodedParser, async (req : Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

export default siteRouter;
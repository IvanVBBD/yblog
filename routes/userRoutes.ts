import express, { Request, Response } from "express";
import { UsernameControl, createUserControl } from "../Controllers/userController";
import bodyParser from 'body-parser';
import { verifyJwtSignature } from "../Controllers/authController";
import UserModel from "../models/user";

import http from 'http'; // For HTTP URLs
import https from 'https'; // For HTTPS URLs

const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

userRouter.use(urlencodedParser);

// Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const EXISTS = 11000;

// Create user
userRouter.post('/authenticate', verifyJwtSignature, async (req: Request, res: Response) => {
  const email = req.body.email? req.body.email.toString() : "";
  const author = req.body.author? req.body.author.toString() : "";
  const img = req.body.image? req.body.image.toString() : "";
  const token = req.body.token? req.body.token.toString() : "";
  
  const TMSTAMP = new Date().toLocaleDateString();
  try {

    //empty username will throw error because of length constraints
    const username = await UsernameControl(author) || "";
    console.log(username);
    let user = await createUserControl(username, email, author, img, TMSTAMP);

    if (user.status == OK) {
      res.status(OK).json(username);
    } else if (user.status == ERR) {
      res.status(ERR).json(user);
    } else {
      res.status(DENIED).send("Sorry Neh, you failed to can");
    }

  } catch (error) {
    res.status(ERR).json({ message: 'Error creating user' });
  }
});

const fetchImage = (url: string): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const protocol = url.startsWith('https://') ? https : http;

    protocol.get(url, (response) => {
      const chunks: Uint8Array[] = [];

      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        const imageBuffer = Buffer.concat(chunks);
        resolve(imageBuffer);
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
  });
};

userRouter.get('/picture/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    const user: any = await UserModel.findOne({ username: username });

    // Check if the user has an image URL
    if (!user || !user.img) {
      return res.status(ERR).json({ message: 'User or image not found' });
    }

    // Fetch the image URL
    const imageBuffer = await fetchImage(user.img);

    // Set the appropriate content type for the response
    res.setHeader('Content-Type', 'image/jpeg'); // Modify as needed for the actual image format

    // Send the image data as the response
    res.status(OK).send(imageBuffer);
  } catch (error) {
    res.status(ERR).json({ message: 'Error finding user or fetching image' });
  }
});

export default userRouter;

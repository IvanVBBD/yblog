import express, { Request, Response } from "express";
import { UsernameControl, createUserControl } from "../Controllers/userController";
import bodyParser from 'body-parser';
import { verifyJwtSignature } from "../Controllers/authController";
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
  const img = req.body.img? req.body.img.toString() : "";
  const token = req.body.token? req.body.token.toString() : "";
  console.log(token);
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

export default userRouter;

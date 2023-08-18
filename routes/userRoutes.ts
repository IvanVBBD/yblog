import express, { Request, Response } from "express";
import { createUserControl } from "../Controllers/userController";
import bodyParser from 'body-parser';
const userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const EXISTS = 11000;

// Create user
userRouter.post('/authenticate', urlencodedParser, async (req: Request, res: Response) => {
  const email = req.body.author? req.body.email.toString() : "";
  const author = req.body.author? req.body.author.toString() : "";
  let username = randomize(author);
  const TMSTAMP = new Date().toLocaleDateString();
  try {
    let user = await createUserControl('john_shoemaker_30', email, author, TMSTAMP);

    if (user.status == OK) {
      res.status(OK).json(user);
    } else if (user.status == ERR) {
      res.status(ERR).json(user);
    } else if (user.status == EXISTS){
      username = randomize(author);
      user = await createUserControl(username, email, author, TMSTAMP);
      res.status(user.status).json(user);
    } 
    else {
      res.status(DENIED).send("Sorry Neh, you failed to can");
    }

  } catch (error) {
    res.status(ERR).json({ message: 'Error creating user' });
  }
});

function randomize (author: string): string{
  const lowercase = author.toLowerCase().replace(' ', '_').trim();
  // random number gen
  const appendNum = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  const username = `${lowercase}_${appendNum}`
  return username
}

export default userRouter;

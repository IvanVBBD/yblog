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

// Create user
userRouter.post('/create', urlencodedParser, async (req: Request, res: Response) => {
  const author = req.body.author? req.body.author.toString() : "";
  try {
    const TMSTAMP = new Date().toLocaleDateString();
    const user = await createUserControl(author, TMSTAMP);

    if (user.status == OK) {
      res.status(OK).send(user.message);
    } else if (user.status == ERR) {
      res.status(ERR).send(user.message);
    } else {
      res.status(DENIED).send("Sorry Neh, you failed to can");
    }

  } catch (error) {
    res.status(ERR).json({ message: 'Error creating user' });
  }
});

export default userRouter;

const express = require("express");
const userController = require("../Controllers/userController");
const userRouter = express.Router();
const bodyParser = require('body-parser')

//body parser configs
userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false 
});

//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;

// create user
userRouter.post('/create', urlencodedParser, async (req, res)=>{
  const author = req.body.author;
  try {
    const TMSTAMP = new Date().toLocaleDateString();
    const user = await userController.createUser(author, TMSTAMP);

    if(user.status == OK){
      //can send data back from response object if we need to
      res.status(OK).send(user.message);
    }
    else if(user.status == ERR){
      res.status(ERR).send(user.message);
    }
    else{
      res.status(DENIED).send("Sorry Neh, you failed to can")
    }

  } catch (error) {
    res.status(ERR).json({ message: 'Error creating user' });
  }
})


module.exports = userRouter;
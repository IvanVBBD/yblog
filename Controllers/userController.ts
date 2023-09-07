import { createUser, Username } from "./dbControl";
import Response from '../Tools/Response';
import { randomize } from '../Tools/Randomize';


const ERR = 'There was an issue, please try again later';

export const createUserControl = async (username: string, email: string, author: string, img: string, TMSTAMP: string) => {
  try {
    const response = await createUser(username, email, author, img, TMSTAMP);
    return response;
  } catch (error) {
    return new Response(500, ERR, error);
  }
};

export const UsernameControl = async (author:string)=>{
  let username = null;
  let doesExist = true;
  
  //limits before timeout
  const startTime = new Date().getTime();
  const loopDuration = 10000;
  while (doesExist){
    username = randomize(author);
    let res = await Username(username);
    if(!res){
      doesExist = false;
      break;
    }
    if (new Date().getTime() - startTime >= loopDuration) {
      console.log("Loop ran for 10 seconds. Breaking loop.");
      break;
    }
  }
  return doesExist? null:username;
}
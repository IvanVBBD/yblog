import { createUser } from "./dbControl";
import Response from '../Tools/Response';

const ERR = 'There was an issue, please try again later';

export const createUserControl = async (author: string, TMSTAMP: string) => {
  try {
    const response = await createUser(author, TMSTAMP);
    return response;
  } catch (error) {
    return new Response(500, ERR, error);
  }
};
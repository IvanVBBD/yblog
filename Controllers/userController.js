const db = require("./dbControl");
const Response = require('../Tools/Response')

const ERR = 'There was an issue, please try again later'

const createUser = async(author, TMSTAMP)=>{
  try {
    const response = await db.createUser(author, TMSTAMP);
    return response;
  } catch (error) {
    return new Response(500, ERR, error)
  }
}

module.exports = {createUser}
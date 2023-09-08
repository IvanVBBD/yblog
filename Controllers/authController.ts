import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response, NextFunction } from 'express';

// Replace 'YOUR_CLIENT_ID' with your actual client ID.
const CLIENT_ID = '315183206809-5v326tmjtgo87q20mtkg3p28f561qecu.apps.googleusercontent.com';

async function verify(token : string) {
  const client = new OAuth2Client(CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload ? payload['sub'] : "";
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

    console.log('User ID:', userid);
    if(userid !== ""){
        return true;
    }else{
        return false;
    }
    // You can access other claims from the JWT payload as needed.
  } catch (error) {
    console.error('JWT verification failed:', error);
    // Handle the verification failure as needed.
    return false;
  }
}



export async function verifyJwtSignature( 
    req: Request,
    res: Response,
    next: NextFunction){
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(token != undefined){
             if((await verify(token)) === true){
                next();
             }
        }else{
            return res.status(403).end();
        }
    }catch{
        return res.status(403).end();
    }
    
}
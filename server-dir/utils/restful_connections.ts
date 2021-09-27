/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import { Router, Request, Response } from 'express';
import { User, userModel } from './schemas';


/**
 * util function loadFile:
 * 
 * loads up a file onto a given route. 
 * @param router express router to be used
 * @param route route to send the file to
 * @param file file to send
 */
export async function loadFile(router: Router, route: string, file: string) {
    router.get(route, (req, res) => {
        res.sendFile(file);
      });

}

/**
 * util function loginUser:
 * 
 * attempts to log in an existing user.
 * @param router express router to be used
 */
export async function loginUser(router: Router){
  router.get('/login/user/:user/password/:password',(req: Request, res: Response)=>{
    console.log('Entered login process!');  //debug
    const {user, password} = req.params;
    userModel.findOne({'username': user, 'password': password}, (err: any, userFound: User)=>{
      if (err){
        console.log('User not found!');
        return;
      }
      console.log('User' + userFound.username + 'found!');
    })
  });
}

/**
 * util function registerUser:
 * 
 * attempts to register a new user.
 * @param router express router to be used
 */
export async function registerUser(router: Router){
  router.post('/register',async (req: Request, res: Response)=>{
    const {_username, _firstName, _lastName, _password} = req.body;
    const newUser = new userModel({
      username: _username,
      firstName: _firstName,
      lastName: _lastName,
      password: _password
    });
    console.log(newUser.username);
    await newUser.save((err:any,user:User)=>{
      if (err){
        console.log("An error has accured: " + err);
      }
      else{
        console.log("User registered successfuly!");
      }
    });
  });
}
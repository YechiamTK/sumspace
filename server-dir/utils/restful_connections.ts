/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import { Router, Request, Response } from 'express';
import { Mongoose } from 'mongoose';
import { User, createUserModel } from './schemas';


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
export async function loginUser(router: Router, mongoose: Mongoose){
  router.post('/login',(req: Request, res: Response)=>{
    console.log('Entered login process!');  //debug
    const {username, password} = req.body.params;
    const userModel = createUserModel(mongoose);
    userModel.findOne({'username': username, 'password': password}, (err: any, userFound: User)=>{
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
export async function registerUser(router: Router, mongoose: Mongoose){
  router.post('/register',async (req: Request, res: Response)=>{
    const {username, firstName, lastName, password} = req.body.params;
    console.log(req.body.params);
    const userModel = createUserModel(mongoose);
    console.log("connected to user model");
    const newUser = new userModel({
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password
    });
    console.log("create new user named: " + newUser.username);
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
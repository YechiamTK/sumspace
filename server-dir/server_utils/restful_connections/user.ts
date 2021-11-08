/***
 * user.ts = rest api file for user queries
 */


import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveUserSchema, UserBE } from "../schemas";


/**
 * util function loginUser:
 * 
 * attempts to log in an existing user.
 * @param router express router to be used
 */
 export async function loginUser(router: Router, mongoose: Mongoose){
    router.post('/login',async (req: Request, res: Response)=>{
      console.log('Entered login process!');  //debug
      const {username, password} = req.body.params;
      const userModel = mongoose.models.User || mongoose.model('User', retrieveUserSchema(mongoose));
      await userModel.findOne({'username': username, 'password': password}).lean().exec().then((result: LeanDocument<UserBE>)=>{
        console.log('User ' + result.username + ' found!');
        res.send(JSON.stringify(result));
      });/* .catch(exception){
        console.log("An Error has occured!");
        console.log(exception);
      }; */
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
      const userModel = mongoose.models.User || mongoose.model('User', retrieveUserSchema(mongoose));
      console.log("connected to user model");
      const newUser = new userModel({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
      });
      console.log("create new user named: " + newUser.username);
      await newUser.save((err:any,user:UserBE)=>{
        if (err){
          console.log("An error has accured: " + err);
        }
        else{
          console.log("User registered successfuly!");
        }
      });
    });
  }
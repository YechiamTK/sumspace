/***
 * user.ts = rest api file for user queries
 */


import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveUserSchema, UserBE } from "../schemas";



export class Users{

  router: Router;
  mongoose: Mongoose;

  constructor(router: Router, mongoose: Mongoose){
    this.router = router;
    this.mongoose = mongoose;
    this.loginUser();
    this.registerUser();
    //---add any additional functions here---
  }



  
  /**
   * util function loginUser:
   * 
   * attempts to log in an existing user.
   * 
   * @param username
   * @param password
   */
   async loginUser(){
      this.router.post('/session',async (req: Request, res: Response)=>{
        console.log('Entered login process!');  //debug
        const {username, password} = req.body.params;
        const userModel = this.mongoose.models.User || this.mongoose.model('User', retrieveUserSchema(this.mongoose));
        await userModel.findOne({'username': username, 'password': password}).lean().orFail().exec().then((result: LeanDocument<UserBE>)=>{
          console.log('User ' + result.username + ' found!');
          res.send(JSON.stringify(result));
        }).catch((err)=>{
          console.log("An Error has occured!" + err);
          if (err.name == "DocumentNotFoundError") res.sendStatus(404);
          else res.sendStatus(500);
        });
      });
    }
    
    
    /**
     * util function registerUser:
     * 
     * attempts to register a new user.
     * 
     * @param username
     * @param fname first name
     * @param lname last name
     * @param password
     * 
     * /user/:username/fname/:fname/lname/:lname/pass/:password
     */
    async registerUser(){
      this.router.post('/users',async (req: Request, res: Response)=>{
        const {username, fname, lname, password} = req.body.params;
        //console.log(req.params);
        const userModel = this.mongoose.models.User || this.mongoose.model('User', retrieveUserSchema(this.mongoose));
        console.log("connected to user model");
        const newUser = new userModel({
          username: username,
          firstName: fname,
          lastName: lname,
          password: password
        });
        console.log("create new user named: " + newUser.username);
        await newUser.save((user:UserBE)=>{
          console.log("User registered successfuly!");
          res.sendStatus(200);
        }).catch((err: any)=>{
          console.log("Error registering: " + err);
          res.sendStatus(500);
        });
      });
    }

}
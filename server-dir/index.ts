/***
 * index.ts = boostrap file: 
 * initializing the node server using express.
 * loading up the various server-related files.
 */

import express, {Request, Response} from 'express';
import path from 'path';
import { connectToDb, keepAwake } from './utils/db_connections';
import { loadFile, loginUser, registerUser } from './utils/restful_connections';
import { createUserModel } from './utils/schemas';
import { Mongoose } from 'mongoose';


//set up useful consts:
const app = express();
const router = express.Router();
const port = 3080;
const db = 'mongodb://localhost:27017/SumSpace';

//declare static files used:
app.use(express.static('../app-dir/build'));


//start the app:
//const mongo = connectToDb(db);
const mongoose = new Mongoose();


const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

mongoose.connect(db, options).then(async ()=>{
  console.log("Successfully connected to the db!");
  //const userModel = createUserModel(mongoose);
  //console.log("Created new User Model");
  try {
    /* userModel.create(
      {
        username: "User",
        firstName: "First",
        lastName: "Last",
        password: "123"
      },
      (err,user) => {
        if (err){
          console.log("An Error has occured: " + err);
        }
        else {
          console.log("Sucessfuly saved user!");
        }
      }
    ) */
    //set up login screen api
    loginUser(router, mongoose);
    registerUser(router, mongoose);
  }
  catch(err){
    console.log(err);
  }
},err=>{
  console.log(err);
});
/* try {
    mongoose.connect(db, () => {
        console.log("connection successful!");
    });
    mongoose.connection.on('connect', ()=>{
        console.log("actually succesfully connected");
    })
}
catch (error){
    console.log(error);
} */
//keepAwake(mongo, db);

mongoose.connection.on('error',err=>{
  console.log(err);
});
mongoose.connection.on('disconnected', err=>{
  console.log(err);
});

loadFile(router, '/', path.join(__dirname,'../app-dir/build/index.html'));
// Handles any requests that don't match the ones above
loadFile(router, '*', path.join(__dirname,'../app-dir/build/index.html'));

app.use(express.json());
app.use('/', router);
//app.use()

//set up login screen api
//loginUser(router, mongoose);
//registerUser(router, mongoose);

/* router.post('/register',async (req: Request, res: Response)=>{
  console.log("body.params:");
  console.log(req.body.params);
  const {username, firstName, lastName, password} = req.body.params;
  console.log(username, firstName, lastName, password);
  try {
  const newUser = new userModel({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password
  });
  console.log("successfuly created newUser:" + newUser.username);
  await newUser.save((err:any,user:User)=>{
    if (err){
      console.log("Couldn't save! An error has accured: " + err);
    }
    else{
      console.log("Sucessfuly saved User!");
    }
  });
  }
  catch(err){
    console.log(username, firstName, lastName, password);
  }
}); */


app.listen(port, () => {
  /* if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
}); 
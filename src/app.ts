import express from 'express';
import mongoose from 'mongoose';
const {Mongoose} = mongoose;
import {connectToDb} from './server/db_connection.js';
import {loadHtml} from './server/restful_connections.js';
//import 'semantic-ui-css/semantic.min.css';

main().catch(err=>console.log(err));


async function main() {
  //declarations and setup
  const app = express();
  const router = express.Router();
  const port = 3000;
  const mongoose = new Mongoose();
  const db = 'mongodb://localhost:27017/SumSpace';
  app.use(express.static('./'));

  //load up the website
  loadHtml(router,'./index.html');
  
  //start the db connection
  connectToDb(mongoose, db);

  //start the server connection
  app.use('/', router);
  app.listen(port, () => {
    /* if (err) {
      return console.error(err);
    } */
    return console.log(`server is listening on ${port}`);
  });
}
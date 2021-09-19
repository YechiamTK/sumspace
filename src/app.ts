import express from 'express';
import { Mongoose } from 'mongoose';
import {connectToDb} from './db_connection';
import {loadHtml} from './restful_connections';
//import 'semantic-ui-css/semantic.min.css';

main().catch(err=>console.log(err));


async function main() {
  //declarations and setup
  const app = express();
  const router = express.Router();
  const port = 3000;
  const mongoose = new Mongoose();
  const db = 'mongodb://localhost:27017/SumSpace';
  app.use(express.static('dist'));

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
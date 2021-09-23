/***
 * index.ts = boostrap file: 
 * initializing the node server using express.
 * loading up the various server-related files.
 */

import express from 'express';
import path from 'path';
import { connectToDb } from './utils/db_connections';
import { loadFile } from './utils/restful_connections';


//set up useful consts:
const app = express();
const router = express.Router();
const port = 3080;
const db = 'mongodb://localhost:27017/SumSpace';

//declare static files used:
app.use(express.static('../app-dir/build'));


//start the app:
connectToDb(db);
loadFile(router, '/', path.join(__dirname,'../app-dir/build/index.html'));
// Handles any requests that don't match the ones above
loadFile(router, '*', path.join(__dirname,'../app-dir/build/index.html'));


app.use('/', router);

app.listen(port, () => {
  /* if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
}); 
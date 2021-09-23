/***
 * index.ts = boostrap file: 
 * initializing the node server using express.
 * loading up the various server-related files.
 */

import express from 'express';
import { connectToDb } from './utils/db_connections';
import { loadHtml } from './utils/restful_connections';


//set up useful consts:
const app = express();
const router = express.Router();
const port = 3080;
const db = 'mongodb://localhost:27017/SumSpace';

//declare static files used:
app.use(express.static('../app-dir/public'));
app.use(express.static('../app-dir/src'));

//start the app:
loadHtml(router, '../app-dir/public/index.html');
connectToDb(db);

app.use('/', router);
app.listen(port, () => {
  /* if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
}); 
import express from 'express';
//import 'semantic-ui-css/semantic.min.css';

const app = express();
const router = express.Router();
const port = 3000;
app.use(express.static('dist'));
router.get('/', (req, res) => {
  res.send('./index.html');
});

app.use('/', router);
app.listen(port, () => {
  /* if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
});
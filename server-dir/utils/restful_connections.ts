/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import { Router, Request, Response } from 'express';
import { Mongoose, ObjectId } from 'mongoose';
import { User, retrieveUserSchema, Article, Author, Summary, retrieveAuthorSchema, retrieveSummarySchema, retrieveArticleSchema } from './schemas';


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
    await userModel.findOne({'username': username, 'password': password}).exec().then((result: User)=>{
      console.log('User ' + result.username + ' found!');
      res.send(result.username);
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

/**
 * util function newAuthor:
 * 
 * registers a new author.
 * @param router express router to be used
 */
 export async function newAuthor(router: Router, mongoose: Mongoose){
  router.post('/new-author',async (req: Request, res: Response)=>{
    console.log("entered new-author");
    const {name} = req.body.params;
    console.log(req.body.params);
    const authorModel = mongoose.models.Author || mongoose.model('Author', retrieveAuthorSchema(mongoose));
    console.log("new-author: connected to author model");
    const author = new authorModel({
      name: name
    });
    console.log("new-author: create new author named: " + author.name);
    await author.save((err:any,author:Author)=>{
      if (err){
        console.log("new-author: An error has accured: " + err);
      }
      else{
        console.log("new-author: Author saved successfuly!");
        res.send(author.name);
      }
    });
  });
}

/**
 * util function getAuthors:
 * 
 * returns authors' names list.
 * @param router express router to be used
 */
 export async function getAuthorsNames(router: Router, mongoose: Mongoose){
  router.get('/get-authors',async (req: Request, res: Response)=>{
    console.log("entered get-authors");
    
    const authorModel = mongoose.models.Author || mongoose.model('Author', retrieveAuthorSchema(mongoose));
    console.log("get-authors: connected to author model");
    let authors = new Array<any>(); //want it to work first
    await authorModel.find({}).select('name -_id').exec().then((result: Array<Author>)=>{
      console.log("get-authors: result type is: " + typeof(result));
      authors = result.map(({name})=>name);
      console.log("get-authors: " + authors);
      res.send(authors);
  }).catch((err)=>{
        console.log("get-authors: An error has accured: " + err);
    });
    
    //need to insert check before send
  });
}

/**
 * util function newArticle:
 * 
 * inserts a new article from the given author.
 * @param router express router to be used
 */
 export async function newArticle(router: Router, mongoose: Mongoose){
  router.post('/new-article',async (req: Request, res: Response)=>{
    console.log("entered new-article");
    const {title, author, publishDate, link} = req.body.params;
    console.log("new-article: " + req.body.params);
    
    //recieve author's id
    const authorModel = mongoose.models.Author || mongoose.model('Author', retrieveAuthorSchema(mongoose));
    console.log("new-article: connected to author model");
    let authorId = mongoose.Types.ObjectId;
    await authorModel.findOne({
      params: {
        name: author
      }
    }, '_id').exec().then((result: any)=>{    //should be type ObjectId but ts screams
      console.log("new-article: result type is: " + typeof(result));
      authorId = result;
      console.log("new-article: " + authorId);
    });

    //save the article
    const articleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
    console.log("new-article: connected to article model");
    const article = new articleModel({
      title: title,
      _author: authorId,
      publishDate: publishDate,
      link: link
    });
    console.log("new-article: create new article named: " + article.title);
    console.log("new-article: with author's oid: " + article._author);
    await article.save((err:any,article:Article)=>{
      if (err){
        console.log("new-article: An error has accured: " + err);
      }
      else{
        console.log("new-article: Article saved successfuly!");
        res.send(article.title);
      }
    });
  });
}

/**
 * util function newSummary:
 * 
 * posts a new summary from the given user.
 * @param router express router to be used
 */
 export async function newSummary(router: Router, mongoose: Mongoose){
  router.post('/new-summary',async (req: Request, res: Response)=>{
    const {user, rating, likes, publishDate, article } = req.body.params;
    console.log(req.body.params);
    const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
    console.log("connected to summary model");
    const summary = new summaryModel({
      user: user,
      rating: rating,
      likes: likes,
      publishDate: publishDate,
      article: article
    });
    console.log("create new summary from user: " + summary.user);
    await summary.save((err:any,summary:Summary)=>{
      if (err){
        console.log("An error has accured: " + err);
      }
      else{
        console.log("Summary saved successfuly!");
      }
    });
  });
}






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
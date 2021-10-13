/***
 * restful_connections.ts = rest api file:
 * every restful connection function to the
 * client using express restful api.
 */

import { Router, Request, Response } from 'express';
import { LeanDocument, Mongoose } from 'mongoose';
import { User, retrieveUserSchema, Article, Author, Summary, retrieveAuthorSchema, retrieveSummarySchema, retrieveArticleSchema, retrieveTagSchema, Tag } from './schemas';


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
    const {title, author, publishDate, link, tags} = req.body.params;
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
      link: link,
      tags: tags  //by Oid
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
 * util function getAuthors:
 * 
 * returns authors' names list.
 * @param router express router to be used
 */
 export async function getArticlesNamesAndOid(router: Router, mongoose: Mongoose){
  router.get('/get-articles-names-oid',async (req: Request, res: Response)=>{
    console.log("entered get-articles-names-oid");
    
    const articleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
    console.log("get-articles-names-oid: connected to article model");
    let articles = new Array<any>(); //want it to work first
    await articleModel.find({}).select('title').exec().then((result: Array<Article>)=>{
      console.log("get-articles-names-oid: result type is: " + typeof(result));
      articles = result;
      console.log("get-articles-names-oid: " + articles);
      res.send(articles);
  }).catch((err)=>{
        console.log("get-articles-names-oid: An error has accured: " + err);
    });
    
    //need to insert check before send
  });
}

/**
 * util function getAuthors:
 * 
 * returns authors' names list.
 * @param router express router to be used
 */
 export async function getArticlesNames(router: Router, mongoose: Mongoose){
  router.get('/get-articles-names',async (req: Request, res: Response)=>{
    console.log("entered get-articles");
    
    const articleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
    console.log("get-articles: connected to article model");
    let articles = new Array<any>(); //want it to work first
    await articleModel.find({}).select('title -_id').exec().then((result: Array<Article>)=>{
      console.log("get-articles: result type is: " + typeof(result));
      articles = result.map(({title})=>title);
      console.log("get-articles: " + articles);
      res.send(articles);
  }).catch((err)=>{
        console.log("get-articles: An error has accured: " + err);
    });
    
    //need to insert check before send
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
    const {userId, summaryText, rating, likes, publishDate, article } = req.body.params;
    console.log("new-summary: " + req.body.params);

    //get article Oid
    const articleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
    console.log("new-summary: connected to article model");
    let articleOid = mongoose.Types.ObjectId;
    await articleModel.findOne({title: article}).select('_id').exec().then((result: typeof mongoose.Types.ObjectId)=>{
      articleOid = result;
    }).then(async ()=>{
      //afterwards, we can proceed to save the summary
      const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
      console.log("new-summary: connected to summary model");
      const summary = new summaryModel({
        user: userId,
        summary: summaryText,
        rating: rating,
        likes: likes,
        publishDate: publishDate,
        article: articleOid
      });
      //populate just to print the related article's name
      summaryModel.populate(summary,{path: 'article'}, ((err, summary)=>{
        if (err) console.log("new-summary: " + err);
        else console.log("new-summary: create new summary for article (title): " + summary.article.title);
      }));
      //and finally save the summary
      await summary.save((err:any,summary:Summary)=>{
        if (err){
          console.log("new-summary: An error has accured: " + err);
        }
        else{
          console.log("new-summary: Summary saved successfuly!");
        }
      });
    });
  });
}

/**
 * util function getSummaries:
 * 
 * retrieves summaries of a specific amount with skip.
 * 
 * NOTE: amount and skip MUST BE PASSED.
 * 
 * 
 * @param router express router to be used
 * @param mongoose mongoose object
 * @param amount pass to req.body.params desired
 * amount of summaries to pull. 
 * 
 * Pass `false` for all summaries.
 * @param skip pass to req.body.params desired
 * skip count. 
 * 
 * Pass 0 for no skip.
 * 
 * @returns stringified summaries:
 * 
 * [{_id, user, summary, comments, rating,
 * likes, publishDate, article, tags}]
 */
 export async function getSummaries(router: Router, mongoose: Mongoose){
  router.post('/get-summaries',async (req: Request, res: Response)=>{
    const { amount, skip } = req.body.params;
    // console.log("new-summary: " + req.body.params);
    console.log("entered get-summaries");

    const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
    await summaryModel.find().sort({_id: -1}).skip(skip || 0)
      .limit(amount || summaryModel.collection.estimatedDocumentCount()).lean().exec().then((result: LeanDocument<Summary>[])=>{
      if (result.length > 0) {
        console.log("get-summaries: found summaries! sending them now");
        res.send(JSON.stringify(result));
      }
      else {
        console.log("get-summaries: no matching summaries found");
      }
    }).catch((err)=>{
      console.log("get-summaries: an error occured: "+ err);
    });
  });
}

/**
 * util function findTagsOid:
 * 
 * searches for the requested tags and returns their oids.
 * @param router express router to be used
 */
 export async function findTagsOid(router: Router, mongoose: Mongoose){
  router.post('/find-tags-oid',async (req: Request, res: Response)=>{
    console.log("entered find-tags-oid");
    const {requestedTags} = req.body.params;
    console.log(requestedTags);
    const tagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
    console.log("find-tags-oid: connected to tag model");
    //search the tags, error if not all returns:
    await tagModel.find({"tagName": requestedTags}).select('_id').exec().then(async (result: Tag[])=>{
      //const unsavedTags = tags.
      const foundTags = result.map((tag: any)=>new tagModel({tagName: tag}));
      if (foundTags && (requestedTags.length != foundTags.length)) {
        console.log("find-tags-oid: Not all tags found!");
      }
      else {
        const sendTags = foundTags.map(({_id})=>_id);
        console.log("find-tags-oid: returning tags' oids: " + sendTags);
        res.send(sendTags);
      }
    })
  });
}

/**
 * util function newTags:
 * 
 * registers new tags.
 * @param router express router to be used
 */
 export async function newTags(router: Router, mongoose: Mongoose){
  router.post('/new-tags',async (req: Request, response: Response)=>{
    console.log("entered new-tags");
    const {tags} = req.body.params;
    console.log(tags, typeof(tags));
    const tagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
    console.log("new-tags: connected to tag model");
    //insert only the new tags using 'upsert':
    await tagModel.find({"tagName": tags}).select('tagName -_id').exec().then(async (result: Tag[])=>{
      //const unsavedTags = tags.
      console.log('new-tags: found tags: ' + result);
      const newTags = tags.map((tag: any)=>new tagModel({tagName: tag}));
      console.log('new-tags: new tags as tag model: ' + newTags);
      console.log('new-tags: new tags as tag model: ' + newTags.map((tag: any)=>tag.toString()));
      //await tagModel.updateMany({}, {$setOnInsert: newTags} ,{upsert: true, new: true}, (err:any, res:any)=>{
      let bulk = tagModel.collection.initializeUnorderedBulkOp();
      newTags.forEach((tag:any)=>bulk.insert(tag));
      await bulk.execute({}, (err:any, res:any)=>{
      //await tagModel.insertMany(newTags, {}, (err: any, res: any)=>{
        if (err && !(err.code === 11000)){
          console.log("new-tags: An error has accured: " + err);
          response.send('error');
        }
        else{
          console.log("new-tags: Tags saved successfuly!");
          response.send('success');
        }
      });
    }).catch((err)=>{
      console.log("new-tags: error occured: " + err);
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
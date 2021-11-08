/***
 * article.ts = rest api file for article queries
 */



import { Router, Request, Response } from "express";
import { Mongoose } from "mongoose";
import { retrieveAuthorSchema, retrieveArticleSchema, ArticleBE } from "../schemas";




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
  
      //receive the tags' ids
      /* const tagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
      console.log("new-article: connected to tag model");
      let tagsIds = new Array<ObjectId | undefined>();
      await tagModel.find({tagName: tags}).select('_id').exec().then((response: TagBE[])=>{
        response.forEach(tag=>{tagsIds.push(tag._id)});
      })
      console.log(tagsIds); */
  
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
      await article.save((err:any,article:ArticleBE)=>{
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
      await articleModel.find({}).select('title').exec().then((result: Array<ArticleBE>)=>{
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
      await articleModel.find({}).select('title -_id').exec().then((result: Array<ArticleBE>)=>{
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
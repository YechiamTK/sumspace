/***
 * article.ts = rest api file for article queries
 */



import { Router, Request, Response } from "express";
import { Mongoose } from "mongoose";
import { retrieveAuthorSchema, retrieveArticleSchema, ArticleBE } from "../schemas";



export class Articles{

  router: Router;
  mongoose: Mongoose;


  constructor (router: Router, mongoose: Mongoose) {
    this.router = router;
    this.mongoose = mongoose;
    this.newArticle();
    this.getArticles();
    //---add any additional functions here---
  }



  
  /**
   * util function newArticle:
   * 
   * creates a new article with given parameters.
   * 
   * @param title
   * @param author
   * @param publishDate
   * @param link
   * @param tags
   * 
   */
  async newArticle() {
    this.router.post('/articles', async (req: Request, res: Response)=>{
      console.log("entered /articles in a post method (new article)");
      const {title, author, publishDate, link, tags} = req.body.params;
      console.log("new-article: " + req.body.params);
      
      //recieve author's id
      const authorModel = this.mongoose.models.Author || this.mongoose.model('Author', retrieveAuthorSchema(this.mongoose));
      console.log("new-article: connected to author model");
      let authorId = this.mongoose.Types.ObjectId;
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
      const articleModel = this.mongoose.models.Article || this.mongoose.model('Article', retrieveArticleSchema(this.mongoose));
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
   * util function getArticles:
   * 
   * returns articles with given query (id and fields).
   * 
   * @param id "" for all, otherwise Oid
   * @param query fields to select, in the format "field field field"
   *              optional: removing a field (such as id): "-_id"
   *              for example: "title author -_id"
   * 
   */
  async getArticles(){
    this.router.get('/articles/:id/q/:query',async (req: Request, res: Response)=>{
      console.log("entered /articles with get method (recieve articles with given parameters)");
      
      const {id, query} = req.params;
      
      //check if id and query are fine
      console.log(typeof(id), typeof(query));
      //if (typeof id != typeof(""))

      const articleModel = this.mongoose.models.Article || this.mongoose.model('Article', retrieveArticleSchema(this.mongoose));
      console.log("get-articles: connected to article model");

      if (id == ""){
        await articleModel.find({}).select(query).exec().then((result: Array<ArticleBE>)=>{
          console.log("get-articles: result type is: " + typeof(result));
          //articles = result;
          //console.log("get-articles-names-oid: " + articles);
          res.json(JSON.stringify(result));
        }).catch((err)=>{
            console.log("get-articles-names-oid: An error has accured: " + err);
        });
      }
      else {
        await articleModel.findOne({_id: id}).select(query).exec().then((result: ArticleBE)=>{
          console.log("get-articles: result type is: " + typeof(result));
          //articles = result;
          //console.log("get-articles-names-oid: " + articles);
          res.json(JSON.stringify(result));
        }).catch((err)=>{
            console.log("get-articles: An error has accured: " + err);
        });
      }
      
      //need to insert check before send
    });
  }
}
/***
 * summary.ts = rest api file for summary queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveArticleSchema, retrieveSummarySchema, SummaryBE, retrieveTagSchema, TagBE, retrieveUserSchema, retrieveCommentSchema } from "../schemas";



export class Summaries{

  router: Router;
  mongoose: Mongoose;

  constructor(router: Router, mongoose: Mongoose){
    this.router = router;
    this.mongoose = mongoose;
    this.autoPopulateCommentsInSummary();
    this.newSummary();
    this.getSummaries();
    this.fullSummary();
    this.actionSummary();
    //---add any additional functions here---
  }
  

  /**
   * util function autoPopulateCommentsInSummary:
   * 
   * preps summary model with auto-population of comments model.
   * works only with findOne function (middleware).
   * 
   */
  autoPopulateCommentsInSummary(){
    const summarySchema = retrieveSummarySchema(this.mongoose);
    summarySchema.pre("findOne",function(next){
      this.populate('comments');
      console.log("auto-population: this works");
      next();
    });
    summarySchema.pre("save",function(next){
      this.populate('comments');
      console.log("auto-population: this works");
      next();
    });
  }
  
  /**
   * util function newSummary:
   * 
   * posts a new summary from the given user.
   * 
   * @param userId
   * @param summaryText
   * @param rating
   * @param rating
   * @param likes
   * @param publishDate
   * @param article title
   * 
   */
  async newSummary(){
    this.router.post('/summaries',async (req: Request, res: Response)=>{
      
      const {userId, summaryText, rating, likes, publishDate, article } = req.body.params;
      console.log("new-summary: " + req.body.params);
  
      //get article Oid
      const articleModel = this.mongoose.models.Article || this.mongoose.model('Article', retrieveArticleSchema(this.mongoose));
      console.log("new-summary: connected to article model");
      let articleOid = this.mongoose.Types.ObjectId;
      await articleModel.findOne({title: article}).select('_id').exec().then((result: typeof this.mongoose.Types.ObjectId)=>{
        articleOid = result;
      }).then(async ()=>{
        //afterwards, we can proceed to save the summary
        const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
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
        await summary.save((err:any,summary:SummaryBE)=>{
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
     * Accepted method: /summaries/q?search=&amount=&skip=
     *
     * @param id logged user's id
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
     async getSummaries(){
      this.router.get('/summaries',async (req: Request, res: Response)=>{
        const { search, amount, skip }/* :{search:string, amount: number, skip:number} */ = req.query;
        if (Array.isArray(search) || Array.isArray(amount) || Array.isArray(skip)){
          res.sendStatus(400);
          throw new Error("Wrong parameters: too many");
        }
        console.log("entered get-summaries");
    
        //let userId = new mongoose.Types.ObjectId(id);
        //const userModel = mongoose.models.User || mongoose.model('User', retrieveUserSchema(mongoose));
        const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
        const articleModel = this.mongoose.models.Article || this.mongoose.model('Article', retrieveArticleSchema(this.mongoose));
        const tagModel = this.mongoose.models.Tag || this.mongoose.model('Tag', retrieveTagSchema(this.mongoose));
        //let query = {};
        //user.followUser.summaries
    
        //explanation:
        //first, first the user and select its followed authors, users and tags
        //then, find the summaries associated with those authors, users or tags
        //question - also provide the user's posts?
        //send those summaries back to the app
        /* await userModel.findOne({_id: userId}).select('followedAuthors followedUsers followedTags -_id')
              .exec().then(async (response:UserBE)=>{
                console.log(response);
                //TODO: need to add author in summary model as well; perhaps should rethink a bit about the connections
                await summaryModel.find({user: response.followedUsers, tags: response.followedTags}).sort({_id: -1})
                      .skip(skip || 0).limit(amount || (await summaryModel.collection.estimatedDocumentCount()).valueOf())
                      .lean().exec().then((result: LeanDocument<SummaryBE>[])=>{
                        console.log(result[0]);
                        if (result.length > 0) {
                          console.log("get-summaries: found summaries! sending them now");
                          res.send(JSON.stringify(result));
                        }
                        else {
                          console.log("get-summaries: no matching summaries found");
                          res.send("none");
                        }
                  }).catch((err)=>{
                    console.log("get-summaries: an error occured: "+ err);
                });
          }).catch((err)=>{
            console.log("get-summaries: an error occured: "+ err);
        }); */
    
        let regex = new RegExp(".?" + search as string + ".?", "i");
        console.log(regex);
    
        /* 
        .populate({path: 'article', match: {title: {"$regex": ".?"+search+".?", "$options": "i"}}})
        .populate({path: 'tags', match: {tagName: {"$regex": ".?"+search+".?", "$options": "i"}}}) */
    
        //if I will decide one big query is better:
        await summaryModel.find()
          .populate('article').populate('tags').sort({_id: -1}).skip(parseInt(skip as string) || 0)
          .limit(parseInt(amount as string) || 
                 (await summaryModel.collection.estimatedDocumentCount()).valueOf())  //this might potentially not work with valueOf(), should test
          .exec().then((result: any[])=>{
          if (result.length > 0) {
            console.log("get-summaries: found summaries! sending them now");
            console.log("number of results: " + result.length);
            let retSummaries = new Array<LeanDocument<SummaryBE>>();
            result.forEach((summary:SummaryBE)=>{
              if (typeof summary.article === "object" && regex.test(summary.article.title)) {
                console.log("populated article: " + summary);
                console.log("the article title: " + summary.article.title);
                console.log("the article: " + summary.article);
                retSummaries.push(summary);
              }
              else if (summary.tags && summary.tags.length > 0){
                let matchedTags = summary.tags.map((tag:TagBE)=>{regex.test(tag.tagName)});
                if (matchedTags.length > 0) {     //not sure this works, need to test
                  console.log("populated tags: " + summary);
                  console.log("the tags: " + matchedTags);
                  retSummaries.push(summary);
                }
              }
              else if(regex.test(summary.summary)){
                console.log("normal summary: " + summary);
                console.log("the title: " + summary.summary);
                retSummaries.push(summary);
              }
            })
            res.send(JSON.parse(JSON.stringify(retSummaries)));
          }
          else {
            console.log("get-summaries: no matching summaries found");
            res.send("none");
          }
        }).catch((err)=>{
          console.log("get-summaries: an error occured: "+ err);
        });
      });
    }
    
    /**
     * util function fullSummary
     * 
     * returns fully populated summary.
     * 
     * @param summaryId
     * 
    */
    async fullSummary(){
      this.router.get('/summaries/:id', (req: Request, res: Response)=>{
        const { summaryId } = req.params;
    
        const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
        const userModel = this.mongoose.models.User || this.mongoose.model('User', retrieveUserSchema(this.mongoose));
        const CommentModel = this.mongoose.models.Comment || this.mongoose.model('Comment', retrieveCommentSchema(this.mongoose));
        const ArticleModel = this.mongoose.models.Article || this.mongoose.model('Article', retrieveArticleSchema(this.mongoose));
        const TagModel = this.mongoose.models.Tag || this.mongoose.model('Tag', retrieveTagSchema(this.mongoose));
    
        summaryModel.findOne({'_id': summaryId})
                    .populate('user').populate('article').populate('tags')
                    .populate({
                      path:     'comments',			
                      populate: { path:  'user',
                              model: 'User' }
                    })
                    .populate({
                      path:     'comments',			
                      populate: { path:  'comments',
                              model: 'Comment' }
                    }).populate('comments')
                    .lean().exec().then((result: LeanDocument<SummaryBE>)=>{
                      res.send(result);
            }).catch((err)=>{
              console.log(err);
          });
      })
    }
    
  /**
     * util function rateSummary
     * 
     * add another rating to the summary.
     * calculates the rating accumulatively.
     * rating[0] => the total rating.
     * 
     * @param summaryId
     * @param action - fisrt word=action
     *               - optional words=params for action
     *               actions available: rating, likes
     * 
     */
  async actionSummary(){
    this.router.post('/summaries/:id/action/:action', (req: Request, res: Response)=>{
      const { summaryId, action } = req.params;

      let actionToCheck = action.split('-');
      
      if (actionToCheck.length > 2){
        res.sendStatus(400);
        throw new Error("Wrong parameters: too many");
      }
  
      console.log("rate-summary: entered rate summary");
      
      const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
  
      summaryModel.findOne({'_id': summaryId}).orFail().exec().then(async (result: any /* my types aren't good enough */)=>{
        console.log("rate-summary: found the summary with id: " + result._id);
        switch (actionToCheck[0]){
          case "rating":{
            result.rating.push(actionToCheck[1]);
            result.rating[0] = result.rating.slice(1).reduce((a:number,b:number)=>a+b,0)/result.rating.length;
            break;
          }
          case "like":{
            result.likes += 1;
            break;
          }
          default:{
            throw new Error("InvalidAction");
          }
        };
        await result.save((err:any,summary:SummaryBE)=>{
          console.log("rate-summary: err is: " + err);
          console.log("rate-summary: summary is: " + summary);
          if (err){
            res.send("Error occured! " + err);
            if (err.name == "DocumentNotFoundError") res.sendStatus(404);
            else if (err.name="InvalidAction") res.sendStatus(400);
            else res.sendStatus(500);
          }
          else{
            console.log("rate-summary: managed to save the summary");
            let actionToSend = {};
            switch (actionToCheck[0]){
              case "rating":{
                actionToSend = {"rating" : summary.rating[0]};
                break;
              }
              case "like":{
                actionToSend = {"likes" : summary.likes};
                break;
              }
            }
            res.json(JSON.stringify(actionToSend));
          }
        });
      });
    });
  }
}

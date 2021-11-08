/***
 * summary.ts = rest api file for summary queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveArticleSchema, retrieveSummarySchema, SummaryBE, retrieveTagSchema, TagBE, retrieveUserSchema, retrieveCommentSchema } from "../schemas";



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
   * 
   * @param router express router to be used
   * @param mongoose mongoose object
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
   export async function getSummaries(router: Router, mongoose: Mongoose){
    router.post('/get-summaries',async (req: Request, res: Response)=>{
      const { search, amount, skip }:{search:string, amount: number, skip:number} = req.body.params;
      // console.log("new-summary: " + req.body.params);
      console.log("entered get-summaries");
  
      //let userId = new mongoose.Types.ObjectId(id);
      //const userModel = mongoose.models.User || mongoose.model('User', retrieveUserSchema(mongoose));
      const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
      const articleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
      const tagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
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
  
      let regex = new RegExp(".?" + search + ".?", "i");
      console.log(regex);
  
      /* 
      .populate({path: 'article', match: {title: {"$regex": ".?"+search+".?", "$options": "i"}}})
      .populate({path: 'tags', match: {tagName: {"$regex": ".?"+search+".?", "$options": "i"}}}) */
  
      //if I will decide one big query is better:
      await summaryModel.find()
        .populate('article').populate('tags').sort({_id: -1}).skip(skip || 0)
        .limit(amount || (await summaryModel.collection.estimatedDocumentCount()).valueOf())  //this might potentially not work with valueOf(), should test
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
   * returns fully populated summary
   * 
   * expects summary id
   * 
   * @param router express router to be used
   * @param mongoose mongoose object
   */
  export async function fullSummary(router: Router, mongoose: Mongoose){
    router.post('/full-summary', (req: Request, res: Response)=>{
      const { summaryId } = req.body.params;
  
      const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
      const userModel = mongoose.models.User || mongoose.model('User', retrieveUserSchema(mongoose));
      //const CommentModel = mongoose.models.Comment || mongoose.model('Comment', retrieveCommentSchema(mongoose));
      const ArticleModel = mongoose.models.Article || mongoose.model('Article', retrieveArticleSchema(mongoose));
      const TagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
  
      summaryModel.findOne({'_id': summaryId})
                  .populate('user').populate('article').populate('tags')
                  .populate({
                    path:     'comments',			
                    populate: { path:  'user',
                            model: 'User' }
                  })
                  .lean().exec().then((result: LeanDocument<SummaryBE>)=>{
                    console.log(result);
                    res.send(result);
          }).catch((err)=>{
            console.log(err);
        });
    })
  }
  
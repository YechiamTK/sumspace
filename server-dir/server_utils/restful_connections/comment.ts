/***
 * comment.ts = rest api file for comment queries
 */



import { Router, Request, Response } from "express";
import { Mongoose } from "mongoose";
import { retrieveCommentSchema, retrieveSummarySchema, CommentBE, SummaryBE, retrieveUserSchema } from "../schemas";



export class Comments{

  router: Router;
  mongoose: Mongoose;

  constructor (router: Router, mongoose: Mongoose){
    this.router = router;
    this.mongoose = mongoose;
    this.newComment();
    this.newReplyToComment()
    //---add any additional functions here---
  }



  
  /**
   * util function newComment
   * 
   * save new comment in the summary with given parameters.
   * 
   * @param userId
   * @param commentText
   * @param summaryId given in path
   */
  async newComment(){
    this.router.post('/summaries/:id/comments/', async (req: Request, response: Response)=>{
      console.log("entered new-comment");
      const { summaryId } = req.params;
      const { userId, commentText } = req.body.params;
  
      const commentModel = this.mongoose.models.Comment || this.mongoose.model('Comment', retrieveCommentSchema(this.mongoose));
      console.log("new-comment: connected to comment model");
      const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
      console.log("new-comment: connected to summary model");
      const userModel = this.mongoose.models.User || this.mongoose.model('User', retrieveUserSchema(this.mongoose));
      console.log("new-comment: connected to user model");

      //create the comment
      const comment = new commentModel({
        user: userId,
        text: commentText,
        date: new Date().toLocaleDateString(),
        likes: 0,
        ancestors: []
      });
      
      //connect to the summary
      await summaryModel.findOne({'_id': summaryId}).populate({/*tbh this isn't very atomic, I'll might need to rethink it later*/
            path:     'comments',			
            populate: { path:  'user',
                    model: 'User' }
        })
        .exec().then(async (result: any)=>{ //any because the document type isn't good enough
          (result.comments ?
            //if the comments exists, simply push the comment
            (result.comments.push(comment))
            :
            //otherwise create the array first, then push
            (result.comments = new Array<CommentBE>(),
            result.comments.push(comment))
          )
          console.log("new-comment: new comments looks like " + result.comments);
        
          //save as subdoc to summary
          await result.save((err:any,doc: SummaryBE)=>{
            if (err){
              console.log("new-comment: An error has accured: " + err);
              response.send("error occured");
            }
            else{
              console.log("new-comment: Comment saved successfuly!");
              //console.log(doc.comments);
              response.send(JSON.parse(JSON.stringify(doc.comments)));
            }
          });
      });
    });
  }
    
  
  //////THIS WILL NEED A COMPLETE REWRITE
  /**
   * util function newReplyToComment
   * 
   * save new reply to a comment in the summary.
   * 
   * @param router 
   * @param mongoose
   */
   async newReplyToComment(){
    this.router.post('/summaries/:id/comments/ancestors/:ids', async (req: Request, response: Response)=>{
      console.log("entered new-reply-comment");
      const { summaryId, ancestors } = req.params;
      const { userId, commentText, level } = req.body.params;
  
      console.log("new-reply-comment: ancestors are: " + ancestors);
  
      const commentModel = this.mongoose.models.Comment || this.mongoose.model('Comment', retrieveCommentSchema(this.mongoose));
      console.log("new-reply-comment: connected to comment model");
      const summaryModel = this.mongoose.models.Summary || this.mongoose.model('Summary', retrieveSummarySchema(this.mongoose));
      console.log("new-reply-comment: connected to summary model");
      const userModel = this.mongoose.models.User || this.mongoose.model('User', retrieveUserSchema(this.mongoose));
      console.log("new-reply-comment: connected to user model");
  
      //create the comment
      const comment = new commentModel({
        user: userId,
        text: commentText,
        date: new Date().toLocaleDateString(),
        likes: 0,
        ancestors: ancestors
      });
      console.log("new-reply-comment: new comment is: " + comment);
      
      //connect to the summary
      await summaryModel.findOne({'_id': summaryId}).populate({/*tbh this isn't very atomic, I'll might need to rethink it later*/
            path:     'comments',			
            populate: { path:  'user',
                    model: 'User' }
        })
        .exec().then(async (result: any)=>{ //any because the document type isn't good enough
          let comments = result.comments;
          /* console.log("new-reply-comment: " + result.comments);
          const foo = (a:any, b:string, curLevel:number, expLevel:number):any => {
            if (curLevel!=expLevel){
              curLevel++;
              return (foo(a[b], b, curLevel+1, expLevel));
            }
            return (a);
          } */
          //console.log(foo(result, 'comments', 0, level));
         // console.log("new-reply-comment: " + foo(result.comments, 'comments', 0, level));
         let i=0;
         let flag = false;
          for (i; i<level;i++){
            for (let j=0; j<comments.length;j++){
              console.log("new-reply-comment: let's see the id itself" + comments[j]._id);
              if (String(comments[j]._id) == String(ancestors[i])){
                console.log("new-reply-comment: found the ancestor: " + ancestors[i]);
                comments = comments[j].comments;
                flag = true;
              }
            }
          }
          if (!flag) console.log("new-reply-comment: THIS AINT WORKING MATE");
          //console.log("new-comment: comments is at level " + level);
          (comments ?
            //if the comments exists, simply push the comment
            (comments.push(comment))
            :
            //otherwise create the array first, then push
            (comments = new Array<CommentBE>(),
            comments.push(comment))
          )
  
        
          console.log("new-reply-comment: is modified? " + result.isModified('comments'));
          result.markModified('comments');
          console.log("new-reply-comment: is modified now? " + result.isModified('comments'));
          console.log("new-reply-comment: and is that modified? " + result.isModified('comments.0.comments'));
          console.log("new-reply-comment: so what is that? " + result.comments[0]);
          console.log("new-reply-comment: and this? " + result.comments[0].comments);
        
          console.log("new-reply-comment: new comments at level " + i + " looks like " + comments);
        
          //save as subdoc to summary
          await result.save((err:any,doc: SummaryBE)=>{
            if (err){
              console.log("new-reply-comment: An error has accured: " + err);
              response.send("error occured");
            }
            else{
              console.log("new-reply-comment: Comment saved successfuly!");
              console.log(doc.comments);
              response.send(JSON.parse(JSON.stringify(doc)));
            }
          });
      });
    });
  }

}


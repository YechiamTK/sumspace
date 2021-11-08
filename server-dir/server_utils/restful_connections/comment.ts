/***
 * comment.ts = rest api file for comment queries
 */



import { Router, Request, Response } from "express";
import { Mongoose } from "mongoose";
import { retrieveCommentSchema, retrieveSummarySchema, CommentBE, SummaryBE } from "../schemas";



/**
 * util function newComment
 * 
 * save new comment in the summary.
 * 
 * @param router 
 * @param mongoose
 */
 export async function newComment(router: Router, mongoose: Mongoose){
    router.post('/new-comment', async (req: Request, response: Response)=>{
      console.log("entered new-comment");
      const { userId, commentText, summaryId } = req.body.params;
  
      const commentModel = mongoose.models.Comment || mongoose.model('Comment', retrieveCommentSchema(mongoose));
      console.log("new-comment: connected to comment model");
      const summaryModel = mongoose.models.Summary || mongoose.model('Summary', retrieveSummarySchema(mongoose));
      console.log("new-comment: connected to summary model");
  
      //create the comment
      const comment = new commentModel({
        user: userId,
        text: commentText,
        date: new Date().toLocaleDateString(),
        likes: 0
      });
      
      //connect to the summary
      await summaryModel.findOne({'_id': summaryId}).exec().then(async (result: any)=>{ //any because the document type isn't good enough
        (result.comments ?
          //if the comments exists, simply push the comment
          (result.comments.push(comment))
          :
          //otherwise create the array first, then push
          (result.comments = new Array<CommentBE>(),
          result.comments.push(comment))
        )
        
        //save as subdoc to summary
        await result.save((err:any,doc: SummaryBE)=>{
          if (err){
            console.log("new-comment: An error has accured: " + err);
            response.send("error occured");
          }
          else{
            console.log("new-comment: Comment saved successfuly!");
            response.send("success");
          }
        });
      });
    });
  
  }
  
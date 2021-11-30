/***
 * summary.ts = rest api file for summary queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveTagSchema, TagBE } from "../schemas";



export class Tags{

  router : Router;
  mongoose : Mongoose;

  constructor(router: Router, mongoose: Mongoose){
    this.router = router;
    this.mongoose = mongoose;
    this.getTags();
    this.newTags();
    //---add any additional functions here---
  }


  
  /**
   * util function findTagsOid:
   * 
   * searches for the requested tags and returns their oids.
   * @param router express router to be used
   */
   async getTags(){
      this.router.get('/tags/q/:query/s/:select',async (req: Request, res: Response)=>{
        console.log("entered find-tags-oid");
        const { query, select } = req.params;
        console.log(query, select);

        let requestedTags = query.split('-');
        requestedTags = Object.fromEntries(requestedTags.map(elem=>elem.split(':')));
        for (const elem in requestedTags) {if(elem == "" || requestedTags[elem] == "") throw new Error("BadParameters")}
        //should probably check for select as well, but a bit more convoluted

        const tagModel = this.mongoose.models.Tag || this.mongoose.model('Tag', retrieveTagSchema(this.mongoose));
        console.log("find-tags-oid: connected to tag model");
        //search the tags, error if not all returns:
        await tagModel.find(requestedTags).select(select).orFail().lean().exec().then((result: LeanDocument<TagBE>[])=>{
          //const unsavedTags = tags.
          //commenting that out for now:
          /* const foundTags = result.map((tag: any)=>new tagModel({tagName: tag}));
          if (foundTags && (requestedTags.length != foundTags.length)) {
            console.log("find-tags-oid: Not all tags found!");
          } */
          
          //const sendTags = foundTags.map(({_id})=>_id);
          console.log("find-tags-oid: returning tags: " + result);
          res.json(JSON.stringify(result));
        }).catch((err)=>{
          if (err.name == "DocumentNotFoundError") res.sendStatus(404);
          else if (err.name == "BadParameters") res.sendStatus(400);
          else res.sendStatus(500);
        });
      });
    }
    

    ///SHOULD PROBABLY NEED A REWRITE
    /**
     * util function newTags:
     * 
     * registers new tags.
     * @param router express router to be used
     */
     async newTags(){
      this.router.post('/tags',async (req: Request, response: Response)=>{
        console.log("entered new-tags");
        const {tags} = req.body.params;
        console.log(tags, typeof(tags));
        const tagModel = this.mongoose.models.Tag || this.mongoose.model('Tag', retrieveTagSchema(this.mongoose));
        console.log("new-tags: connected to tag model");
        //insert only the new tags using 'upsert':
        await tagModel.find({"tagName": tags}).select('tagName -_id').exec().then(async (result: TagBE[])=>{
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
    
}

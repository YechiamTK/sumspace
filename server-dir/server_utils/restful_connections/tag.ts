/***
 * summary.ts = rest api file for summary queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveTagSchema, TagBE } from "../schemas";



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
      await tagModel.find({"tagName": requestedTags}).select('_id').exec().then(async (result: TagBE[])=>{
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
   * util function getTags:
   * 
   * searches for the requested tags and returns their oids.
   * @param router express router to be used
   */
   export async function getTags(router: Router, mongoose: Mongoose){
    router.get('/get-tags',async (req: Request, res: Response)=>{
      console.log("entered get-tags-");
      //const {requestedTags} = req.body.params;
      //console.log(requestedTags);
      const tagModel = mongoose.models.Tag || mongoose.model('Tag', retrieveTagSchema(mongoose));
      console.log("find-tags-oid: connected to tag model");
      //search the tags, error if not all returns:
      await tagModel.find().select('tagName').lean().exec().then(async (result: LeanDocument<TagBE>[])=>{
        if (result.length > 0)
          res.send(JSON.stringify(result));
        else
          res.send("error: no tags available");
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
  
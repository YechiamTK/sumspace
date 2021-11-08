/***
 * author.ts = rest api file for author queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveAuthorSchema, AuthorBE } from "../schemas";



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
        await author.save((err:any,author:AuthorBE)=>{
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
export async function getAuthors(router: Router, mongoose: Mongoose){
router.get('/get-authors',async (req: Request, res: Response)=>{
    console.log("entered get-authors");
    
    const authorModel = mongoose.models.Author || mongoose.model('Author', retrieveAuthorSchema(mongoose));
    console.log("get-authors: connected to author model");
    let authors = new Array<any>(); //want it to work first
    await authorModel.find({}).select('name').lean().exec().then((result: LeanDocument<AuthorBE>[])=>{
    if (result.length > 0)
        res.send(JSON.stringify(result));
    else
        res.send("error: no authors available");
    }).catch((err)=>{
    console.log("get-authors: An error has accured: " + err);
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
export async function getAuthorsNames(router: Router, mongoose: Mongoose){
    router.get('/get-authors-names',async (req: Request, res: Response)=>{
        console.log("entered get-authors");
        
        const authorModel = mongoose.models.Author || mongoose.model('Author', retrieveAuthorSchema(mongoose));
        console.log("get-authors: connected to author model");
        let authors = new Array<any>(); //want it to work first
        await authorModel.find({}).select('name -_id').exec().then((result: Array<AuthorBE>)=>{
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
  
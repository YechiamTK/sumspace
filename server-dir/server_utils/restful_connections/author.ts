/***
 * author.ts = rest api file for author queries
 */



import { Router, Request, Response } from "express";
import { Mongoose, LeanDocument } from "mongoose";
import { retrieveAuthorSchema, AuthorBE } from "../schemas";



export class Authors{

    router: Router;
    mongoose: Mongoose;

    constructor (router: Router, mongoose: Mongoose){
        this.router = router;
        this.mongoose = mongoose;
        this.newAuthor();
        this.getAllAuthors();
        this.getAuthors();
        //---add any additional functions here---
    }
    


    
    /**
     * util function newAuthor:
     * 
     * registers a new author with given name.
     * 
     * @param name
     */
    async newAuthor(){
        this.router.post('/authors',async (req: Request, res: Response)=>{
            console.log("entered new-author");
            const {name} = req.body.params;
            console.log(req.body.params);
            const authorModel = this.mongoose.models.Author || this.mongoose.model('Author', retrieveAuthorSchema(this.mongoose));
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
                res.json(JSON.stringify(author));
            }
            });
        });
    }
      

    
    /**
     * util function getAllAuthors:
     * 
     * returns all authors in the db.
     * 
     */
     async getAllAuthors(){
        this.router.get('/authors',async (req: Request, res: Response)=>{
            console.log("entered getAllAuthors");

            const authorModel = this.mongoose.models.Author || this.mongoose.model('Author', retrieveAuthorSchema(this.mongoose));
            console.log("get-authors: connected to author model");
            //let authors = new Array<any>(); //want it to work first
            await authorModel.find({}).lean().orFail().exec().then((result: LeanDocument<AuthorBE>[])=>{
                res.json(JSON.stringify(result));
            }).catch((err)=>{
                console.log("get-authors: An error has accured: " + err);
                if (err.name == "DocumentNotFoundError")
                    res.sendStatus(404);
                else res.sendStatus(500);
            });
            //need to insert check before send
        });
    }


    /**
     * util function getAuthors:
     * 
     * returns authors based on given query.
     * 
     * @param id "" for all, otherwise Oid
     * @param query fields to select, in the format "field:field:field"
     *              optional: removing a field (such as id): "-_id"
     *              for example: "name:-_id"
     */
    async getAuthors(){
        this.router.get('/authors/:id/q/:query',async (req: Request, res: Response)=>{
            console.log("entered get-authors");

            const {id, query} = req.params;
            console.log(typeof(id), typeof(query));

            const splitQuery = query.split(':');
            const parsedQuery = splitQuery.reduce((prev, curr) => {
                return prev.concat(' ' + curr);
            });

            
            const authorModel = this.mongoose.models.Author || this.mongoose.model('Author', retrieveAuthorSchema(this.mongoose));
            console.log("get-authors: connected to author model");
            //let authors = new Array<any>(); //want it to work first
            if (id == ""){
                await authorModel.find({}).select(parsedQuery).lean().orFail().exec().then((result: LeanDocument<AuthorBE>[])=>{
                    res.json(JSON.stringify(result));
                }).catch((err)=>{
                    console.log("get-authors: An error has accured: " + err);
                    if (err.name == "DocumentNotFoundError")
                        res.sendStatus(404);
                    else res.sendStatus(500);
                });
            }
            else {
                await authorModel.findOne({_id: id}).select(parsedQuery).lean().orFail().exec().then((result: LeanDocument<AuthorBE>)=>{
                    res.json(JSON.stringify(result));
                }).catch((err)=>{
                    console.log("get-authors: An error has accured: " + err);
                    if (err.name == "DocumentNotFoundError")
                        res.sendStatus(404);
                    else res.sendStatus(500);
                });
            }
            
            //need to insert check before send
        });
    }
}


  
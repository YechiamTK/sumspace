import {Mongoose} from 'mongoose';

const mongoose = new Mongoose();


/***
 * Interfaces used for the Schemas.
 */

export interface User {
    username : string,
    firstName : string,
    lastName : string,
    password : string,
    summaries? : Array<Summary>,
    followedAuthors? : Array<Author>,
    followedTags? : Array<Tag>,
    followedUsers? : Array<User>
}

interface Article {
    title : string,
    author : string,
    publishDate : Date,
    link : string,
    tags? : Array<Tag>
}

interface Summary { 
    user : User,
    comments? : Array<Comment>,
    rating? : number,
    likes : number,
    publishDate : Date,
    article : Article,
    tags? : Array<Tag>
}

interface Comment {
    user : User,
    comments? : Array<Comment>,
    likes : number
}

interface Tag {
    tagName : string
}

interface Author {
    name : string,
    articles? : Array<Article>
}

/***
 * userSchema:
 * MongoDB Schema to represent a user.
 */
const userScehma = new mongoose.Schema<User>({
    username : { type: String, required: true },
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    password : { type: String, required: true },
    summaries : [{type:mongoose.Schema.Types.ObjectId, ref: 'Summary'}],
    followedAuthors : [{type:mongoose.Schema.Types.ObjectId, ref: 'Author'}],
    followedTags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    followedUsers : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

/***
 * User:
 * create a new user in the database.
 * 
 * @param username
 * @param firstName
 * @param lastName
 * @param password
 * @param summaries an array of type Summary
 * @param followedAuthors an array of type Author
 * @param followedTags an array of type Tag
 * @param followedUsers an array of type User
 */
export const userModel = mongoose.model('User', userScehma);


/***
 * articleSchema:
 * MongoDB Schema to represent an article.
 */
const articleScehma = new mongoose.Schema<Article>({
    title : {type: String, required: true},
    author : {type: String, required: true},
    publishDate : {type: Date, required: true},
    link : {type: String, required: true},
    tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

/***
 * Article:
 * create a new article in the database.
 * 
 * @param title
 * @param author of type Author
 * @param publishDate of type Date
 * @param link
 * @param tags an array of type Tag
 */
export const articleModel = mongoose.model('Article', articleScehma);


/***
 * summarySchema:
 * MongoDB Schema to represent a summary.
 */
const summaryScehma = new mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    rating : {type: Number, required: true},
    likes : {type: Number, required: true},
    publishDate : {type: Date, required: true},
    article : {type:mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
    tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

/***
 * Summary:
 * create a new summary in the database.
 * 
 * @param user of type User
 * @param comments an array of type Comment
 * @param rating numerical representation of the summary's worth
 * @param likes
 * @param publishDate of type Date
 * @param article of type Article
 * @param followedUsers an array of type User
 */
export const summaryModel = mongoose.model('Summary', summaryScehma);


/***
 * commentSchema:
 * MongoDB Schema to represent a comment.
 */
const commentScehma = new mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
    comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    likes : {type: Number, required: true}
});

/***
 * Comment:
 * create a new comment in the database.
 * 
 * @param user of type User
 * @param followedAuthors an array of type Comment
 * @param likes
 */
export const commentModel = mongoose.model('Comment', commentScehma);


/***
 * tagSchema:
 * MongoDB Schema to represent a tag.
 */
const tagScehma = new mongoose.Schema({
    tagName : {type: String, required: true}
});

/***
 * Tag:
 * create a new tag in the database.
 * 
 * @param tagName
 */
export const tagModel = mongoose.model('Tag', tagScehma);


/***
 * authorSchema:
 * MongoDB Schema to represent an author.
 */
const authorScehma = new mongoose.Schema({
    name : {type: String, required: true},
    articles : [{type:mongoose.Schema.Types.ObjectId, ref: 'Article'}]
});

/***
 * Author:
 * create a new author in the database.
 * 
 * @param name
 * @param articles an array of type Article
 */
export const authorModel = mongoose.model('Author', authorScehma);
import {Mongoose, ObjectId} from 'mongoose';


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

export interface Article {
    title : string,
    _author : ObjectId,
    publishDate : Date,
    link : string,
    tags? : Array<Tag>
}

export interface Summary { 
    user : User,
    comments? : Array<Comment>,
    rating? : number,
    likes : number,
    publishDate : Date,
    article : Article,
    tags? : Array<Tag>
}

export interface Comment {
    user : User,
    comments? : Array<Comment>,
    likes : number
}

export interface Tag {
    tagName : string
}

export interface Author {
    name : string,
    articles? : Array<Article>
}


/***
 * createUserModel:
 * create a new user model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * User schema:
 * 
 * @param firstName
 * @param lastName
 * @param password
 * @param summaries an array of type Summary
 * @param followedAuthors an array of type Author
 * @param followedTags an array of type Tag
 * @param followedUsers an array of type User
 */
export function retrieveUserSchema(mongoose: Mongoose){
    const userSchema = new mongoose.Schema<User>({
        username : { type: String, required: true },
        firstName : { type: String, required: true },
        lastName : { type: String, required: true },
        password : { type: String, required: true },
        summaries : [{type:mongoose.Schema.Types.ObjectId, ref: 'Summary'}],
        followedAuthors : [{type:mongoose.Schema.Types.ObjectId, ref: 'Author'}],
        followedTags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
        followedUsers : [{type:mongoose.Schema.Types.ObjectId, ref: 'User'}]
    });

    return (userSchema);
}

/***
 * createArticleModel:
 * create a new article model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Article schema:
 * 
 * @param title
 * @param author of type Author
 * @param publishDate of type Date
 * @param link
 * @param tags an array of type Tag
 */
export function retrieveArticleSchema(mongoose: Mongoose){
    const articleSchema = new mongoose.Schema<Article>({
        title : {type: String, required: true},
        _author : {type:mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
        publishDate : {type: Date, required: true},
        link : {type: String, required: true},
        tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    });

    return (articleSchema);
}

/***
 * createSummaryModel:
 * create a new summary model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Summary schema:
 * 
 * @param user of type User
 * @param comments an array of type Comment
 * @param rating numerical representation of the summary's worth
 * @param likes
 * @param publishDate of type Date
 * @param article of type Article
 * @param followedUsers an array of type User 
 */
export function retrieveSummarySchema(mongoose: Mongoose){
    const summarySchema = new mongoose.Schema({
        user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        rating : {type: Number, required: true},
        likes : {type: Number, required: true},
        publishDate : {type: Date, required: true},
        article : {type:mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
        tags : [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
    });
    
    return (summarySchema);
}


/***
 * createCommentModel:
 * create a new comment model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Comment schema:
 * 
 * @param user of type User
 * @param followedAuthors an array of type Comment
 * @param likes
 */
 export function retrieveCommentSchema(mongoose: Mongoose){
    const commentSchema = new mongoose.Schema({
        user : {type:mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
        comments : [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        likes : {type: Number, required: true}
    });

    return (commentSchema);
}


/***
 * createTagModel:
 * create a new tag model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Tag schema:
 * 
 * @param tagName
 */
 export function retrieveTagSchema(mongoose: Mongoose){
    const tagSchema = new mongoose.Schema({
        tagName : {type: String, required: true}
    });

    return (tagSchema);
}


/***
 * createAuthorModel:
 * create a new author model in the database.
 * 
 * @param mongoose Mongoose instance
 * 
 * Author schema:
 * 
 * @param name
 * @param articles an array of type Article
 */
 export function retrieveAuthorSchema(mongoose: Mongoose){
    const authorSchema = new mongoose.Schema({
        name : {type: String, required: true},
        articles : [{type:mongoose.Schema.Types.ObjectId, ref: 'Article'}]
    });

    return (authorSchema);
}
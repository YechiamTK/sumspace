import { Mongoose } from 'mongoose';


async function initSchemas(mongoose: Mongoose){     //perhaps this should be in app.ts?
    const userSchema = new mongoose.Schema({
        name: String,
        comments: Array,
        likes: Number
    });
    const User = mongoose.model('User', userSchema)
    const summarySchema = new mongoose.Schema({
        user: String,       //need to be oid
        comments: Array,    //need to be of type Comment
        article: Object,    //need to be of type Article
        rating: Number,
        likes: Number
    });
    const Summary = mongoose.model('Summary', summarySchema)
    const CommentSchema = new mongoose.Schema({
        user: String,       //need to be oid
        comments: Array,    //need to be of type Comment
        likes: Number
    });
    const Comment = mongoose.model('Comment', CommentSchema)
    const ArticleSchema = new mongoose.Schema({
        title: String,
        author: String,
        link: String,
        tags: Array         //need to be of type Tag
    });
    const Article = mongoose.model('Article', ArticleSchema)
    return {user:User, summary:Summary,comment:Comment,article:Article};
}

async function connectToDb(mongoose: Mongoose, db: string) {
    await mongoose.connect(db, ()=>{
        console.log("connection successful!");
    });
    
}

export {connectToDb};
/***
 * db_connections.ts = db file:
 * every db connection function for
 * the mongodb service, using mongoose.
 */

import { Mongoose } from 'mongoose';


/**
 * util function connectToDb:
 * 
 * provides connection to a MongoDB server.
 * @param db database link to connect to
 */
async function connectToDb(db: string) {
    const mongoose = new Mongoose();
    try {
        await mongoose.connect(db, () => {
            console.log("connection successful!");
        });
        mongoose.connection.on('connect', ()=>{
            console.log("actually succesfully connected");
        })
    }
    catch (error){
        console.log(error);
    }
    return mongoose;
}

async function keepAwake(mongoose: Promise<Mongoose>, db: string) {
    (await mongoose).connection.on('error',err=>{
        console.log(err);
    });
    (await mongoose).connection.on('disconnected', err=>{
        console.log(err);
        connectToDb(db);
    });
}

export {connectToDb, keepAwake};
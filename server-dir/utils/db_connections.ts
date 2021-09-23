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
    mongoose.connect(db, () => {
        console.log("connection successful!");
    });

}

export {connectToDb};
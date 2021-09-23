/***
 * db_connections.ts = db file:
 * every db connection function for
 * the mongodb service, using mongoose.
 */

import { Mongoose } from 'mongoose';


async function connectToDb(db: string) {
    const mongoose = new Mongoose();
    mongoose.connect(db, () => {
        console.log("connection successful!");
    });

}

export {connectToDb};
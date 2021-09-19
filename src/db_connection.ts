import { Mongoose } from 'mongoose';


async function connectToDb(db: string) {
    const mongoose = new Mongoose();
    await mongoose.connect(db, ()=>{
        console.log("connection successful!");
    });
    
}

export {connectToDb};
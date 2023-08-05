import mongoose from 'mongoose';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

try {
    mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
    mongoose.Promise = global.Promise;
    // console.log(`Server CL: Mongo DB is connected to: ${mongoose.connection.host}!`);
} catch (error: any) {
    console.error(`Error: ${error.message}`);
}

export const db = {
    User: userModel()
};

// mongoose User model with schema definitions
function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        hash: { type: String, required: true },
        image: {
            data: Buffer,
            contentType: String },
    }, {
        createdAt: { type: Date, required: true},
        updatedAt: { type: Date, required: true},
        timestamps: true
    });
    // set schema to JSON object
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}
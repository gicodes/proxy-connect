import mongoose from 'mongoose';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

try {
    mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
    mongoose.Promise = global.Promise;
    // console.log(`Server CL: Mongo DB is connected to ${mongoose.connection.host}`);
} catch (error: any) {
    // console.log(`Server CL {Mng}: ${error.message}`);
    throw new Error(`Server CL {Mng}: ${error.message}`);
}

export const db = {
    User: userModel()
};

function userModel() {
    const schema = new Schema({
        // data collected on user creation
        username: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        hash: { type: String, required: true },
        // data colected on user update
        dateOfBirth: { type: Date, max: '2005-12-31' },
        address: { type: String }, 
        roll: { type: String },
        bio: { type: String },
    }, {
        createdAt: { type: Date, required: true},
        updatedAt: { type: Date, required: true},
        timestamps: true,
        strict: false,
    });

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
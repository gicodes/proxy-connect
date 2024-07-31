import mongoose from 'mongoose';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

try {
    mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
    mongoose.Promise = global.Promise;
    console.log(`Server-- Mongo DB is connected to ${mongoose.connection.host}`);
} catch (error: any) {
    console.log(`Server Catch Error: ${error.message}`);
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
        // data collected on user update
        address: { type: String },
        avatar: { type: String },
        bio: { type: String },
        phone: { type: String },
        location: { 
            type: {
                type: String,
                enum: ['Point'],
                required: true,
                default: 'Point'
            },
            coordinates: {
                type: [Number], 
                required: true
            }
        },
        dateOfBirth: { type: Date, max: '2005-12-31' },
    }, {
        timestamps: true, // automatically manages createdAt and updatedAt fields
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    schema.index({ location: '2dsphere' });

    return mongoose?.models?.User || mongoose?.model('User', schema);
}
import { db } from '@/lib/utils/mongoose';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { serverRuntimeConfig } = getConfig();
const User = db.User;

export const ridersRepo = {
    create,
    retrieve,
    update,
    delete: _delete,
    getAll,
    getById,
};

// create method for userRepo CRUD
async function create(params: any) {
  // throw error if user username is in use 
  if (await User.findOne({ username: params.username })) {
    alert("Uhmm... user already exists");
    throw new Error('Username: "' + params.username + '" is taken already!');
  }
  const user = new User(params);

  // register email, username and hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }
  await user.save();
}

// retrieve & authenticate method for userRepo CRUD
async function retrieve({ username, password }
  : { username: string | any; password: string | any }) {
  const user = await User.findOne({ username });

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw new Error('Server CL: username or password is incorrect');
  }
  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

  return {
    ...user.toJSON(),
    token,
  };
}

// update method for userRepo CRUD
async function update( 
  email: string | undefined, params: any
  ) {
  // validate user with email as credentials & google sessions both have user.email
  const user = await User.findOne({email} );
  if (!user) throw new Error('User not found');
  
  // if email is being updated, check for exising, otherwise ignore
 /* if (user.email !== params.email 
    && await User.findOne({ email: params.email })) {
      throw new Error('email "' + params.email + '" is already taken');
  } */

  // if password is being updated, compare before hash, otherwise ignore
  if (params.password && params.newPassword) {
    if (params.password === '') return;
    if (bcrypt.compareSync(params.password, user.hash)) {
      throw new Error('Server CL: current password is incorrect');
    }
    params.hash = bcrypt.hashSync(params.newPassword, 10);
  }
  
  // traditonal logic: explicitly parse data before saving
  const { address, age, bio, contact, name } = params

  user.address = address;
  user.age = age; 
  user.bio = bio;
  user.contact = contact;
  user.name = name;

  // console.log(user, params) 
  await user.save();
}

// delete method for userRepo CRUD
async function _delete(id: string) {
  await User.findByIdAndRemove(id);
}

// getAll method for userRepo CRUD
async function getAll() { return await User.find() }

// getById method for userRepo CRUD
async function getById(id: string | any) {
  return await User.findById(id)
} 

import { db } from '@/lib/utils/mongoose';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { serverRuntimeConfig } = getConfig();
const User = db.User;

// exporting ridersRepo CRUD
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
  // throw error if user email is in use 
  if (await User.findOne({ username: params.username })) {
    alert("Uhmm... user already exists");
    throw new Error('Username: "' + params.username + '" is taken already!');
  }

  const user = new User(params);

  // register email and hash password
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
  id: string | undefined, params: any
  ) {
  const user = await User.findById(id);

  // validate user with username and password
  if (!user) throw 'User not found';
  if (user.username !== params.username && await User.findOne({ 
    username: params.username })) {
      throw 'Username "' + params.username + '" is already taken';
  }
  // hash password if it was entered
  if (params.password) {
      params.hash = bcrypt.hashSync(params.password, 10);
  }
  // check for and update user location
  const { longitude, latitude } = params;
  try {
    await User.findByIdAndUpdate(id, { 
      location: {
        type: 'Point',
        coordinates: [ longitude, latitude ],
      }
    })
  } catch (err: any) {
    console.error(`Server CL: ${err.message}`)
  }  

  // copy params properties to user
  Object.assign(user, params);
  await user.save();
}

// delete method for userRepo CRUD
async function _delete(id: string) {
  await User.findByIdAndRemove(id);
}

// getAll method for userRepo CRUD
async function getAll() {
  return await User.find();
}

// getById method for userRepo CRUD
async function getById(id: string | any) {
  return await User.findById(id)
}
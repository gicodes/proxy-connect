import { db } from '@/lib/api/mongodb/mongoose';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { serverRuntimeConfig } = getConfig();
const User = db.User;

export const businessRepo = {
    create,
    retrieve,
    update,
    delete: _delete,
    getAll,
    getById,
    getByEmail,
};

// test: CRUD, Create
async function create(params: any) {
  // throw error if user username is in use 
  if (await User.findOne({ username: params.username })) {
    alert("Username in use!");
    throw new Error('Username: "' + params.username + '" is taken already!');
  }
  // find out what params contain in new update
  const user = new User(params);

  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }

  await user.save();
}

// test: CRUD, Retrieve
async function retrieve(
  { username, password }: 
    { username: string | any; 
      password: string | any 
    }
  ) {
  const user = await User.findOne({ username });

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    alert("Username or Password is incorrect!");
    throw new Error('Username or password is incorrect');
  }

  // create jwt token
  const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

  return {
    ...user.toJSON(),
    token,
  };
}

// test: CRUD, Update
async function update( 
  email: string | undefined, params: any
  ) {
    let foundUser;
    // validate user with email as credentials & google sessions both have user.email
    foundUser = await User.findOne({email} );
    if (!foundUser) throw new Error('User not found');

    // if password is being updated, compare before hash, otherwise ignore
    if (params.password && params.newPassword) {
      if (params.password === '') return;
      if (bcrypt.compareSync(params.password, foundUser.hash)) {
        alert("Password is incorrect!")
        throw new Error('Password is incorrect');
      }
      params.hash = bcrypt.hashSync(params.newPassword, 10);
    }
    
    Object.assign(foundUser, params) 
    const user = new User(foundUser);
    await user.save();
}

// test: CRUD, Delete
async function _delete(id: string) {
  await User.findByIdAndRemove(id);
}

async function getAll() { 
  return await User.find() 
}

async function getById(id: string | any) {
  return await User.findById(id)
} 

async function getByEmail(email: string | any) {
  return await User.findOne({email})
} 

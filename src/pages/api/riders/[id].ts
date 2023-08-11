import { ridersRepo } from './repo';
import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getById(req: NextApiRequest, res: NextApiResponse) {
    const rider = await ridersRepo.getById(req.query.id as string);

    if (!rider) throw 'rider Not Found';

    return res.status(200).json(rider);
}

// define function update as CRUD method @/api/rider/repo and API route
export async function update(req: NextApiRequest, res: NextApiResponse) {
    const rider = await ridersRepo.update(req.query.id as string, req.body);
    return res.status(200).json(rider);
}

export async function _delete(req: NextApiRequest, res: NextApiResponse) {
    await ridersRepo.delete(req.query.id as string);
    return res.status(200).json({});
}


export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
    ) {
      if (req.method === "GET") {
        const session = await getServerSession();
        const rider = ridersRepo.getById(session?.user?.email);
        res.status(200).json(rider);
      }
  
      if (req.method === "PUT") {
        const session = await getServerSession();
        const { latitude, longitude } = req.body;
        await ridersRepo.update(session?.user.name, {longitude, latitude});
      };
  
      // res.status(200).redirect('/');
    }
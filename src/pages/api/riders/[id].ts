import { ridersRepo } from './repo';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getById(req: NextApiRequest, res: NextApiResponse) {
    const rider = await ridersRepo.getById(req.query.id as string);

    if (!rider) throw 'rider Not Found';

    return res.status(200).json(rider);
}

export async function update(req: NextApiRequest, res: NextApiResponse) {
    await ridersRepo.update(req.query.id as string, req.body);
    return res.status(200).json({});
}

export async function _delete(req: NextApiRequest, res: NextApiResponse) {
    await ridersRepo.delete(req.query.id as string);
    return res.status(200).json({});
}
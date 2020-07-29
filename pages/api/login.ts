import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
};

import { createHash, randomBytes } from 'crypto';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });

	try {
		switch (req.method) {
			case 'POST':
				const { name, password, phone } = req.body;

				const salt = randomBytes(69).toString('hex').slice(0, 69);

				const hashedPassword = createHash('sha256')
					.update(password + salt)
					.digest()
					.toString('hex');

				const _id: string = uuid();

				await mongoClient
					.db('db')
					.collection<User>('users')
					.insertOne({ _id, address: null, company: null, friends: [], icon: null, name, password: hashedPassword, phone, secret: salt });
				await mongoClient.db('db').collection<ContactsEntry>('contacts').insertOne({ _id, contacts: [] });
				res.status(200).end();
				break;
			default:
				res.status(405).send('Method Not Allowed');
				break;
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};

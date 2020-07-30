import { createHash } from 'crypto';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });

	try {
		switch (req.method) {
			case 'POST':
				const { name, password } = req.body;

				const users = await mongoClient.db('db').collection<User>('users').find().toArray();

				const foundUser = users.find((user) => {
					const salt = user.secret;
					const hashedPassword = createHash('sha256')
						.update(password + salt)
						.digest()
						.toString('hex');

					return user.name === name && user.password === hashedPassword;
				});

				if (foundUser) {
					res.status(200).send(foundUser._id);
				} else {
					res.status(401).send('Incorrect Details');
				}
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

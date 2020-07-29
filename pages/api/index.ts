import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
	const users = mongoClient.db('db').collection<Contact>('users');

	try {
		switch (req.method) {
			case 'GET':
				if (req.query.contact) {
					res.status(200).json(await users.findOne({ id: req.query.contact as string }, { projection: { _id: 0 } }));
				} else {
					res.status(200).json(await users.find({}, { projection: { _id: 0 } }).toArray());
				}
				break;
			case 'POST':
				if (req.body) {
					await users.insertOne(req.body);
					res.status(200).end();
				}
				break;
			case 'PATCH':
				if (req.body) {
					await users.findOneAndUpdate({ id: req.body.id }, { $set: { ...req.body } });
					res.status(200).end();
				}
				break;
			case 'DELETE':
				if (req.body) {
					// Delete User
					await users.findOneAndDelete({ id: req.body.id });

					// Cleanup
					const usersArr = await users.find().toArray();
					const usersToModify = usersArr.filter((user) => user.friends.includes(req.body.id));
					const ids = usersToModify.map((user) => user.id);
					const newFriends = usersToModify.map((user) => user.friends.filter((id) => id !== req.body.id));

					ids.forEach((id, i) => users.findOneAndUpdate({ id }, { $set: { friends: newFriends[i] } }));

					res.status(200).end();
				}
				break;
			default:
				res.status(405).send('Invalid method');
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	} finally {
		mongoClient.close();
	}
};

import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<Contact | Contact[] | string>): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
	const users = mongoClient.db('db').collection<User>('users');

	try {
		switch (req.method) {
			case 'GET': {
				const _id = req.query.token as string;

				res.status(200).json((await mongoClient.db('db').collection<Contacts>('contacts').findOne({ _id }))!.contacts);
				break;
			}
			case 'POST': {
				const _id = req.body.token as string;

				if (req.body) {
					await mongoClient
						.db('db')
						.collection<Contacts>('contacts')
						.findOneAndUpdate({ _id }, { $push: { contacts: req.body.newContact } });
					res.status(201).end();
				} else {
					res.status(400).send('No body');
				}
				break;
			}
			case 'PATCH':
				const _id = req.body.token as string;
				const newContact = req.body.newContact as Contact;

				if (req.body) {
					const contactsItem = (await mongoClient.db('db').collection<Contacts>('contacts').findOne({ _id }))!;

					contactsItem.contacts = contactsItem.contacts.map((contact) => (contact._id === newContact._id ? { ...contact, ...newContact } : contact));
					await mongoClient.db('db').collection<Contacts>('contacts').findOneAndUpdate({ _id }, contactsItem);
					res.status(200).end();
				} else {
					res.status(400).send('No body');
				}
				break;
			case 'DELETE':
				// TODO: figure out what to do here
				if (req.body) {
					// Delete User
					await users.findOneAndDelete({ _id: req.body.id });

					// Cleanup
					const usersArr = await users.find().toArray();
					const usersToModify = usersArr.filter((user) => user.friends.includes(req.body.id));
					const ids = usersToModify.map((user) => user._id);
					const newFriends = usersToModify.map((user) => user.friends.filter((id) => id !== req.body.id));

					ids.forEach((id, i) => users.findOneAndUpdate({ _id: id }, { $set: { friends: newFriends[i] } }));

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

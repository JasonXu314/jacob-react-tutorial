import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<Contact | Contact[] | string>): Promise<void> => {
	const dbUrl = 'mongodb+srv://admin:admin@todov2.qhboo.mongodb.net/db?retryWrites=true&w=majority';
	const mongoClient = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
	const users = mongoClient.db('db').collection<User>('users');
	const contacts = mongoClient.db('db').collection<ContactsEntry>('contacts');

	try {
		switch (req.method) {
			case 'GET': {
				const _id = req.query.token as string;

				res.status(200).json((await contacts.findOne({ _id }))!.contacts);
				break;
			}
			case 'POST': {
				const _id = req.body.token as string;

				if (req.body) {
					await mongoClient
						.db('db')
						.collection<ContactsEntry>('contacts')
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
					const contactsItem = (await mongoClient.db('db').collection<ContactsEntry>('contacts').findOne({ _id }))!;

					contactsItem.contacts = contactsItem.contacts.map((contact) => (contact._id === newContact._id ? { ...contact, ...newContact } : contact));
					await mongoClient
						.db('db')
						.collection<ContactsEntry>('contacts')
						.findOneAndUpdate({ _id }, { $set: { ...contactsItem } });
					res.status(200).end();
				} else {
					res.status(400).send('No body');
				}
				break;
			case 'DELETE':
				// TODO: figure out what to do here
				if (req.body) {
					// Delete User
					const _id = req.body.token as string;
					const deleteId = req.body._id as string;

					const contactEntry = await contacts.findOne({ _id });
					const newContacts = contactEntry!.contacts.filter((contact) => contact._id === deleteId);

					// Cleanup
					const cleanedContacts = newContacts.map((contact) =>
						contact.friends.includes(deleteId) ? { ...contact, friends: contact.friends.filter((id) => id !== deleteId) } : contact
					);

					await contacts.findOneAndUpdate({ _id }, { $set: { contacts: cleanedContacts } });
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

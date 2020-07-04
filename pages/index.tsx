import { NextPage } from 'next';
import { useState } from 'react';
import ContactItem from '../components/ContactItem/ContactItem';
import DetailedContact from '../components/DetailedContact/DetailedContact';
import styles from '../sass/Index.module.scss';
import NewContact from '../components/NewContact/NewContact';
import EditContact from '../components/EditContact/EditContact';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';

/**
 * Contacts Project:
 * Objectives:
 * 		create new/delete contacts
 * 		edit contacts
 * 		use all the data
 *  	message contacts
 */

const Index: NextPage = () => {
	const [contacts, setContacts] = useState<Contact[]>([
		{
			name: 'manar',
			company: 'Gayjors Ltd.',
			friends: [],
			phone: '314-696-6969',
			address: '50 Gay Ave.',
			icon: 'https://cdn.discordapp.com/attachments/424301514069377024/701285787492155392/IMG_20200418_231846.jpg',
			id: uuidv4()
		},
		{
			name: 'slois',
			company: 'Gay',
			friends: ['gayson', 'gaycob'],
			phone: '314-420-6969',
			address: null,
			icon: null,
			id: uuidv4()
		},
		{
			name: 'gayson',
			company: 'Straight Inc.',
			friends: ['gaycob', 'slois'],
			phone: '696-969-6969',
			address: '8 Fagapple Ct.',
			icon: 'https://media.discordapp.net/attachments/424301514069377024/721193192107671562/unknown.png?width=1204&height=677',
			id: uuidv4()
		},
		{
			name: 'gaycob',
			company: 'Straight Inc.',
			friends: ['gayson', 'slois'],
			phone: '314-555-5555',
			address: 'Something Greaser St.',
			icon: null,
			id: uuidv4()
		}
	]);
	const [shownContact, setShownContact] = useState<string>('');
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	const [editContact, setEditContact] = useState<NewContact | null>(null);

	return (
		<>
			<Head>
				<title>Contacts App</title>
			</Head>
			<div className={styles.main + (showAdd || showEdit ? ' ' + styles.blur : '')}>
				<h1 className={styles.header}>My Contacts</h1>
				<div className={styles.operations}>
					<button className={styles.add} onClick={() => setShowAdd(!showAdd)}>
						Add Contact
					</button>
				</div>
				<div className={styles.previews}>
					<ul className={styles.list}>
						{contacts
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((contact, i) => (
								<ContactItem key={i} contact={contact} setShownContact={setShownContact} />
							))}
					</ul>
				</div>
				<div className={styles.details}>
					{contacts.some((contact) => contact.name === shownContact) && (
						<DetailedContact
							contact={contacts.find((contact) => shownContact === contact.name)!}
							setEditContact={setEditContact}
							setShowEdit={setShowEdit}
						/>
					)}
				</div>
			</div>
			{showAdd && <NewContact setShowAdd={setShowAdd} setContacts={setContacts} />}
			{showEdit && <EditContact setShowEdit={setShowEdit} setContacts={setContacts} editContact={editContact!} />}
			{(showAdd || showEdit) && (
				<div
					className={styles.overlay}
					onClick={() => {
						setShowAdd(false);
						setShowEdit(false);
					}}
				/>
			)}
		</>
	);
};

export default Index;

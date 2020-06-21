import { NextPage } from 'next';
import { useState } from 'react';
import ContactItem from '../components/ContactItem/ContactItem';
import styles from '../sass/Index.module.scss';

/**
 * Contacts Project:
 * Objectives:
 * 		list contacts
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
			icon: 'https://cdn.discordapp.com/attachments/424301514069377024/701285787492155392/IMG_20200418_231846.jpg'
		},
		{
			name: 'slois',
			company: 'Gay',
			friends: ['manar'],
			phone: '314-420-6969'
		},
		{
			name: 'gayson',
			company: 'Straight Inc.',
			friends: ['gaycob', 'slois'],
			phone: '696-969-6969',
			address: '8 Fagapple Ct.',
			icon: 'https://media.discordapp.net/attachments/424301514069377024/721193192107671562/unknown.png?width=1204&height=677'
		},
		{
			name: 'gaycob',
			company: 'Straight Inc.',
			friends: ['gayson', 'slois'],
			phone: '314-555-5555',
			address: 'Something Greaser St.'
		}
	]);

	return (
		<div className={styles.main}>
			<h1 className={styles.header}>My Contacts</h1>
			<ul className={styles.previews}>
				{contacts.map((contact, i) => (
					<ContactItem key={i} contact={contact} />
				))}
			</ul>
			<div className={styles.details}></div>
		</div>
	);
};

export default Index;

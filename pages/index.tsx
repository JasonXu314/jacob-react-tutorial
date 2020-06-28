import { NextPage } from 'next';
import { useState } from 'react';
import ContactItem from '../components/ContactItem/ContactItem';
import DetailedContact from '../components/DetailedContact/DetailedContact';
import styles from '../sass/Index.module.scss';

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
			icon: 'https://cdn.discordapp.com/attachments/424301514069377024/701285787492155392/IMG_20200418_231846.jpg'
		},
		{
			name: 'slois',
			company: 'Gay',
			friends: ['gayson', 'gaycob'],
			phone: '314-420-6969',
			address: null,
			icon: null
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
			address: 'Something Greaser St.',
			icon: null
		}
	]);
	const [shownContact, setShownContact] = useState<string>('');
	const [shownAdd, setShownAdd] = useState<boolean>(false);
	const [err, setErr] = useState<string>('');
	const [newContact, setNewContact] = useState<NewContact>({
		name: '',
		address: '',
		company: '',
		phone: ''
	});

	return (
		<>
			<div className={styles.main + (shownAdd ? ' ' + styles.blur : '')}>
				<h1 className={styles.header}>My Contacts</h1>
				<div className={styles.operations}>
					<button className={styles.add} onClick={() => setShownAdd(!shownAdd)}>
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
						<DetailedContact contact={contacts.find((contact) => shownContact === contact.name)!} />
					)}
				</div>
			</div>
			{shownAdd && (
				<div className={styles.menu}>
					<button className={styles.close} onClick={() => setShownAdd(false)}>
						X
					</button>
					<div className={styles.row}>
						<label className={styles.label}>Name: </label>
						<input
							className={styles.input}
							value={newContact.name}
							onChange={(evt) => {
								const name = evt.target.value;
								setNewContact((prevContact) => ({
									...prevContact,
									name
								}));
							}}
						/>
					</div>
					<div className={styles.row}>
						<label className={styles.label}>Phone: </label>
						<input
							className={styles.input}
							value={newContact.phone}
							onChange={(evt) => {
								const phone = evt.target.value;
								setNewContact((prevContact) => ({
									...prevContact,
									phone
								}));
							}}
						/>
					</div>
					<div className={styles.row}>
						<label className={styles.label}>Address: </label>
						<input
							className={styles.input}
							value={newContact.address}
							onChange={(evt) => {
								const address = evt.target.value;
								setNewContact((prevContact) => ({
									...prevContact,
									address
								}));
							}}
						/>
					</div>
					<div className={styles.row}>
						<label className={styles.label}>Company: </label>
						<input
							className={styles.input}
							value={newContact.company}
							onChange={(evt) => {
								const company = evt.target.value;
								setNewContact((prevContact) => ({
									...prevContact,
									company
								}));
							}}
						/>
					</div>
					{err !== '' && <div className={styles.err}>{err}</div>}
					<button
						className={styles.submit}
						onClick={() => {
							if (newContact.name === '') {
								setErr('Name cannot be empty!');
							} else if (newContact.phone === '' || !/$(\d-)?\d{3}-\d{3}-\d{4}^/.test(newContact.phone)) {
								setErr('Phone must be a valid phone number (###-###-####)');
							} else {
								setContacts([
									...contacts,
									{
										friends: [],
										name: newContact.name,
										phone: newContact.phone,
										address: newContact.address === '' ? null : newContact.address,
										company: newContact.company === '' ? null : newContact.company,
										icon: null
									}
								]);
								setShownAdd(false);
								setNewContact({
									address: '',
									company: '',
									name: '',
									phone: ''
								});
								setErr('');
							}
						}}
					>
						Submit
					</button>
				</div>
			)}
			{shownAdd && <div className={styles.overlay} onClick={() => setShownAdd(!shownAdd)} />}
		</>
	);
};

export default Index;

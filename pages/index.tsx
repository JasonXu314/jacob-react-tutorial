import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import ContactItem from '../components/ContactItem/ContactItem';
import DetailedContact from '../components/DetailedContact/DetailedContact';
import styles from '../sass/Index.module.scss';
import NewContact from '../components/NewContact/NewContact';
import EditContact from '../components/EditContact/EditContact';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Index: NextPage = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [shownContact, setShownContact] = useState<string>('');
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	const [editContact, setEditContact] = useState<Contact | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	useEffect(() => {
		axios.get('/api').then((res) => {
			setContacts(res.data);
		});
	}, []);

	if (token) {
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
								setContacts={setContacts}
								contacts={contacts}
								contact={contacts.find((contact) => shownContact === contact.name)!}
								setEditContact={setEditContact}
								setShowEdit={setShowEdit}
							/>
						)}
					</div>
				</div>
				{showAdd && <NewContact setShowAdd={setShowAdd} setContacts={setContacts} contacts={contacts} />}
				{showEdit && <EditContact setShowEdit={setShowEdit} setContacts={setContacts} contacts={contacts} editContact={editContact!} />}
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
	} else {
		return (
			<>
				<Head>
					<title>Contacts App | Login</title>
				</Head>
				<div className={styles.main}>
					<form
						className={styles.login}
						onSubmit={(evt) => {
							evt.preventDefault();
						}}
					>
						<h4>Username</h4>
						<input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)} />
						<h4>Password</h4>
						<input type="text" value={password} onChange={(evt) => setPassword(evt.target.value)} />
						<button type="submit">Log In</button>
					</form>
				</div>
			</>
		);
	}
};

export default Index;

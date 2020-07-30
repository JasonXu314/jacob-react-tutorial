import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ContactItem from '../components/ContactItem/ContactItem';
import DetailedContact from '../components/DetailedContact/DetailedContact';
import EditContact from '../components/EditContact/EditContact';
import NewContact from '../components/NewContact/NewContact';
import styles from '../sass/Index.module.scss';

const Index: NextPage = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [shownContact, setShownContact] = useState<string>('');
	const [showAdd, setShowAdd] = useState<boolean>(false);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	const [editContact, setEditContact] = useState<Contact | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [err, setErr] = useState<string | null>(null);

	useEffect(() => {
		if (token) {
			axios.get(`/api?token=${token}`).then((res) => {
				setContacts(res.data);
			});
		}
	}, [token]);

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
							{contacts.length === 0 && <li>You have no contacts!</li>}
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
				{showAdd && <NewContact setShowAdd={setShowAdd} setContacts={setContacts} contacts={contacts} token={token} />}
				{showEdit && <EditContact setShowEdit={setShowEdit} setContacts={setContacts} contacts={contacts} editContact={editContact!} token={token} />}
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

							axios
								.post<string>('/api/login', { name, password })
								.then((res) => {
									setToken(res.data);
								})
								.catch((err: AxiosError<string>) => {
									setErr(err.response?.data || 'Unknown Error Occured');
								});
						}}>
						<h4>Name</h4>
						<input type="text" value={name} onChange={(evt) => setName(evt.target.value)} autoFocus />
						<h4>Password</h4>
						<input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
						<div>
							<button type="submit">Log In</button>
						</div>
						<div>
							<Link href="/signup">
								<a>No Account? Sign up!</a>
							</Link>
						</div>
						{err && <p className={styles.err}>{err}</p>}
					</form>
				</div>
			</>
		);
	}
};

export default Index;

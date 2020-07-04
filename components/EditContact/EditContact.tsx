import styles from './EditContact.module.scss';
import { useState } from 'react';

interface Props {
	setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
	editContact: NewContact;
}

const EditContact: React.FC<Props> = ({ setShowEdit, setContacts, editContact }) => {
	const [newContact, setNewContact] = useState<NewContact>(editContact);
	const [err, setErr] = useState<string>('');

	return (
		<div className={styles.main}>
			<button className={styles.close} onClick={() => setShowEdit(false)}>
				X
			</button>
			<h1>Edit {newContact.name}</h1>
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
					} else if (newContact.phone === '' || !/^(\d-)?\d{3}-\d{3}-\d{4}$/.test(newContact.phone)) {
						setErr('Phone must be a valid phone number (###-###-####)');
					} else {
						setContacts((contacts) => contacts.filter((contact) => contact.id !== newContact.id).concat({ ...newContact, friends: [], icon: '' }));
						setShowEdit(false);
					}
				}}
			>
				Apply
			</button>
		</div>
	);
};

export default EditContact;

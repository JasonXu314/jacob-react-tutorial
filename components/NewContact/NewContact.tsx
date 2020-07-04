import { useState } from 'react';
import styles from './NewContact.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface Props {
	setShowAdd: React.Dispatch<React.SetStateAction<boolean>>;
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const NewContact: React.FC<Props> = ({ setShowAdd, setContacts }) => {
	const [err, setErr] = useState<string>('');
	const [newContact, setNewContact] = useState<NewContact>({
		name: '',
		address: '',
		company: '',
		phone: '',
		id: uuidv4()
	});

	return (
		<div className={styles.main}>
			<button className={styles.close} onClick={() => setShowAdd(false)}>
				X
			</button>
			<h1>Create a Contact</h1>
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
						setContacts((contacts) => [
							...contacts,
							{
								friends: [],
								name: newContact.name,
								phone: newContact.phone,
								address: newContact.address === '' ? null : newContact.address,
								company: newContact.company === '' ? null : newContact.company,
								icon: null,
								id: newContact.id
							}
						]);
						setShowAdd(false);
						setErr('');
					}
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default NewContact;

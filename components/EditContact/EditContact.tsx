import styles from './EditContact.module.scss';
import { useState } from 'react';
import Chevron from '../Chevron/Chevron';
import axios from 'axios';

interface Props {
	setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
	editContact: Contact;
	contacts: Contact[];
}

const EditContact: React.FC<Props> = ({ setShowEdit, setContacts, editContact, contacts }) => {
	const [newContact, setNewContact] = useState<Contact>(editContact);
	const [err, setErr] = useState<string>('');
	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	return (
		<div className={styles.main}>
			<button className={styles.close} onClick={() => setShowEdit(false)}>
				X
			</button>
			<h1>Edit {newContact.name}</h1>
			<div className={styles.icon}>
				<input
					type="file"
					className={styles.file}
					id="file-input"
					onChange={(evt) => {
						if (evt.target.files!.length > 0) {
							const fileType = evt.target.files![0].type;

							if (fileType === 'image/jpeg' || fileType === 'image/png') {
								const reader = new FileReader();

								reader.onload = () => {
									setNewContact({ ...newContact, icon: reader.result!.toString() });
								};

								reader.readAsDataURL(evt.target.files![0]);
							}
						}
					}}
				/>
				<label htmlFor="file-input" className={styles.label}>
					{newContact.icon ? <img className={styles.image} src={newContact.icon} alt="Icon't" /> : 'Upload Icon'}
				</label>
			</div>
			<div className={styles.fields}>
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
						value={newContact.address || ''}
						onChange={(evt) => {
							const address = evt.target.value === '' ? null : evt.target.value;
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
						value={newContact.company || ''}
						onChange={(evt) => {
							const company = evt.target.value === '' ? null : evt.target.value;
							setNewContact((prevContact) => ({
								...prevContact,
								company
							}));
						}}
					/>
				</div>
				<div className={styles.row}>
					<label className={styles.label}>Friends: </label>
					<div className={styles.friends}>
						<span className={styles.existing}>
							{newContact.friends.map((friend) => (
								<div
									className={styles.friend}
									onClick={() => {
										const newFriends = newContact.friends.filter((f) => f !== friend);
										setNewContact({ ...newContact, friends: newFriends });
									}}
									key={friend}
								>
									{
										contacts.find((contact) => {
											return contact.id === friend;
										})!.name
									}
								</div>
							))}
							<Chevron size={12} up={dropdownOpen} onClick={() => setDropdownOpen(!dropdownOpen)} />
						</span>
						{dropdownOpen && (
							<div className={styles.dropdown}>
								{contacts.map(
									(contact) =>
										!newContact.friends.includes(contact.id) &&
										newContact.id !== contact.id && (
											<div
												className={styles.item}
												key={contact.id}
												onClick={() => {
													const friend = contact.id;
													setNewContact({
														...newContact,
														friends: [...newContact.friends, friend]
													});
												}}
											>
												{contact.name}
											</div>
										)
								)}
							</div>
						)}
					</div>
				</div>
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
						setContacts((contacts) => contacts.filter((contact) => contact.id !== newContact.id).concat({ ...newContact }));
						axios.patch('/api', newContact);
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

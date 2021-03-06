import axios from 'axios';
import styles from './DetailedContact.module.scss';

interface Props {
	contact: Contact;
	setEditContact: React.Dispatch<React.SetStateAction<Contact | null>>;
	setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
	contacts: Contact[];
	setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
	token: string;
}

const DetailedContact: React.FC<Props> = ({ contacts, contact, setEditContact, setShowEdit, setContacts, token }) => {
	return (
		<div className={styles.main}>
			{contact.icon ? <img src={contact.icon} alt="no photo" className={styles.icon} /> : <div className={styles.icon}>No Icon</div>}
			<div className={styles.head}>
				<h1 className={styles.name}>{contact.name}</h1>
				<button
					className={styles.edit}
					onClick={() => {
						setEditContact(contact);
						setShowEdit(true);
					}}
				>
					Edit
				</button>
				<button
					className={styles.delete}
					onClick={() => {
						axios.delete('/api', { data: { token, _id: contact._id } });
						const newContacts = contacts.filter((ct) => contact._id !== ct._id);
						contacts.forEach((cont) => {
							if (cont.friends.includes(contact._id)) {
								cont.friends = cont.friends.filter((friend) => {
									return friend !== contact._id;
								});
							}
						});
						setContacts(newContacts);
					}}
				>
					Delete
				</button>
			</div>
			<ul className={styles.attributes}>
				<li className={styles.attribute}>Phone: {contact.phone}</li>
				<li className={styles.attribute}>Company: {contact.company || 'Unknown'}</li>
				<li className={styles.attribute}>Address: {contact.address || 'Unknown'}</li>
				<li className={styles.attribute}>
					Friends: {contact.friends.map((uuid) => contacts.find((otherContact) => uuid === otherContact._id)!.name).join(', ')}
				</li>
			</ul>
		</div>
	);
};
export default DetailedContact;

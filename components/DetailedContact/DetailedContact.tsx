import styles from './DetailedContact.module.scss';

interface Props {
	contact: Contact;
	setEditContact: React.Dispatch<React.SetStateAction<Contact | null>>;
	setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailedContact: React.FC<Props> = ({ contact, setEditContact, setShowEdit }) => {
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
			</div>
			<ul className={styles.attributes}>
				<li className={styles.attribute}>Phone: {contact.phone}</li>
				<li className={styles.attribute}>Company: {contact.company || 'Unknown'}</li>
				<li className={styles.attribute}>Address: {contact.address || 'Unknown'}</li>
				<li className={styles.attribute}>Friends: {contact.friends.join(', ')}</li>
			</ul>
		</div>
	);
};
export default DetailedContact;

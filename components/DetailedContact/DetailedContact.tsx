import styles from './DetailedContact.module.scss';

interface Props {
	contact: Contact;
}

const DetailedContact: React.FC<Props> = ({ contact }) => {
	return (
		<div className={styles.main}>
			{contact.icon ? <img src={contact.icon} alt="photo" className={styles.icon} /> : <div className={styles.icon}>No Icon</div>}
			<h1 className={styles.name}>{contact.name}</h1>
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

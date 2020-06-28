import styles from './ContactItem.module.scss';

interface Props {
	contact: Contact;
	setShownContact: React.Dispatch<React.SetStateAction<string>>;
}

const ContactItem: React.FC<Props> = ({ contact, setShownContact }) => {
	return (
		<li className={styles.main} onClick={() => setShownContact((shownContact) => (shownContact === contact.name ? '' : contact.name))}>
			<p className={styles.name}>{contact.name}</p>
		</li>
	);
};

export default ContactItem;

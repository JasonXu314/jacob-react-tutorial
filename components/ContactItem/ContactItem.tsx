import { useState } from 'react';
import DetailedContact from '../DetailedContact/DetailedContact';
import styles from './ContactItem.module.scss';

interface Props {
	contact: Contact;
}

const ContactItem: React.FC<Props> = ({ contact }) => {
	const [details, setDetails] = useState<boolean>(false);
	return (
		<li onClick={() => setDetails(!details)} className={styles.main}>
			<p className={styles.name}>{contact.name}</p>
			{details && <DetailedContact contact={contact} />}
		</li>
	);
};

export default ContactItem;

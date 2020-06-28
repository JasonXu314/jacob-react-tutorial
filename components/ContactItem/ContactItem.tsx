import { useState } from 'react';
import Chevron from '../Chevron/Chevron';
import DetailedContact from '../DetailedContact/DetailedContact';
import styles from './ContactItem.module.scss';

interface Props {
	contact: Contact;
}

const ContactItem: React.FC<Props> = ({ contact }) => {
	const [details, setDetails] = useState<boolean>(false);
	return (
		<li className={styles.main}>
			<div className={styles.row}>
				<p className={styles.name}>{contact.name}</p>
				<Chevron onClick={() => setDetails(!details)} up={details} />
			</div>
			{details && <DetailedContact contact={contact} />}
		</li>
	);
};

export default ContactItem;

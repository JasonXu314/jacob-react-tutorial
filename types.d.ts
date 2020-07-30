interface Contacts {
	_id: string;
	contacts: Contact[];
}

interface Contact {
	_id: string;
	name: string;
	company: string | null;
	phone: string;
	address: string | null;
	friends: string[];
	icon: string | null;
}

interface User {
	_id: string;
	name: string;
	company: string | null;
	phone: string;
	address: string | null;
	friends: string[];
	icon: string | null;
	secret: string;
	password: string;
}

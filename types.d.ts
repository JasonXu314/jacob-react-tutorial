interface Contact {
	name: string;
	company: string | null;
	phone: string;
	address: string | null;
	friends: string[];
	icon: string | null;
}

interface NewContact {
	name: string;
	company: string;
	phone: string;
	address: string;
}

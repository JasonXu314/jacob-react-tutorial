import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../sass/Signup.module.scss';

const Signup: NextPage = () => {
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [err, setErr] = useState<string | null>(null);
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Contacts App | Signup</title>
			</Head>
			<div className={styles.main}>
				<form
					className={styles.signup}
					onSubmit={(evt) => {
						evt.preventDefault();

						axios
							.post('/api/signup', { name, password, phone })
							.then(() => {
								router.push('/');
							})
							.catch((err: AxiosError<string>) => {
								setErr(err.response?.data || 'Unknown Error Occurred');
							});
					}}>
					<h4>Name</h4>
					<input type="text" value={name} onChange={(evt) => setName(evt.target.value)} autoFocus />
					<h4>Password</h4>
					<input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
					<h4>Phone</h4>
					<input
						type="text"
						value={phone}
						onChange={(evt) => {
							if (err) {
								setErr(null);
							}
							setPhone(evt.target.value);
						}}
						onBlur={() => {
							if (phone === '') {
								setErr('Phone is required');
							} else if (!/^(\d-)?\d{3}-\d{3}-\d{4}$/.test(phone)) {
								setErr('Phone must be a valid phone number (###-###-####)');
							}
						}}
					/>
					<div>
						<button type="submit" disabled={err !== null}>
							Sign Up
						</button>
					</div>
					{err && <p className={styles.err}>{err}</p>}
				</form>
			</div>
		</>
	);
};

export default Signup;

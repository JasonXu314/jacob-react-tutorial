import styles from './Chevron.module.scss';

interface Props {
	up: boolean;
	onClick?: (evt: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const Chevron: React.FC<Props> = ({ up, onClick }) => {
	return up ? (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			onClick={onClick}
			className={styles.main}>
			<polyline points="18 15 12 9 6 15"></polyline>
		</svg>
	) : (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			onClick={onClick}
			className={styles.main}>
			<polyline points="6 9 12 15 18 9"></polyline>
		</svg>
	);
};

export default Chevron;

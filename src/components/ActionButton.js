import Button from "@mui/material/Button";


const ActionButton = ({label, ...props}) => {
	return (
		<Button {...props}
		>
			{label}
		</Button>

	);
};
export default ActionButton;
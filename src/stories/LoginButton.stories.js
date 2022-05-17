
import LoginButton from "../components/LoginButton";


export default {

	title: 'LoginButton',
	component: <LoginButton/>,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <LoginButton {...args} />;

export const FirstStory = {
	args: {
		//👇 The args you need here will depend on your component
	},
};
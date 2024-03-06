import mbs from "../assets/MBSLogo.png";
import "../styles/style.css";


const Logo = ({className}) => {
	className= className || "navBarLogo";
	return <img src={mbs} className={className}  alt="logo"/>;
};
export default Logo;

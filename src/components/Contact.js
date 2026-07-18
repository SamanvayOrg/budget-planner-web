import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import "../styles/style.css";

const Contact = () => {
  return (
    <Typography id="navRightBarMenu" className="navTypography">
      <NavLink to="/contact" className="navLink p-6">
        Contact
      </NavLink>
    </Typography>
  );
};

export default Contact;

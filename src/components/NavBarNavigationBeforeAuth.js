import Contact from "./Contact";
import HelpAndSupport from "./HelpAndSupport";
import LangSelector from "./LangSelector";


const NavBarNavigationBeforeAuth = () => {
	return (
		<div id="navBarRightNavigation">
			<LangSelector />
			<Contact/>
			<HelpAndSupport/>
		</div>
	)
}
export default NavBarNavigationBeforeAuth;
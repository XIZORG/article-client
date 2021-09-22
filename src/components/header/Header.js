import {NavLink} from "react-router-dom";
import styles from './style-header.module.css'

const Header = (props) => {
    return (
        <div class={styles.menu}>
        	<ul>                                                                         
                <li><NavLink to={"/articles"} className="el_link">Articles</NavLink></li>
                <li><NavLink to={"/"} className="el_link">Main</NavLink></li>
        	</ul>
        </div>
    );
}

export default Header;
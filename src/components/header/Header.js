import {NavLink} from "react-router-dom";
import styles from './style-header.module.css'

const Header = (props) => {
    return (
        <div className={styles.menu}>
        	<ul>      
                <li><NavLink to={"/"} className={styles.list}>Main</NavLink></li>                                                                   
                <li><NavLink to={"/articles"} className={styles.list}>Articles</NavLink></li>
                <li><NavLink to={"/authors"} className={styles.list}>Authors</NavLink></li>
        	</ul>
        </div>
    );
}

export default Header;
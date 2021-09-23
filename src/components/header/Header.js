import {NavLink} from "react-router-dom";
import styles from './style-header.module.css'

const Header = (props) => {
    return (
        <div class={styles.menu}>
        	<ul>      
                <li><NavLink to={"/"} class={styles.list}>Main</NavLink></li>                                                                   
                <li><NavLink to={"/articles"} class={styles.list}>Articles</NavLink></li>
                <li><NavLink to={"/authors"} class={styles.list}>Authors</NavLink></li>
        	</ul>
        </div>
    );
}

export default Header;
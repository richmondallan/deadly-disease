import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'
import './header.css';
import ActionButton from '../ActionButton/ActionButton';

function Header() {
    return (
        <header>
            <div className="header-box">
                <Link to="/">
                    <div className='logo'>
                        <h1>
                            <FontAwesomeIcon icon={faHome} />
                            <span style={{ marginLeft: '10px' }}>Diseases</span>
                        </h1>
                    </div>
                </Link>
                <ActionButton text="Add Disease" path="/create" />
            </div>
        </header>
    )
}

export default Header;
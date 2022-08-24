import './card.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid'
import { useNavigate } from 'react-router-dom';

function Card({ title, onBack, children }) {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='box-card'>

            <div className='card-back-button' onClick={goBack}>
                <FontAwesomeIcon icon={faTimesCircle} size="xl" />
            </div>

            <div className="header-box">
                <h2>{title}</h2>
            </div>

            <div className="card-line"></div>

            <div className="content-box">{children}</div>

        </div >
    )
}

export default Card;
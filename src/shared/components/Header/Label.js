import { Link } from 'react-router-dom';
import './header.css';


function Label({hint}) {
    return (
            <div className="label-box">
             <span>{hint}</span>
            </div>
    )
}

export default Label;
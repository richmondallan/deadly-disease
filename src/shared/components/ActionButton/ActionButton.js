import { Link } from 'react-router-dom';
import './action-button.css';


function ActionButton({ text, search, state, path, size, type, style }) {

    function getSizeClass(size) {
        if (size == 'sm') return 'small';

        if (size == 'xl') return 'large';

        return 'normal';
    }

    function getTypeClass(type) {
        if (type == 'warn') return 'warn';

        if (type == 'danger') return 'danger';

        if (type == 'success') return 'success';

        return 'default';
    }

    return (
        <div className={`btn ${getSizeClass(size)} ${getTypeClass(type)}`}>
            {
                path
                    ? <Link to={{ pathname: path, search }} state={state}><button style={style}>{text}</button></Link>
                    : <button style={style} type='submit'>{text}</button>
            }
        </div>
    )
}

export default ActionButton;
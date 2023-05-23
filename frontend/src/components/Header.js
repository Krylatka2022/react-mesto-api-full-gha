import logo from '../images/VectorLogo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className='header__authorization'>
                <div className="header__menu">
                    <button className="header__burger" onClick={props.onClick}>
                        <span className="header__burger-line"></span>
                        <span className="header__burger-line"></span>
                        <span className="header__burger-line"></span>
                    </button>
                    <div className="header__menu-items">
                        <p className='header__text'>{props.email}</p>
                        <Link to={props.route} className='header__link' onClick={props.onClick}>{props.title}</Link>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;
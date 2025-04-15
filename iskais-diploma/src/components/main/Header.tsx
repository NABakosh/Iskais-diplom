import logo from './logo.png'

import "./scss/header.scss"
const Header = () => {
    return(
        <div className='header'>
        <nav>
            <div>
            <img src={logo} alt='logo' />
            <p>
            Almaty Technological-<br/>Finance and Innovation-<br/>Technical College
            </p>
            </div>
            <input placeholder='Поиск книги...' />
            <button>Войти</button>
        </nav>
    </div>
)
}
export default Header
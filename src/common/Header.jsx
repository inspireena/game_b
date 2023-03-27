import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

function Header(props) {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const handleHome = () => {
        props.setMenu('home')
    }
    const handleSetting = () => {
        props.setMenu('setting')
    }
    const handleLogout = () => {
        localStorage.removeItem('loggedin')
        localStorage.removeItem('streamer_details')
        navigate('/')
    }
    return (
        <div className="nav_bar">

            <a href="#" className="navbar-logo">
                Baricata
            </a>
            <div className="nav-item">
                <a className="nav-link active" onClick={handleHome} style={{ cursor: 'pointer' }}>
                    <i className="fa-solid fa-house" /> {t("Home")}
                </a>
                <a className="nav-link" onClick={handleSetting} style={{ cursor: 'pointer' }} >
                    <i className="fa-solid fa-gear" /> {t("Setting")}
                </a>
                <a className="nav-link" href="#" onClick={handleLogout}>
                    {/* <i className="fa-solid fa-gear" />  */}
                    {t("logout")}
                </a>
            </div>
        </div>

    )
}
export default Header 
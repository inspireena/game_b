import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import LanguageSelect from "../../languageSelect"
import { getApi } from "../../utils/ApiInstanse"
import TimerModal from "./TimerModal"

function StreamerIndex(props) {
    const navigate = useNavigate()
    const [isTimer, setIsTimer] = useState(false)
    const [timer, setTimer] = useState('3')
    const [livePlayerInfo, setLivePlayerInfo] = useState()
    // const [bigWin, setBigWin] = useState()
    const [roomInfoPoints, setRoomInfoPoints] = useState()
    const [isLiveStart, setIsLiveStart] = useState(false)
    const Ref = useRef()
    const { t } = useTranslation();
    const { token } = JSON.parse(localStorage.getItem('loggedin'));
    let authToken = token;
    const { streamer_name,
        phone,
        email,
        status,
        displayname,
        dateofbirth,
        description,
        followers,
        image,
        points,
        ranking,
        video_streaming_url } = JSON.parse(localStorage.getItem('streamer_details'))
    let bigWin = [{ name: 'a', points: '3000' }, { name: 'b', points: '2000' },]


    // , { 'Authorization': authToken }
    useEffect(() => {
        getApi('/game-streamer-info')
            .then((response) => {
                console.log('streamer======', response.data.data);

                if (response && response.data && response.data.data && response.data.data.LivePlayerData) {
                    setLivePlayerInfo(response.data.data.LivePlayerData)
                }
                if (response && response.data && response.data.data && response.data.data.roomInfoData && response.data.data.roomInfoData.length >= 0) {
                    setRoomInfoPoints(response.data.data.roomInfoData)
                }
                if (response && response.data && response.data.data && response.data.data.roomInfo && response.data.data.roomInfo.length >= 0 && response.data.data.roomInfo[0] && response.data.data.roomInfo[0].points && response.data.data.roomInfo[0].points.length >= 0) {
                    // setRoomInfoPoints(response.data.data.roomInfo[0].points)
                }

            })
            .catch((err) => { console.log(err) })
    }, [])
    const handleLogout = () => {
        localStorage.removeItem('loggedin')
        localStorage.removeItem('streamer_details')
        navigate('/')
    }
    const handleLive = () => {
        setIsTimer(true)
        if (Ref.current) {
            clearInterval(Ref.current)
        }
        const id = setInterval(() => { setTimer(pre => pre - 1) }, 1000)
        Ref.current = id;
    }
    // if (timer === 0) {
    //     clearInterval(Ref.current)
    //     setTimer(2)
    //     setIsTimer(false)
    //     alert('TimeOut')
    //     setIsLiveStart(true)
    // }

    const handleStopLive = () => {
        setIsLiveStart(false)
    }
    const handleHome = () => {
        props.setMenu('home')
    }
    const handleSetting = () => {
        props.setMenu('setting')
    }
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{t("Live preparation")}</title>
            {/* language select */}
            {/* <div style={{
                position: 'fixed',
                right: '0rem',
            }}>
                <LanguageSelect />
            </div> */}
           {isTimer && <TimerModal setIsLiveStart={setIsLiveStart} isTimer={isTimer} setIsTimer={setIsTimer} timer={timer} setTimer={setTimer} Ref={Ref} />}
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
            <div className="full_page" style={{ position: 'relative'}}>
                <div className="top-section">
                    <div className="das-title">
                        <h1>{t("Live preparation")}</h1>
                    </div>
                    {!isLiveStart &&
                        <div className="button" >
                            <button onClick={handleLive}>{t("Start Live")}</button>
                        </div>}
                    {isLiveStart &&
                        <div className="button stop-btn " style={{ marginRight: '11rem' }} >
                            <button onClick={handleStopLive}>{t("Live Stop")}</button>
                            <div className="stream">
                                <img src="assets/img/dot.png" alt="" />
                                <h5>{t("Streaming Now")}</h5>
                            </div>
                        </div>
                    }
                </div>
                <div className="container-fluid px-lg-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Current Player List")}</h5>
                                </div>
                                <div className="content">
                                    <div className="header">
                                        <ul>
                                            <li>{t("Rank")}</li>
                                            <li>{t("Name")}</li>
                                            <li>{t("Operate")}</li>
                                            <li>{t("Point")}</li>
                                        </ul>
                                    </div>
                                    {livePlayerInfo && livePlayerInfo.map((value, index) => {
                                        return (
                                            <div className="card-text">
                                                <ul>
                                                    <li>
                                                        <strong>{index + 1}</strong>
                                                    </li>
                                                    <li>
                                                        <img src="assets/img/Ellipse 2.png" alt="" />
                                                        {value.player_name
                                                        }
                                                    </li>
                                                    <li>{value.operator_name
                                                    }</li>
                                                    <li>{value.total_points}</li>
                                                </ul>
                                            </div>
                                        )
                                    })}
                                    <div className="card-text">
                                        <ul>
                                            <li>
                                                <strong>1</strong>
                                            </li>
                                            <li>
                                                <img src="assets/img/Ellipse 2.png" alt="" />
                                                ともひろ
                                            </li>
                                            <li>220,000pt</li>
                                            <li>220,000pt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Today this room Information")}</h5>
                                </div>
                                <div className="content" style={{ padding: "20px 25px" }}>
                                    <div className="row pt-4">
                                        <div className="col-lg-6">
                                            <h5>{t("Big Win")}</h5>
                                            {bigWin && bigWin.map((value, index) => {
                                                return (
                                                    <div key={index}>
                                                        <ul className="num">
                                                            <li>{value.name}</li>
                                                            <li>{value.points}</li>
                                                        </ul>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="col-lg-6">
                                            <h5>{t("Points")}</h5>

                                            {roomInfoPoints && roomInfoPoints.map((value, index) => {
                                                return (
                                                    <>
                                                        <ul className="num">
                                                            <li>{value.player_name}</li>
                                                            <li>{value.total_points}</li>
                                                        </ul>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-card" style={{ height: 238 }}>
                                <div className="card-title">
                                    <h5>{t("My Information")}</h5>
                                </div>
                                <div className="content info_box">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5>{t("Rank")}</h5>
                                            <ul>
                                                <li>{t("Today")}</li>
                                                <li>{ranking}</li>
                                                <li>{points}</li>
                                            </ul>
                                            <ul>
                                                <li>Week</li>
                                                <li>1st</li>
                                                <li>70,000pt</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <h5>{t("Follower")}</h5>
                                            <ul>
                                                <li>{followers}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content-card Vide_section">
                                <div className="card-title">
                                    <h5>{t("Live")}</h5>
                                    {/* <video src="assets/live_video/live_video.mp4" style="height: 812px; width: 375px;"></video> */}
                                    <img src="assets/img/bg_img.jpg" alt="" className="img-fluid" />
                                    <a className="button-popup" href="#popup1">
                                        <i className="fa-solid fa-gift" />
                                    </a>
                                    <div id="popup1" className="overlay">
                                        <div className="popup">
                                            <a className="close" href="#">
                                                ×
                                            </a>
                                            <div className="content-box">
                                                <div className="box">
                                                    <img
                                                        src="assets/img/popup_img.png"
                                                        alt=""
                                                        className="profile-img"
                                                    />
                                                    <h4>{t("Special Bet")}</h4>
                                                    <div className="pop-img">
                                                        <ul>
                                                            <li>
                                                                <img
                                                                    src="assets/img/240_F_105573812_cvD4P5jo6tMPhZULX324qUYFbNpXlisD-removebg-preview 1.png"
                                                                    alt=""
                                                                />
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                            <li style={{ marginTop: "0.7rem !important" }}>
                                                                <img
                                                                    src="assets/img/AdobeStock_541812547_Preview 1.png"
                                                                    alt=""
                                                                />
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img
                                                                        src="assets/img/Frame.png"
                                                                        alt=""
                                                                        className="img-fluid"
                                                                    />
                                                                    100€
                                                                </p>
                                                            </li>
                                                        </ul>
                                                        <h6>
                                                            <b>AMY’s Birthday Number</b>
                                                        </h6>
                                                        <ul>
                                                            <li>
                                                                <h4 className="red">3</h4>
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                            <li>
                                                                <h4 className="black">23</h4>
                                                                <p>赤にベット</p>
                                                                <p>
                                                                    <img src="assets/img/Frame.png" alt="" />
                                                                    100€
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content-card chat_section">
                                <div className="card-title">
                                    <h5>{t("Chat History")}</h5>
                                    <div className="content">
                                        <div className="text">
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>
                                                        はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜はろはろ〜
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜</p>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <img src="assets/img/Ellipse 2.png" alt="" />
                                                </li>
                                                <li>
                                                    <h6>ともひろ</h6>
                                                    <p>はろはろ〜はろはろ〜</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default StreamerIndex
import { useTranslation } from "react-i18next"

    function InfoSection(props) {
        const{t} = useTranslation()
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
    
        return(
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
                    {props.livePlayerInfo && props.livePlayerInfo.map((value, index) => {
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
                            {props.bigWin && props.bigWin.map((value, index) => {
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

                            {props.roomInfoPoints && props.roomInfoPoints.map((value, index) => {
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
                                <li>{t("Week")}</li>
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
        )
    }
    export default InfoSection
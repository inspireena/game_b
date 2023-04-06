import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
import BlockModal from "./BlockModal";
const socket = io("ws://localhost:8000");

// import React from 'react'
function ChatSection(props) {
    const { t } = useTranslation()

    const {
        streamer_id,
        streamer_name,
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
        video_streaming_url,
        table_color,
        game_code,
        luckyno,
        country,
        type,
        permission,
        updatedAt,
        createdAt
    } = JSON.parse(localStorage.getItem('streamer_details'))

    
    useEffect(() => {
        var streamerData = JSON.parse(localStorage.getItem('streamer_details'))
        console.log('streamer data check', streamerData);
        socket.emit("streamerDetail", streamerData);

    }, [])
    useEffect(() => {
        socket.on("allMessages", (data) => {
            // console.log('datainUseE------', data);
            props.setMessageData(data);
        });

    }, [props.messageData])
    useEffect(() => {
        props.divRef.current.scrollTop = props.divRef.current.scrollHeight;
    }, [props.messageData]);




    const sendChat = (e) => {
        // alert("okk")
        if (props.text !== "") {
            var data = {
                message: props.text,
                streamer_name: streamer_name,
                streamer_id: streamer_id,
                displayname: displayname,
                email: email,
                phone: phone,
                image: image,
                time: new Date().toISOString(),
            };
            props.setMessageData([...props.messageData, data]);
            socket.emit("messages", data);
            props.setText("");

        }
    };
    const handleProfileBlock = (player_id, playerName) => {
        props.setPlayerId(player_id);
        props.setPlayerName(playerName)
        if (player_id) {
            props.setIsBlockModal(true)
        }
    }
    console.log('props.playerID======', props.playerId)
    return (
        <div className="col-lg-4">
            <div className="content-card chat_section">
                <div className="card-title">
                    <h5>{t("Chat History")}</h5>
                    <div className="content">
                        <div className="text">
                            {/* Map for chat */}
                            <div ref={props.divRef} style={{ overflowY: "hidden", height: "822px" }}>
                                {props.messageData && props.messageData.length > 0 ? props.messageData.map((msgDta, index) => {

                                    return (<ul>
                                        <li>
                                            <img
                                                src={msgDta.image}
                                                alt=""
                                                style={{
                                                    width: '2rem',
                                                    height: '2rem',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => handleProfileBlock(msgDta.player_id, msgDta.userName)} />
                                        </li>
                                        <li>
                                            <p>{msgDta.streamer_id || msgDta.player_id}</p>
                                            <h6>{msgDta.displayname || msgDta.userName} </h6>
                                            <p>{msgDta.message}</p>
                                        </li>
                                    </ul>)

                                }) : null}</div>
                        </div>

                    </div>
                </div>
                <div className="send-msg">
                    <input
                        type="text"
                        placeholder={t("Type Message")}
                        maxLength={200}
                        value={props.text}
                        onKeyPress={(e) => (e.key == "Enter" ? sendChat() : null)}
                        onChange={(event) => props.setText(event.target.value)}
                    />

                </div>
            </div>
            {props.isBlockModal && <BlockModal
                isBlockModal={props.isBlockModal} setIsBlockModal={props.setIsBlockModal}
                isNuisance={props.isNuisance} setIsNuisance={props.setIsNuisance}
                isAddicted={props.isAddicted} setIsAddicted={props.setIsAddicted}
                nuisance={props.nuisance} setNuisance={props.setNuisance}
                addicted={props.addicted} setAddicted={props.setAddicted}
                playerId={props.playerId} setPlayerId={props.setPlayerId}
                playerName={props.playerName} setPlayerName={props.setPlayerName}

            />}
        </div>
    )
}
export default ChatSection
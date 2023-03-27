// import { useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import { io } from "socket.io-client";
// const socket = io("ws://localhost:8000");

// function Chat(props) {
//     const {t}= useTranslation()
//     useEffect(() => {
//         var streamerData = JSON.parse(localStorage.getItem('streamer_details'))
//         console.log(streamerData);
//         socket.emit("streamerDetail", streamerData);

//     }, [])

//     useEffect(() => {
//         Socket.on("allMessages", (data) => {
//             console.log('datainUseE------', data);
//             props.setMessageData(data);
//         });

//     }, [props.messageData])
//     useEffect(() => {
//         props.divRef.current.scrollTop = props.divRef.current.scrollHeight;
//     }, [props.messageData]);


//     const sendChat = (e) => {
//         // alert("okk")
//         if (props.text != "") {
//             var data = {
//                 message: props.text,
//                 streamer_name: streamer_name,
//                 email: email,
//                 phone: phone,
//                 image: image,
//                 time: new Date().toISOString(),
//             };
//             props.setMessageData([...props.messageData, data]);
//             props.socket.emit("messages", data);
//             props.setText("");

//         }
//     };
//     return(
//         <div className="col-lg-4">
//         <div className="content-card chat_section">
//             <div className="card-title">
//                 <h5>{t("Chat History")}</h5>
//                 <div className="content">
//                     <div className="text">
//                         {/* Map for chat */}
//                         <div ref={props.divRef} style={{ overflowY: "hidden", height: "822px" }}>
//                             {props.messageData && props.messageData.length > 0 ? props.messageData.map((msgDta, index) => {
//                                 return (<ul>
//                                     <li>
//                                         <img src="assets/img/Ellipse 2.png" alt="" />
//                                     </li>
//                                     <li>
//                                         <h6>{msgDta.streamer_name}</h6>
//                                         <p>{msgDta.message}</p>
//                                     </li>
//                                 </ul>)

//                             }) : null}</div>
//                     </div>

//                 </div>
//             </div>
//             <div className="send-msg">
//                 <input
//                     type="text"
//                     placeholder="Comment"
//                     maxLength={200}
//                     value={props.text}
//                     onKeyPress={(e) => (e.key == "Enter" ? sendChat() : null)}
//                     onChange={(event) => props.setText(event.target.value)}
//                 />

//             </div>
//         </div>
//     </div>
//     )
// }
// export default Chat
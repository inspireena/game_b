import { useTranslation } from "react-i18next"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postApi } from "../../utils/ApiInstanse";
import axios from "axios";
const FormData = require("form-data");


function SettingSectionOne(props) {
    let streamerDetails = JSON.parse(localStorage.getItem('streamer_details'));
    const { t } = useTranslation()
    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);
    const handleProfiSubmit = (e) => {
        // setProfileImg(e.target.file[0])
        // console.log('profile img', e.target.files[0]);
        props.setShow(false)
    }
    const handleTableColor = (e) => {
        // console.log(e.target.value)
        props.setTableColor(e.target.value)
        postApi('/change-streamer-table-color', {
            "table_color": e.target.value
        })
            .then((response) => {
                console.log('table color api', response.data.data.table_color)
                if (response && response.data && response.data.data && response.data.data.table_color) {
                    streamerDetails.table_color = response.data.data.table_color
                    localStorage.setItem('streamer_details', JSON.stringify({ ...streamerDetails }))
                }
            })
            .catch(err => console.log(err))
    }
    // console.log('tableColorOutside=====', props.tableColor);
    // console.log('-----image from data-----', props.profileImg );
    // _____________________________________streamer Info api___________________
    let streamerInfoUpdates = new FormData();
    streamerInfoUpdates.append("email", streamerDetails.email);
    streamerInfoUpdates.append("phone", streamerDetails.phone);
    streamerInfoUpdates.append("streamer_name", streamerDetails.streamer_name);
    streamerInfoUpdates.append("displayname", props.nickName);
    streamerInfoUpdates.append("dateofbirth", streamerDetails.dateofbirth);
    streamerInfoUpdates.append("description", props.comment);
    streamerInfoUpdates.append("image", props.profileImg);

    let { token } = JSON.parse(localStorage.getItem('loggedin'))
    const headers = {
        'Authorization': token
    }
    // for (var p of streamerInfoUpdates) {
    //     let name = p[0];
    //     let value = p[1];

    //     console.log('-----------form data VALUE',name, value)
    // }
    const handleSave = () => {
        props.setIsEdit(false)

        // console.log('name in==', nickName, 'and comment===', comment)
        axios.post('http://localhost:7000/strApi/update-streamer-info', streamerInfoUpdates, {
            headers: headers
        })
            .then((response) => {
                // console.log('------------',response.data.data[0].dateofbirth);
                if (response && response.data && response.data.data && response.data.data.length > 0) {
                    streamerDetails.displayname = response.data.data[0].displayname
                    streamerDetails.image = response.data.data[0].image
                    streamerDetails.description = response.data.data[0].description
                    // localStorage.removeItem('streamer_details')
                    localStorage.setItem('streamer_details', JSON.stringify({ ...streamerDetails }))
                }
                // console.log('info ibject--------', streamerDetails);
                props.setStreamerInfo(streamerDetails)
                // console.log('new object-----------', streamerInfo);
            })
            .catch(err => console.log(err))
    }
    // _________________________________________________________________________

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                // console.log("Called========", reader);
                baseURL = reader.result;
                // console.log("baseURL==========", baseURL);
                resolve(baseURL);
            };
            // console.log(fileInfo);
        });
    }


    const handleFileInputChange = (e) => {
        props.setProfileImg(e.target.files[0])
        let file = e.target.files[0];
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                props.setBase64URL(result, file)
            })
            .catch(err => {
                console.log(err);
            });
        props.setFile(e.target.files[0])

    }
    return (
        <div className="col-lg-4">
            <div className="content-card">
                <div className="card-title">
                    <h5>{t("Profile Image")}</h5>
                </div>
                <div className="profile-content">
                    <div className="profile">
                        <div style={{ display: "flex" }}>
                            {/* <img src={process.env.PUBLIC_URL + "/assets/img/profile.png"} /> */}
                            {!props.isEdit && <img src={streamerDetails.image} style={{ height: '8rem', width: '8rem' }} />}
                            {props.isEdit && <img src={props.base64URL} style={{ height: '8rem', width: '8rem' }} />}
                            {props.isEdit &&
                                <Button
                                    variant="primary"
                                    onClick={handleShow}
                                    style={{
                                        height: 'fit-content',
                                        background: 'bottom',
                                        marginTop: 'auto',
                                        marginLeft: '-2rem',
                                    }} >
                                    <i class="fa-sharp fa-solid fa-square-pen" ></i>
                                </Button>}
                        </div>

                        <Modal
                            show={props.show}
                            onHide={handleClose}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered>

                            <Modal.Body>
                                <div
                                    style={{
                                        color: '#9747FF',
                                        fontWeight: '600',
                                        fontsize: '12px',
                                    }}
                                >
                                    {t("Choose Profile Image")}
                                </div>
                                <input
                                    type='file'
                                    name='file'
                                    accept="image/*"
                                    onChange={handleFileInputChange}
                                    style={{
                                        padding: '2rem 0rem',
                                    }}>

                                </input>
                                <div
                                    style={{
                                        marginTop: '1rem',
                                        display: 'flex',
                                        justifyContent: 'end'
                                    }}>
                                    <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                        style={{
                                            marginRight: '0.5rem',
                                            // background: 'linear-gradient(180deg, #FF27C3 0%, #9747FF 100%)',
                                            borderRadius: '8px',
                                            padding: '2px 25px',
                                            border: 'none',
                                            color: '#ffffff',
                                            fontWeight: '600',
                                            fontsize: '12px',
                                        }}

                                    >
                                        {t("Close")}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={handleProfiSubmit}
                                        style={{
                                            marginRight: '0.5rem',
                                            padding: ' 8px 50px',
                                            background: 'linear-gradient(180deg, #FF27C3 0%, #9747FF 100%)',
                                            borderRadius: '8px',
                                            border: 'none',
                                            color: '#ffffff',
                                            fontWeight: '600',
                                            fontsize: '12px',
                                        }}
                                    >
                                        {t("Save Changes")}
                                    </Button>

                                </div>


                            </Modal.Body>

                        </Modal>


                        <div className="edit-btn">
                            {!props.isEdit && <button className="edit-btn" onClick={() => props.setIsEdit(true)}>{t("Edit")}</button>}
                            {props.isEdit && <button className="edit-btn" onClick={handleSave}>{t("Save")}</button>}
                        </div>
                    </div>
                    <div className="about-item">
                        <label htmlFor="">{t("Nick Name")}</label> <br />
                        {props.isEdit && <input
                            type="text"
                            placeholder={streamerDetails.displayname}
                            value={props.nickName}
                            onChange={(e) => { props.setNickName(e.target.value) }}
                        />}
                        {!props.isEdit && streamerDetails.displayname}
                        <p>
                            {t("Birthday")}{t("（Cannot be edited except for the first time)")} <br />
                            {new Date(streamerDetails.dateofbirth).getDate() + '-' + (new Date(streamerDetails.dateofbirth).getMonth() + 1) + '-' + new Date(streamerDetails.dateofbirth).getFullYear()}
                        </p>
                        <label >{t("Comment")}</label> <br />
                        {props.isEdit && <textarea
                            cols={35}
                            rows={4}
                            placeholder={props.comment}
                            style={{ resize: "none" }}
                            defaultValue={"                                "}
                            disabled={!props.isEdit}
                            onChange={(e) => { props.setComment(e.target.value) }}

                        />}
                        {!props.isEdit && streamerDetails.description}
                    </div>
                </div>
            </div>
            <div className="content-card">
                <div className="card-title">
                    <h5>{t("Table Color")}</h5>
                </div>
                <div className="select-color">

                    <label> <input type="radio" value='Green' name='select-color' onClick={handleTableColor} />{t("Green")}</label>
                    <label>  <input type="radio" value='Purple' name='select-color' onClick={handleTableColor} />{t("Purple")}</label>
                    <label> <input type="radio" value='Brown' name='select-color' onClick={handleTableColor} />{t("Brown")}</label>
                </div>
            </div>
            <div className="content-card">
                <div className="card-title">
                    <h5>{t("Live Setting")}</h5>
                </div>
                <div className="accordion">
                    <div>
                        <input
                            type="radio"
                            name="example_accordion"
                            id="section1"
                            className="accordion__input"
                        />
                        <label htmlFor="section1" className="accordion__lable">
                            <i className="fa-solid fa-video" />
                            <div>
                                <p style={{ marginBottom: 0 }}>{t("Camera")}</p>
                                <span>
                                    <b>{t("Face Time HD Camera")}</b>
                                </span>
                            </div>
                        </label>
                        <div className="accordion__content">
                            <p>Section #1</p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="example_accordion"
                            id="section2"
                            className="accordion__input"
                        />
                        <label
                            htmlFor="section2"
                            className="accordion__lable">
                            <i className="fa-solid fa-microphone" />
                            <div>
                                <p style={{ marginBottom: 0 }}>{t("Microphone")}</p>
                                <span>
                                    <b>{t("Airpods")}</b>
                                </span>
                            </div>
                        </label>
                        <div className="accordion__content">
                            <p>{t("Section #2")}</p>
                        </div>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="example_accordion"
                            id="section3"
                            className="accordion__input"
                        />
                        <label htmlFor="section3" className="accordion__lable">
                            <i className="fa-sharp fa-solid fa-volume-high" />
                            <div>
                                <p style={{ marginBottom: 0 }}>{t("Speaker")}</p>
                                <span>
                                    <b>{t("Airpods")}</b>
                                </span>
                            </div>
                        </label>
                        <div className="accordion__content">
                            <p>Section #3</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SettingSectionOne
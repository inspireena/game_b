
import { display } from '@mui/system';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import UploadModal from './UploadModal';

function Setting(props) {
    const [isEdit, setIsEdit] = useState(false)
    const [profileImg, setProfileImg] = useState()
    const [show, setShow] = useState(false);
    const [isUpload, setIsUpload] = useState()
    const { t } = useTranslation();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState(null)
    const [base64URL, setBase64URL] = useState(" ")
    const handleProfiSubmit = (e) => {
        // setProfileImg(e.target.file[0])
        // console.log('profile img', e.target.files[0]);
        setShow(false)
    }

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

    const [streamerName, setStreamerName] = useState(displayname)
    const [comment, setComment] = useState(description)

    const handleHome = () => {
        props.setMenu('home')
    }
    const handleSetting = () => {
        props.setMenu('setting')
    }
    const handleRadio = (e) => {
        console.log(e.target.value)
    }
    const handleSave = () => {
        setIsEdit(false)
        console.log('name in==', streamerName, 'and comment===', comment)
    }
    // -------------------------convert to base64---------------

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
                console.log("Called========", reader);
                baseURL = reader.result;
                console.log("baseURL==========",baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });

    }
    const handleFileInputChange = (e) => {
        let file = e.target.files[0];
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                setBase64URL(result, file)
            })
            .catch(err => {
                console.log(err);
            });
        setFile(e.target.files[0])

    }
    console.log('base64===========', base64URL, file)
    // -------------------------------------------------------
    return (
        <>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Setting_section</title>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n        .upload-vdo {\n            display: flex;\n            justify-content: space-between;\n            gap: 60px;\n            overflow: auto;\n        }\n\n        .upload-vdo .text .heading {\n            display: flex;\n            align-items: center;\n            gap: 3px;\n        }\n\n        .upload-vdo .text .heading h5 {\n            font-size: 12px;\n        }\n\n        .upload-vdo button {\n            background: linear-gradient(180deg, #FF27C3 0%, #9747FF 100%);\n            border-radius: 8px;\n            padding: 2px 25px;\n            border: none;\n            color: #fff;\n            font-weight: 600;\n            font-size: 12px;\n        }\n\n        .text .link {\n            padding: 5px 0;\n        }\n\n        .text .link p {\n            margin-bottom: 0;\n            font-size: 13px;\n        }\n\n        .text .link span {\n            padding-left: 24px;\n            font-size: 13px;\n        }\n\n        .text .link i {\n            background: linear-gradient(180deg, #FF27C3 0%, #9747FF 100%);\n            -webkit-background-clip: text;\n            -webkit-text-fill-color: transparent;\n            background-clip: text;\n        }\n\n        .content-card {\n            margin-bottom: 10px;\n        }\n    "
                }}
            />
            <div className="nav_bar">
                <a href="#" className="navbar-logo">
                    Baricata
                </a>
                <div className="nav-item">
                    <a className="nav-link" onClick={handleHome} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-house" /> {t("Home")}
                    </a>
                    <a className="nav-link active" onClick={handleSetting} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-gear" /> {t("Setting")}
                    </a>
                </div>
            </div>
            <div className="full_page" style={{ position: 'relative' }}>
                <div className="top-section">
                    <div className="das-title">
                        <h1>{t("Setting")}</h1>
                    </div>
                </div>
                <div className="container-fluid px-lg-5">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Profile Image")}</h5>
                                </div>
                                <div className="profile-content">
                                    <div className="profile">
                                        <img src={process.env.PUBLIC_URL + "/assets/img/profile.png"} />
                                        {isEdit && <Button variant="primary" onClick={handleShow}>
                                            <i class="fa-sharp fa-solid fa-square-pen" ></i>
                                        </Button>}

                                        <Modal
                                            show={show}
                                            onHide={handleClose}
                                            aria-labelledby="contained-modal-title-vcenter"
                                            centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{t("Choose Profile Image")}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <input type='file' name='file' accept="image/*" onChange={handleFileInputChange}></input>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    {t("Close")}
                                                </Button>
                                                <Button variant="primary" onClick={handleProfiSubmit}>
                                                    {t("Save Changes")}
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>


                                        <div className="edit-btn">
                                            {!isEdit && <button className="edit-btn" onClick={() => setIsEdit(true)}>{t("Edit")}</button>}
                                            {isEdit && <button className="edit-btn" onClick={handleSave}>{t("Save")}</button>}
                                        </div>
                                    </div>
                                    <div className="about-item">
                                        <label htmlFor="">{t("Nick Name")}</label> <br />
                                        {isEdit && <input type="text" placeholder={streamerName} value={streamerName} onChange={(e) => { setStreamerName(e.target.value) }} />}
                                        {!isEdit && streamerName}
                                        <p>
                                            {t("Birthday（Cannot be edited except for the first time)")} <br />
                                            {new Date(dateofbirth).getDate() + '-' + (new Date(dateofbirth).getMonth() + 1) + '-' + new Date(dateofbirth).getFullYear()}
                                        </p>
                                        <label >{t("Comment")}</label> <br />
                                        {isEdit && <textarea
                                            cols={35}
                                            rows={4}
                                            placeholder={comment}
                                            style={{ resize: "none" }}
                                            defaultValue={"                                "}
                                            disabled={!isEdit}
                                            onChange={(e) => { setComment(e.target.value) }}

                                        />}
                                        {!isEdit && comment}
                                    </div>
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
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Table Color")}</h5>
                                </div>
                                <div className="select-color">

                                    <label> <input type="radio" value='Green' name='select-color' onClick={handleRadio} />{t("Green")}</label>
                                    <label>  <input type="radio" value='Purple' name='select-color' onClick={handleRadio} />{t("Purple")}</label>
                                    <label> <input type="radio" value='Brown' name='select-color' onClick={handleRadio} />{t("Brown")}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Frame Range Selection")}</h5>
                                </div>
                                <div className="live-frame">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/live frame.png"} className="img-fluid" />
                                    {/* <img
                                        src="assets/img/live frame.png"
                                        alt=""
                                      
                                    /> */}
                                </div>
                            </div>
                            <div className="content-card">
                                <div className="card-title">
                                    <h5>{t("Recorded video upload while live is stopped")}</h5>
                                </div>
                                <div className="upload-vdo">
                                    <div className="text">
                                        <div className="heading">
                                            <h5>{t("A. Betting Time")}</h5>
                                            <a href="#" className="upload-btn">
                                                <button onClick={() => setIsUpload(true)}>{t("Upload")}</button>
                                            </a>

                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" />{t(" Video Name")}
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <div className="heading">
                                            <h5>{t("B. Roulette rotation time")}</h5>
                                            <a href="#" className="upload-btn">
                                                <button>{t("Upload")}</button>
                                            </a>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> {t("Video Name")}
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <div className="heading">
                                            <h5>{t("C. Result decision time")}</h5>
                                            <a href="#" className="upload-btn">
                                                <button>{t("Upload")}</button>
                                            </a>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                        <div className="link">
                                            <p>
                                                <i className="fa-solid fa-paperclip" /> Video Name
                                            </p>
                                            <span>
                                                10MB<span></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isUpload && <div className="d-flex justify-content-center px-2 bg-fade">
                    <UploadModal isUpload={isUpload} setIsUpload={setIsUpload} /></div>}
            </div>
        </>

    )
}
export default Setting
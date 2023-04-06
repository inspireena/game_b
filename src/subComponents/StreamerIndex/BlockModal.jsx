import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";


function BlockModal(props) {
    const { t } = useTranslation()
    const handleClose = () => props.setIsBlockModal(false);

    const handleNuisance = () => {
        // alert('handling Nuisance')
        props.setIsNuisance(!props.isNuisance)
    }
    const handleAddicted = () => {
        props.setIsAddicted(!props.isAddicted)
    }

    if (props.isNuisance) {
        props.setNuisance('block')
    }
    else { props.setNuisance(null) }
    if (props.isAddicted) {
        props.setAddicted('addicted')
    } else { props.setAddicted(null) }
    let { token } = JSON.parse(localStorage.getItem('loggedin'))
    const handleBlock = () => {
        console.log('block addict msg===', props.addicted)
        console.log('block  msg===', props.nuisance)
        axios.get('http://localhost:7001/streamer/block-player-chet', {
            params: {
                player_id: props.playerId,
                addicted : props.addicted,
                block : props.nuisance
          
            },
            headers: {
                'Authorization': token
            }
        })
            .then((response) => {
                console.log(response)
               
            })
            .catch((err) => console.log(err))
        props.setPlayerId(null)
        props.setPlayerName(null)
        props.setIsBlockModal(false)
    }
    console.log('--- block isNuisance---------------------', props.isNuisance)
    console.log('--- block IS ADDICTED---------------------', props.isAddicted)
    console.log(' block props.playerID======', props.playerId)
    console.log('block   props.playerID======', props.playerName)
    console.log(' block addicted msg======', props.addicted)
    console.log('block   block  msg======', props.nuisance)
    return (<>
        <Modal
            show={props.isBlockModal}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="modal-content">
                    <div className="modal-body">
                        <h6
                            style={{ color: "#FF4D4F" }}>
                            {t("Report")}
                        </h6>
                      {t("You are reporting ")}<b>{props.playerName}</b> {t(" as")}
                        <br />
                        {/* player ID  - {props.playerId} */}
                        <div className="form">
                            <input
                                type="checkbox"
                                // name='blockMessage'
                                // value='Nuisance'
                                checked={props.isNuisance}
                                onChange={handleNuisance}
                                style={{ marginRight: '0.3rem' }} />
                            <label>{t("Nuisance")}</label>
                            <br />
                            <input
                                type="checkbox"
                                // name='blockMessage'
                                // value='NuisSuspicion of gambling addictionance'
                                checked={props.isAddicted}
                                onChange={handleAddicted}


                                style={{ marginRight: '0.3rem' }} />
                            <label for="">{t("Suspicion of gambling addiction")}</label>
                        </div>
                        <div className="modal-btn">
                            <Button
                                variant="secondary"
                                className="me-2"
                                onClick={() => {
                                    props.setPlayerId(null)
                                    props.setPlayerName(null)
                                    props.setIsBlockModal(false)
                                }}
                            >
                                {t("Close")}
                            </Button>

                            <a><Button
                            variant="danger"
                                onClick={handleBlock}
                                disabled ={!props.isAddicted && !props.isNuisance}
                            >{t("Send")}</Button></a>
                        </div>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    </>)
}
export default BlockModal
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getApi } from "./ApiInstanse"

function GameSelectionIndex(props) {
  const navigate = useNavigate()
  const [gameList, setGameList] = useState([])

  useEffect(() => {
    getApi('/game-list')
      .then((response) => {
        // console.log('game-list-response====', response.data.data);
        if (response && response.data && response.data.data && response.data.data.length >= 0) {
          setGameList(response.data.data)
        }
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedin')
    localStorage.removeItem('streamer_details')
    navigate('/')
  }
  const handlePlay = (name) => {
    alert(name)
  }

  return (
    <>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>game_Section</title>

      {/* Navbar*/}
      <div className="nav_bar">
        <a href="#" className="navbar-logo">
          Baricata
        </a>
        <div className="nav-item">
          <div className="nav-link active" onClick={() => props.setMenu('home')} >
            <i className="fa-solid fa-house"></i>
            Home
          </div>
          <div className="nav-link" onClick={() => props.setMenu('setting')}>
            <i className="fa-solid fa-gear" />
            Setting
          </div>
          <div className="nav-link" onClick={handleLogout}>
            {/* <i className="fa-solid fa-gear" /> */}
            Logout
          </div>
        </div>
      </div>
      <div className="full_page">
        <div className="das-title">
          <h1>Game Selection</h1>
        </div>
        <div className="container">
          <div className="row">
            {gameList && gameList.length > 0 && gameList.map((value, index) => {
              return (
                <div key={index}>
                  {/* {index % 2 === 0 && */}
                  <div className="col-lg-5 ">
                    <div className="card">
                      <div className="card-header">{value.game_name}</div>
                      <div className="card-body text-success">
                        <p className="card-img">
                          <img src={process.env.PUBLIC_URL + "/assets/img/Vector2.png"} className="img-fluid" />
                        </p>
                        <div className="btn">

                          <button className="play-btn" type="submit">
                            play
                          </button>

                        </div>
                      </div>
                      <div className="card-footer" />
                    </div>
                  </div>
                  {/* } */}
                  {/* {index % 2 !== 0 &&
                    <div className="col-lg-5">
                      <div className="card">
                        <div className="card-header">{value.game_name}</div>
                        <div className="card-body text-success">
                          <p className="card-img">
                            <img src={process.env.PUBLIC_URL + "/assets/img/Vector1.png"} className="img-fluid" />
                          </p>
                          <div className="btn">
                            <button className="play-btn" >
                              
                              play
                            </button>
                          </div>
                        </div>
                        <div className="card-footer" />
                      </div>
                    </div>
                    } */}
                </div>
              )


            })}
            {/* <div className="col-lg-5 mx-lg-5">
              <div className="card">
                <div className="card-header">ROUTEE</div>
                <div className="card-body text-success">
                  <p className="card-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/Vector1.png"} className="img-fluid" />
                  </p>
                  <div className="btn">
                    <button className="play-btn" type="submit">
                      play
                    </button>
                  </div>
                </div>
                <div className="card-footer" />
              </div>
            </div> */}
            {/* <div className="col-lg-5">
              <div className="card">
                <div className="card-header">ROUTEE</div>
                <div className="card-body text-success">
                  <p className="card-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/Vector2.png"} className="img-fluid" />

                  </p>
                  <div className="btn">

                    <button className="play-btn" type="submit">
                      play
                    </button>

                  </div>
                </div>
                <div className="card-footer" />
              </div>
            </div> */}
            {/* <div className="col-lg-5 mx-lg-5">
              <div className="card">
                <div className="card-header">ROUTEE</div>
                <div className="card-body text-success">
                  <p className="card-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/Vector3.png"} className="img-fluid" />
                  </p>
                  <div className="btn">

                    <button className="play-btn" type="submit">
                      play
                    </button>

                  </div>
                </div>
                <div className="card-footer" />
              </div>
            </div> */}
            {/* <div className="col-lg-5">
              <div className="card">
                <div className="card-header">ROUTEE</div>
                <div className="card-body text-success">
                  <p className="card-img">
                    <img src={process.env.PUBLIC_URL + "/assets/img/Vector4.png"} className="img-fluid" />
                  </p>
                  <div className="btn">

                    <button className="play-btn" type="submit">
                      play
                    </button>

                  </div>
                </div>
                <div className="card-footer" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>


  )
}
export default GameSelectionIndex

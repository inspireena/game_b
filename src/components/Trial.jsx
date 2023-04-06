function Trial(params) {
  return (
    <div style={{ backgroundColor: '#000000c7' }}>
      <div className="nav_bar" style={{ visibility: 'hidden' }}>
        <a href="#" className="navbar-logo">
          Baricata
        </a>
        <div className="nav-item">

        </div>
      </div>
      <div className="full_page">
        <div className="top-section" style={{ visibility: 'hidden' }} >
          <div className="das-title">
            <h1>Live preparation</h1>
          </div>
          <div className="button">
            <form action="" method="get">
              <button type="submit">Start Live</button>
            </form>
          </div>
        </div>
        <div className="container-fluid px-lg-5" >
          <div className="row">
            <div className="col-lg-4"  >
            </div>
            <div className="col-lg-4">
              <div className="content-card Video_section">
                <div className="card-title">
                  <h5>Live</h5>
                </div>
                {/* <video src="assets/live_video/live_video.mp4" style="height: 812px; width: 375px;"></video> */}
                {/* <img src="assets/img/bg_img.jpg" alt="" className="bg_img" /> */}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="content-card chat_section" style={{ backgroundColor: '#ffffff00' }} >

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Trial;
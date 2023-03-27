// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "../utils/ApiInstanse";
// import { useTranslation } from "react-i18next";
import LanguageSelect from "../languageSelect";
import { useTranslation } from "react-i18next";


function Login() {
  // const navigate = useNavigate()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const { t } = useTranslation();
  let isloggedin = false;
  if (localStorage.getItem('loggedin')) {
    const { token } = JSON.parse(localStorage.getItem('loggedin'));
    if (token) {
      isloggedin = true;
    }
  }
  if (isloggedin) {
    window.location.replace('/dashboard')
    return null;
  }


  const handleLogin = () => {
    var body = {
      "email": mail.toLowerCase(),
      "password": password
    };

    postApi('/login-data', body)
      .then((response) => {
        if (response && response.data && response.data.status) {
          localStorage.setItem('loggedin', JSON.stringify({ token: response.data.data.token }))
          localStorage.setItem('streamer_details', JSON.stringify({
            streamer_name: response.data.data.streamer_name,
            phone: response.data.data.phone,
            email: response.data.data.email,
            status: response.data.data.status,
            displayname: response.data.data.displayname,
            dateofbirth: response.data.data.dateofbirth,
            description: response.data.data.description,
            followers: response.data.data.followers,
            image: response.data.data.image,
            points: response.data.data.points,
            ranking: response.data.data.ranking,
            video_streaming_url: response.data.data.video_streaming_url
          }))
          // navigate('/dashboard')
          window.location.replace('/dashboard')
        }
        else {
          alert('Wrong Details')

        }
      })
      .catch((error) => {
        console.log("===========error==========", error);
      });

  }
  const handleMail = (e) => {
    setMail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>login Section</title>
      {/* language select */}
      <div style={{
        position: 'fixed',
        right: '0rem',
      }}>
        <LanguageSelect />
      </div>

      {/* Login Section */}
      <div className="container-fluid">
        <div className="row">
          <div className="title col-lg-5">
            <h1>{t("Baricata")}</h1>
          </div>
          <div className="login_form col-lg-7">
            <div className="form-title">
              <h3>
                <a href="#">{t('Welcome to Baricata !')}</a>
              </h3>
            </div>
            <form className="mt-4" >
              <label>{t("Mail")}</label>
              <input type="text" placeholder="XXXX@.co.jp" value={mail} onChange={handleMail} />
              <label>{t("Password")}</label>
              <input type="password" placeholder="XXXXXXXXXXXXX" value={password} onChange={handlePassword} />
              <p>
                <a href="#">{t("Did you forget your password?")}</a>
              </p>
            </form>
            <div className="btn">
              {/* <form action="" method="get"> */}
              <button className="save-btn" type="submit" onClick={handleLogin}>
               {t("Login")}
              </button>
              {/* </form> */}
            </div>
            <p>
             {t("Don't Have an account？")}<a href="#">{t("Register")}</a>
            </p>
          </div>
        </div>
      </div>
    </>

  );
}

export default Login;

import axios from "axios";
let authToken = null;




const instance = axios.create({
    baseURL: 'http://localhost:7001/streamer/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});


try {
    const { token } = JSON.parse(localStorage.getItem('loggedin'));
    authToken = token;
} catch (error) {
}
instance.defaults.headers.common['Authorization'] = authToken;
export const ApiInstance = () => {
    return instance;
}
// function ApiInstance() {
export const getApi = (url, config={}) => {
    return new Promise((resolve, reject) => {
    
        instance.get(url, {...config, headers : {'Authorization': authToken}})
            .then((response) => {
                if (response.data && !response.data.status && response.data.subCode===401) {
                    localStorage.removeItem('loggedin')
                    window.location.replace('/')
                    resolve()
                }
                resolve(response)




            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
export const postApi = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        let userToken = null;
        try {
            const { token } = JSON.parse(localStorage.getItem('loggedin'));
            authToken = token;
        } catch (error) {

        }
        instance.post(url, { ...data })
            .then((response) => {
                if (response.data && !response.data.status && response.data.subCode===401) {
                    localStorage.removeItem('loggedin')
                    window.location.replace('/')
                    resolve()
                }
                resolve(response)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}

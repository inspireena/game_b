import { useState } from "react"
import Setting from "../subComponents/Setting/Setting";
import StreamerIndex from "../subComponents/StreamerIndex/StreamerIndex";


function Dashboard() {
    const[menu, setMenu] =useState('home')
    let isloggedin = false;
    if (localStorage.getItem('loggedin')) {
        const { token } = JSON.parse(localStorage.getItem('loggedin'));
        if (token) {
            isloggedin = true;
        }
    }
    if (!isloggedin) {
        window.location.replace('/')
        return null;
    }

   

    return(
    <div>
        {menu==='home' && <StreamerIndex menu={menu} setMenu={setMenu}/>}
        {menu==='setting' &&<Setting  menu={menu} setMenu={setMenu}/>}
    
    </div>
        )
}
export default Dashboard
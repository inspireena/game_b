import { useState } from "react"
import StreamerIndex from "../subcomponents/streamerIndex/StreamerIndex";
import Setting from "../subcomponents/setting/Setting";
import Header from "../common/Header";

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
        <Header menu={menu} setMenu={setMenu}/>
        {menu==='home' && <StreamerIndex menu={menu} setMenu={setMenu}/>}
        {menu==='setting' &&<Setting  menu={menu} setMenu={setMenu}/>}
    
    </div>
        )
}
export default Dashboard
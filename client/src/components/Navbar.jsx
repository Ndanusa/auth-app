import {Settings} from 'lucide-react'
import logoImg  from '../assets/logo.svg'
import {useEffect, useState} from "react";
import axios from 'axios'
function Navbar(props){
    const BACKEND_URL = props.BACKEND_URL
    const [axs, setAxs] = useState('')
    async function getApi() {
        const api = await axios.get(`${BACKEND_URL}api/v1/auth/user/list`)
        setAxs(JSON.stringify(api))
    }
    return (
        <>
            <div className={`flex items-center justify-between px-10 py-3 w-full bg-indigo-50`}>
                <div>
                    <img src={logoImg} className={`w-10`} srcSet={``} alt={`logo`}/>
                </div>
                <div className={`flex items-center justify-center`}>
                    <ul className={`flex items-center justify-between gap-6 text-indigo-900`}>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative transition-all `}>Feed</a></li>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative transition-all `}>Friends</a></li>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative transition-all `}>Chats</a></li>
                    </ul>
                </div>
                <div className={`flex items-center justify-center`}>
                    <div className={`flex items-center justify-center gap-10`}>
                        <div className={`flex items-center justify-center w-10 h-10 bg-zinc-700 rounded-full`}>
                            <img src={``} srcSet={``} className={`text-sm text-gray-100`} alt={`Logo`} />
                        </div>
                        <div className={`cursor-pointer`}>
                        <Settings size={23}
                                  color={'#312c85'}
                                  strokeWidth={1.55}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {axs}
            </div>
        </>
    )
}

export default Navbar
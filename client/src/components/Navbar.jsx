import {Settings} from 'lucide-react'
function Navbar() {
    return (
        <>
            <div className={`flex items-center justify-between px-10 py-3 w-full bg-gray-300`}>
                <div className={`flex items-center justify-center`}>
                    <ul className={`flex items-center justify-between gap-6 text-gray-800`}>
                        <li><a href={'#'}>Home</a></li>
                        <li><a href={'#'}>Feed</a></li>
                        <li><a href={'#'}>Friends</a></li>
                        <li><a href={'#'}>Chats</a></li>
                        <li><a href={'#'}>Settings</a></li>
                    </ul>
                </div>
                <div className={`flex items-center justify-center`}>
                    <div className={`flex items-center justify-center`}>
                        <Settings size={18}
                                  color={''}
                                  strokeWidth={2.25}/>
                        <div className={`flex items-center justify-center w-10 h-10 bg-zinc-700 rounded-full`}>
                            <img src={``} srcSet={``} className={`text-sm text-gray-100`} alt={`Logo`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
import {Settings} from 'lucide-react'
function Navbar() {
    return (
        <>
            <div className={`flex items-center justify-between px-10 py-3 w-full bg-gray-300`}>
                <div className={`flex items-center justify-center`}>
                    <ul className={`flex items-center justify-between gap-6 text-zinc-900`}>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative hover:text-lg transition-all `}>Feed</a></li>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative hover:text-lg transition-all `}>Friends</a></li>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative hover:text-lg transition-all `}>Chats</a></li>
                        <li><a href={'#'} className={`duration-300 hover:text-zinc-500 relative hover:text-lg transition-all `}>Settings</a></li>
                    </ul>
                </div>
                <div className={`flex items-center justify-center`}>
                    <div className={`flex items-center justify-center gap-10`}>
                        <div className={`flex items-center justify-center w-10 h-10 bg-zinc-700 rounded-full`}>
                            <img src={``} srcSet={``} className={`text-sm text-gray-100`} alt={`Logo`} />
                        </div>
                        <div className={`cursor-pointer`}>
                        <Settings size={23}
                                  color={'#393939'}
                                  strokeWidth={1.55}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
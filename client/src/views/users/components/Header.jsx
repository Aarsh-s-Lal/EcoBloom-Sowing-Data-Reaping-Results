import React from 'react';
import { Logout } from '@mui/icons-material'
const logout = () => {
    sessionStorage.removeItem('token');
    window.document.reload()
}
const Header = () => {
    return (
        <>
        <header className=' h-[70px] relative w-full' > 
            <nav className="z-40 flex items-center justify-between px-5 py-2 fixed h-[70px] w-full bg-white shadow-sm ">
                <div className='ml-[65px]' >
                    <h1>Plant Management Dashboard</h1>
                </div>
                <div>
                    <span className='flex gap-2 cursor-pointer hover:text-teal-700' >
                        Logout
                    <Logout/>
                    </span>
                </div>
            </nav>
        </header>
            
        </>
    );
}

export default Header;

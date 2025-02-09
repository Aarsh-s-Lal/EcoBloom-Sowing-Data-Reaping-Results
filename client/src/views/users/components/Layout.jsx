import React from 'react';
import Header from './Header';
import Drawer from './Drawer';

const Layout = ({ children }) => {
    return (
        <>

            <Header />
            {/* {<WrappedComponent/>} */}
            <main className='ml-[65px] p-5' >
                {children}
            </main>
            <Drawer />
        </>
    );
}

export default Layout;

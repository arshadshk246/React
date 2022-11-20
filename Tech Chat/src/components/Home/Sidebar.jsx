import React from 'react';
import Chats from './Chats';
import Navbar from './Navbar';
import Search from './Search';

function Sidebar() {
    return (
        <div className="side">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
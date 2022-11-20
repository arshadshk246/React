import React from 'react';
import ChatWindow from './ChatWindow';

import Sidebar from './Sidebar';

function Home() {
    return (
        <div className="home">
            <div className="contents">
                <Sidebar />
                <ChatWindow/>
            </div>
        </div>
    );
}

export default Home;
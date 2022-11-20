import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatContext';

function ChatWindow() {

    const {data} = useContext(ChatContext); 

    return (
        <div className="chatWindow">
            <div className="chatInfo">
            <span>{data.user?.displayName}</span>

                <div className="chatIcons">
                    <i className="fa-solid fa-video"></i>
                    <i className="fa-solid fa-user-plus"></i>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
                <Messages />
                <Input />
        </div>
    );
}

export default ChatWindow;
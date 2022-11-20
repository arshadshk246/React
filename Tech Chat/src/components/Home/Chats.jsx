import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const {dispatch} = useContext(ChatContext); 

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload:u})
  }
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=> handleSelect(chat[1].userInfo)}>
          <img
            className="freindsPhoto"
            src={chat[1].userInfo.photoURL}
            alt=""
            />
          <span className="contacts">
            {chat[1].userInfo.displayName}
            {/* <p>{chat[1].lastMessage.text}</p> */}
            <p>{chat[1].lastMessage.text.length > 30 ? chat[1].lastMessage.text.substring(0,18) : chat[1].lastMessage.text}</p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Chats;

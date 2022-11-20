import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  
  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* <div className="message owner"> */}
      <div className="messageInfo">
        <img
          className="chatUserPhoto"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span className="just"></span> */}
      </div>
      <div className="messageContent ownerAlign">
        {/* <p className="userText ownerActive">{message.text}</p> */}
        <p className="userText ownerActive">{message.text.length > 50 ? message.text.substring(0,50).concat("...") : message.text}</p>
        {message.img && <img className="imgShare" src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;

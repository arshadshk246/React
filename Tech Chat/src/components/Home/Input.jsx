import { async } from "@firebase/util";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import Attach from "../images/attach.png";
import { v4 as uuid } from "uuid";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    // check if there is image, if not send text
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
            text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]: {
        text, // From chats db
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    await updateDoc(doc(db,"userChats", data.user.uid),{
      [data.chatId + ".lastMessage"]: {
        text, // From chats db
      },
      [data.chatId + ".date"]: serverTimestamp()
    })

    setText("");
    setImg(null);
  };

  return (
    <div className="inputMessage">
      <input
        className="userMessage"
        type="text"
        placeholder="Type something"
        onChange={(e) => setText(e.target.value)}
        value = {text}
      />

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img className="attachFile" src={Attach} alt="" />
        </label>
        <button className="sendMessage" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Input;

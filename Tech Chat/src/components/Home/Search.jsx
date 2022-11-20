import React, { useContext } from "react";
import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // create user chats
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
    // create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          spellCheck="false"
          className="search-contact"
          type="text"
          placeholder="Find Contact"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User Not Found!</span>}
      <div className="userContainer">
        {user && (
          <div className="userSearch" onClick={handleSelect}>
            <img className="freindsPhoto" src={user.photoURL} alt="" />
            <span className="contactsSearch">{user.displayName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
{
  /* Before Second Last div
                 <span className="contacts">
                <img className="freindsPhoto" src="https://images.pexels.com/photos/13260611/pexels-photo-13260611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                    John
                </span>

                <span className="contacts">
                <img className="freindsPhoto" src="https://images.pexels.com/photos/13260611/pexels-photo-13260611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                    John
                </span>

                <span className="contacts">
                <img className="freindsPhoto" src="https://images.pexels.com/photos/13260611/pexels-photo-13260611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                    John
                </span> */
}
export default Search;

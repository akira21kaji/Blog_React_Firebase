import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./EditPost.css";
import { updateDoc, doc } from "firebase/firestore";

const EditPost = ({ editingId, onEditDone, onEditSubmit }) => {
  const [editTitle, setEditTitle] = useState();
  const [editText, setEditText] = useState();
  const [docRef, setDocRef] = useState(null);

  useEffect(() => {
    if (editingId) {
      setDocRef(doc(db, "posts", editingId));
    }
  }, [editingId]);

  // console.log(docRef);

  const editDocument = async () => {
    if (docRef) {
      await updateDoc(docRef, {
        title: editTitle,
        postsText: editText,
      });
    }

    onEditSubmit({ id: editingId, title: editTitle, postsText: editText });
    onEditDone();
  };

  if (!editingId) return null;

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を編集する</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="aaa"
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder="bbb"
            onChange={(e) => setEditText(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button className="postButton" onClick={editDocument}>
            編集する
          </button>
          <button className="closeButton" onClick={onEditDone}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

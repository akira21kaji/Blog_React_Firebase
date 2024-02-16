import React, { useState } from "react";
import { auth } from "../firebase";
import "./EditPost.css";
import { updateDoc } from "firebase/firestore";

const EditPost = ({ hadleEdit, postList }) => {
  const [editTitle, setEditTitle] = useState();
  const [editText, setEditText] = useState();

  // console.log(postList);
  const isIdPostList = postList.find(
    (post) => post.author.id === auth.currentUser?.uid
  );

  const isTitle = isIdPostList.title;
  const isPostText = isIdPostList.postsText;

  // console.log(idMuchText);

  const editPost = async () => {
    await updateDoc(postList, {
      title: editTitle,
      postsText: editText,
    });
  };

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を編集する</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder={isPostText}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder={isTitle}
            onChange={(e) => setEditText(e.target.value)}
          ></textarea>
        </div>
        <div className="buttons">
          <button className="postButton" onClick={editPost}>
            編集する
          </button>
          <button className="closeButton" onClick={hadleEdit}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

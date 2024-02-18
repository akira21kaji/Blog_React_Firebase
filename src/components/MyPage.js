import React from "react";
import { UsePosts } from "../Hooks/UsePosts";
import { auth } from "../firebase";

const Mypage = () => {
  // 現在のユーザーIDを使用して投稿を取得
  const { posts } = UsePosts(auth.currentUser?.uid);

  return (
    <div>
      <div className="homepage">
        {posts.map((post) => {
          return (
            <div className="postContents" key={post.id}>
              <div className="postHeader">
                <h1>{post.title}</h1>
              </div>
              <div className="postTextContainer">{post.postsText}</div>
              <div className="nameAndDeleteButton">
                <h3>@{post.author.username}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mypage;

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import "./Home.css";
import EditPost from "./EditPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { UsePosts } from '../Hooks/UsePosts'

const Home = ({ isAuth }) => {
  const { posts, setPosts } = UsePosts();
  const [editingId, setEditingId] = useState(null);


  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  const onClickEdit = (postId) => {
    setEditingId(postId);
  };

  const onEditDone = () => {
    setEditingId(null);
  };

  const onEditSubmit = (editedPost) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === editedPost.id) {
          return { ...post, ...editedPost };
        } else {
          return post;
        }
      });
    });
  };

  const goodCount = async (goodId) => {
    await updateDoc(doc(db, "posts", goodId), {
      GoodIds: arrayUnion(auth.currentUser?.uid),
    });

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === goodId
          ? {
              ...post,
              GoodIds: [...(post.GoodIds || []), auth.currentUser?.uid],
            }
          : post
      )
    );
  };

  const resetGoodCount = async (resetId) => {
    await updateDoc(doc(db, "posts", resetId), {
      GoodIds: arrayRemove(auth.currentUser?.uid),
    });

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === resetId
          ? {
              ...post,
              GoodIds: post.GoodIds?.filter(
                (id) => id !== auth.currentUser?.uid
              ),
            }
          : post
      )
    );
  };

  return (
    <>
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
                <div className="offGood">
                  <button
                    onClick={() => goodCount(post.id)}
                    disabled={post.GoodIds?.includes(auth.currentUser?.uid)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Good!
                    {post.GoodIds?.length || 0}
                  </button>
                  <button onClick={() => resetGoodCount(post.id)}>Reset</button>
                </div>
                {post.author.id === auth.currentUser?.uid && (
                  <>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(post.id)}
                    >
                      削除
                    </button>
                    <button
                      className="editButton"
                      onClick={() => onClickEdit(post.id)}
                    >
                      編集
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <EditPost
        open={editingId != null}
        editingId={editingId}
        onEditDone={onEditDone}
        onEditSubmit={onEditSubmit}
      />
    </>
  );
};

export default Home;

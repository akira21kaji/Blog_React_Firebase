import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import "./Home.css";
import EditPost from "./EditPost";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));

      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.href = "/";
  };

  const hadleEdit = () => {
    setOnEdit(!onEdit);
  };

  return (
    <>
      <div className="homepage">
        {postList.map((post) => {
          return (
            <div className="postContents" key={post.id}>
              <div className="postHeader">
                <h1>{post.title}</h1>
              </div>
              <div className="postTextContainer">{post.postsText}</div>
              <div className="nameAndDeleteButton">
                <h3>@{post.author.username}</h3>
                {post.author.id === auth.currentUser?.uid && (
                  <>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(post.id)}
                    >
                      削除
                    </button>
                    <button className="editButton" onClick={hadleEdit}>
                      編集
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {onEdit ? (
        <div className="editModal">
          <EditPost hadleEdit={hadleEdit} postList={postList} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Home;

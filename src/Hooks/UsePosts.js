import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const UsePosts = (userId = null) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let q = collection(db, "posts");
      if (userId) {
        q = query(q, where("author.id", "==", userId));
      }
      const data = await getDocs(q);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchPosts();
  }, [userId]);

  return {
    posts,
    setPosts,
  }
};

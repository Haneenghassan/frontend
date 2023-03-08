import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Feed() {


  const current_ID = JSON.parse(localStorage.getItem('id'));

  
  const [posts, setPosts] = useState([]);
  
  const [check, setCheck] = useState();

  useEffect(() => {
    getPosts();
  }, [check])

  const handleSubmit = (check) => {
    console.log(check,"dddd");
    getPosts();
    setCheck(check);
    
  
  }



const getPosts =  () =>{
  axios.get(`http://localhost:80/frontend/back_end/posts.php/${current_ID}`)
  .then(response => {
    console.log(response.data);
    setPosts(response.data);
  })
}



  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share handleSubmit={handleSubmit}/>
        {(posts == []) ?
                  <></>
                  :
                  posts.map((post) =>(
                    <Post key = {post.id} post ={post} handleSubmit={handleSubmit}/>
                    ))}
        
      </div>
    </div>
  );
}
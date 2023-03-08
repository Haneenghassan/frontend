import Post from "../postUser/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function Feed(props) {

  const [posts , setPosts] = useState([]);
  const [check, setCheck] = useState(false);



  useEffect(() => {
    getPosts();
  }, [check])
  
  const handleSubmit = (check) => {
    console.log(check,"dddd");
    getPosts();
    setCheck(check);
    
  
  }
  // Posts



  function getPosts() {
    axios.get(`http://localhost:80/frontend/back_end/getPostForUser.php/${props.user_id}`)
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
                  posts.map((p) =>(
                    <Post  user_id={props.user_id} key = {p.id} post ={p} handleSubmit={handleSubmit}/>
                    ))}
        
      </div>
    </div>
  );
}
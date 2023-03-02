import "./post.css";
import { MdOutlineMoreVert } from 'react-icons/md';
import { Users } from "../../dummyData/dummyData";
import axios from 'axios';
import { useState, useEffect, useParams } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { CgBorderStyleDotted } from "react-icons/cg";
import {IoMdPhotos} from "react-icons/io";
import {AiOutlineLike} from "react-icons/ai";
import {AiFillLike} from "react-icons/ai";




export default function Post(props) {
  // const [like,setLike] = useState(post.like)
  // const [isLiked,setIsLiked] = useState(false)

  // const likeHandler =()=>{
  //   setLike(isLiked ? like-1 : like+1)
  //   setIsLiked(!isLiked)
  // }
  const ImageUser = localStorage.getItem('image');

const user_id = props.user_id;
  const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_Email = localStorage.getItem('email');

  const [inputs, setInputs] = useState("")
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes , setLikes] = useState([]);

  const [file, setFile] = useState(null);


  useEffect(() => {
    getPosts();
    getComments();
    getLikes();

    console.log(user_id);
  }, [])
  // Posts



  function getPosts() {
    axios.get(`http://localhost:80/frontend/back_end/getPostForUser.php/${user_id}`)
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
  }

  const handleImagePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("post", inputs);
    formData.append("user_id", current_ID);
    formData.append("file", file);

try {
  const response = await axios.post(
    "http://localhost:80/frontend/back_end/posts.php", formData
  );
  console.log(response.data);
  getPosts();
  // window.location.assign('/');
} catch (error) {
  console.error(error);
}
};

  const handlePost = (e) => {
    const value = e.target.value;
    setInputs(value)
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const post_id = e.target.id;
    const user_id = e.target.name;
    setInputs({ 'comment_content': value, 'post_id': post_id, 'user_id': user_id })
  }








  const editPost = (id) => {
    document.getElementById(`post${id}`).style.display = 'none';
    document.getElementById(`editPostForm${id}`).style.display = 'block';
    document.getElementById(`editPostBTN${id}`).style.display = 'none';
  }

  const handleEditPost = (id) => {
    const post_id = id;
    const value = document.getElementById(`editPostInput${id}`).value;
    setInputs({ 'post_content': value, 'post_id': post_id })
  }

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();

    const formEditData = new FormData();

    formEditData.append("post_content", inputs['post_content']);
    formEditData.append("post_id", inputs['post_id']);
    formEditData.append("file", file);

    console.log(formEditData);

    try {
      const response = await axios.post(
        "http://localhost:80/frontend/back_end/postEdit.php", formEditData
      );
      props.handleSubmit(Math.random());

      console.log(response.data);
      // window.location.assign('/');
      getPosts();
      getComments();
    } catch (error) {
      console.error(error);
    }
  };









  const deletePost = (id) => {
    axios.delete(`http://localhost:80/frontend/back_end/posts.php/${id}`).then(function (response) {
      // window.location.assign('/');
      props.handleSubmit(Math.random());

      getPosts();
      getComments();
    })
  }


  const canclePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = 'block';
    document.getElementById(`editPostForm${id}`).style.display = 'none';
    document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
    document.getElementById(`imgPost${id}`).style.display = 'block';
  }

  // Comments




  function getComments() {
    axios.get(`http://localhost:80/frontend/back_end/comments.php/`)
      .then(response => {
        console.log(response.data);
        setComments(response.data);
      })
  }

  const handleCreateComment = (e) => {
    e.preventDefault();
    axios.post('http://localhost:80/frontend/back_end/comments.php/', inputs).then((res) => {
      console.log(res);
      getPosts();
      getComments();
      // window.location.assign('/')

    }
    )
  }

  const deleteComment = (id) => {
    // console.log(id);
    axios.delete(`http://localhost:80/frontend/back_end/comments.php/${id}`).then(function (response) {
      console.log(response);
      getComments();
    })
  }

  const editComment = (id) => {
    document.getElementById(`comment${id}`).style.display = 'none';
    document.getElementById(`editCommentForm${id}`).style.display = 'block';
    document.getElementById(`editCommentBTN${id}`).style.display = 'none';
  }

  const handleEditComment = (id) => {
    const comment_id = id;
    const value = document.getElementById(`editCommentInput${id}`).value;
    setInputs({ 'comment_content': value, 'comment_id': comment_id })
  }

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:80/frontend/back_end/comments.php/', inputs).then(()=>{
      getPosts();
      getComments();
    }
      // window.location.assign('/')
    )
  }

  const foucsOnComment = (id) => {
    document.getElementById(id).focus();
  }


  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = 'block';
    document.getElementById(`editCommentForm${id}`).style.display = 'none';
    document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';

  }

     // like


     const getLikes = () => {
      axios.get(`http://localhost:80/frontend/back_end/likes.php/`)
      .then(response => {
        console.log(response.data);
          setLikes(response.data);
      })
    }
  
    const handleLikePost = (id) => {
      const post_id = id;
      const user_id = current_ID;
      setInputs({'user_id': user_id , 'post_id' : post_id})
    }
  
    const likePost = async (e) => {
      e.preventDefault();
      console.log(inputs)
        await axios.post('http://localhost:80/frontend/back_end/likes.php/' , inputs).then(
          // window.location.assign('/')
          )
          getPosts();
          getComments();
          getLikes();
    }
    const removeLikePost = async (e) => {
      e.preventDefault();
      console.log(inputs)
        await axios.post('http://localhost:80/frontend/back_end/likeDelete.php/' , inputs).then(
          // window.location.assign('/')
          )
          getPosts();
          getComments();
          getLikes();
    }

    const ShowComments = (id) => {
      document.getElementById(`commentsForPost${id}`).style.display = 'block';
  
      // { showCommentsForm ? setCommentsForm(false) : setCommentsForm(true) }
  
  
    }
  
  var flagLike = false;
  var like_count = 0;
  var comment_count = 0 ;
  var comment_count_show = 0 ;
  return (

    <>
      {/* {posts.map((post, index) => {
        return (
          <div key={index}> */}
            <div className="post" >
              <div className="postWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <img
                      className="postProfileImg"
                      src={require(`../image/${props.post.image}`)}
                      alt=""
                    />
                    <span className="postUsername">
                      {props.post.name}
                    </span>
                    <span className="postDate">{props.post.created_at}</span>
                  </div>
                  <div className="postTopRight">
                    {(props.post.user_id === current_ID) ?
                      <div className="postBottun">
                        <Dropdown>
                          <Dropdown.Toggle variant="text-dark" id="dropdown-basic" bsPrefix >
                            <CgBorderStyleDotted />
                          </Dropdown.Toggle >

                          <Dropdown.Menu>
                        <div>
                        <Dropdown.Item  id={`editPostBTN${props.post.post_id}`} onClick={() => { editPost(props.post.post_id) }}><BiEdit />Edit</Dropdown.Item>
                        </div>
                        <div >
                        <Dropdown.Item  onClick={() => { deletePost(props.post.post_id) }}><MdDeleteForever />Delete</Dropdown.Item>
                     </div>
                     </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      : null}
                  </div>
                </div>

                
                {(props.post.post_image !== 'a') ?
                  <div className="postCenter">
                    <span className="postText" id={`post${props.post.post_id}`}>{props.post.content}</span>
                    <form id={`editPostForm${props.post.post_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditPostSubmit}>
                      <textarea className="form-control"
                        style={{ width: '28rem' }}
                        type="text"
                        defaultValue={props.post.content}
                        id={`editPostInput${props.post.post_id}`} onChange={() => handleEditPost(props.post.post_id)} />

                      <input
                        type="file"
                        id="file"
                        className="shareInput"
                        onChange={(e) => setFile(e.target.files[0])} /> 
                        {/* <label className="label" for="file"><IoMdPhotos size={20}/></label>  */}

                       
                    
                        <Button  variant="success" type='submit' size="sm" style={{marginLeft:"25%"}}>Update</Button>
                      <Button variant="danger" size="sm" style={{ background: 'red', color: 'white',marginLeft:'1%' }} onClick={() => { canclePostEdit(props.post.post_id) }} type='button'>Cancle</Button>
                      
           
                    
                    </form>
                    <img className="postImg" src={require(`../image/${props.post.post_image}`)} alt="" id={`imgPost${props.post.post_id}`} />
                  </div>
                  :
                  <div className="postCenter">

                    <span className="postText" id={`post${props.post.post_id}`}>{props.post.content}</span>
                    <form id={`editPostForm${props.post.post_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditPostSubmit}>

                      <textarea
                        style={{ width: '50vw'}}
                        type="text"
                        defaultValue={props.post.content}
                        id={`editPostInput${props.post.post_id}`}
                        onChange={() => handleEditPost(props.post.post_id)} />

                      <input
                       className="shareInput"
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])} />

                      <br />

                      <Button type='submit' >Confirm</Button>
                      <Button style={{ background: 'red', color: 'white' }} onClick={() => { canclePostEdit(props.post.post_id) }} type='button'>Cancle</Button>

                    </form>

                  </div>
                }
                <div className="postBottom">
                  <div className="postBottomLeft">
                  {
                    likes.map((like , index_like) => {
                      if (like.user_id == current_ID && like.post_id == props.post.post_id){
                        return ( flagLike = true )
                      }})}


                      

                      {( flagLike == true ) ?
                              <form action="" onSubmit={removeLikePost}>
                                <button type='submit' style={{background : 'none' , border : 'none', color : 'rgb(35, 196, 131)'  }} onClick={()=>handleLikePost(props.post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                  <i className="far fa-thumbs-up me-2" />
                                  <AiFillLike size={25} />  <p className="mb-0" >Like</p>
                                </button>
                              </form>
                      :
                              <form action="" onSubmit={likePost}>
                                  <button type='submit' style={{background : 'none' , border : 'none'}} onClick={()=>handleLikePost(props.post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                    <i className="far fa-thumbs-up me-2" />
                                    <AiOutlineLike size={25}/><p className="mb-0">Like</p>
                                  </button>
                              </form>
                      }
            {likes.map((count)=>{
              if(count.post_id == props.post.post_id){
                like_count++;
              }
            })}
            <span className="postLikeCounter">{like_count} people like it</span>
                  </div>
                  <p style={{display:"none"}}>{comment_count = 0}</p>
                {comments.map((count)=>{
                  if(count.post_id == props.post.post_id){
                    comment_count++
                  }
                })}
                  <div className="postBottomRight">
                    <span className="postCommentText" onClick={() =>ShowComments(props.post.post_id)}>comments ({comment_count})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer py-3 border-0 shadow-2-strong"  style={{ backgroundColor: '#f8f9fa',display:"none" }} id={`commentsForPost${props.post.post_id}`}>
              <div className="w-100">
                {comments.map((comment, index) => {
                  if (comment.post_id === props.post.post_id) {
                    return (
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" src={require(`../image/${comment.image}`)} alt="avatar" width={40} height={40} />
                            <span>{comment.name}</span>
                          </div>
                          {(comment.user_id === current_ID) ?
                            <div>
                              <Button  variant="danger" style={{marginLeft:"-15%"}} size="sm"  onClick={() => { deleteComment(comment.comment_id) }}><MdDeleteForever /></Button>
                              <Button variant="success" size="sm"  id={`editCommentBTN${comment.comment_id}`} onClick={() => { editComment(comment.comment_id) }}><BiEdit /></Button>
                            </div> : (props.post.user_id === current_ID) ?
                              <div>
                                <Button variant="danger"  style={{marginLeft:"-15%"}} onClick={() => { deleteComment(comment.comment_id) }}><MdDeleteForever /></Button>
                              </div>
                              : null}
                        </div>
                        <br />
                        <div className="form-outline w-100" style={{marginLeft:"2%"}}>
                        <Card style={{border:'none' ,width:'90%'}}>
                          <p  style={{paddingLeft:"2%",paddingTop:"2%"}} id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                          </Card>
                          <form id={`editCommentForm${comment.comment_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditCommentSubmit}>
                            <textarea style={{width:'90%'}} className="form-control" type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)} />
                            <div style={{marginLeft:"2%",marginTop:"2%",display:"flex"}}>
                          <div>
                            <Button variant="success" type='submit'>Confirm</Button>
                            </div>
                          <div style={{marginLeft:"1%"}}>
                            <Button variant="danger" style={{ color: 'white' }} onClick={() => { cancleCommentEdit(comment.comment_id) }} type='button'>Cancle</Button>
                            </div>
                            </div>
                          </form>

                          <p style={{marginLeft:"2%",marginTop:"1%"}}>{comment.comment_created_at}</p>
                        </div>
                        <hr />
                      </div>
                    )
                  }
                })}
              </div>
              <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa',marginLeft:"1%"}}>
                <div className="d-flex flex-start w-100">
                <img className="rounded-circle shadow-1-strong me-3" src={require(`../image/${ImageUser}`)} alt="avatar" width={40} height={40} />
                  <form className="form-outline " onSubmit={handleCreateComment}>
                    <textarea className="form-control" id={props.post.post_id} name={current_ID} rows={4} style={{ background: '#fff', width: '28rem'}} onChange={handleChange} />
                    <Button style={{marginTop:"2% ",backgroundColor:"#23c483",border:"none"}} type="submit"  >Comment</Button>
                  </form>
                </div>
              </div>

            </div>
            
     
    </>
  )
}
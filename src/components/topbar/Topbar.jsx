import "./topbar.css";
import { BsSearch,BsFillPersonFill,BsFillChatFill } from 'react-icons/bs';
import { MdNotifications } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";





export default function Topbar() {

  const id = JSON.parse(localStorage.getItem('id'));
  const ImageUser = localStorage.getItem('image');
  const NameUser = localStorage.getItem('name');

  const [dataUsers,setDataUsers] = useState([]);

  const [requestFriends,setRequestFriends] = useState([]);  
  const [requestFriend,setrequestFriend] = useState([]);

  useEffect(()=>{
    getDataUsers();
    getFriendsRequest();

},[]);



      // لعرض  بيانات المستخدم في الموقع
      const getDataUsers = () => {

        axios.get(`http://localhost:80/frontend/back_end/user.php/users/${id}`)
        .then((respone)=>{
          setDataUsers(respone.data)
            console.log(respone.data);
        })
    }
  const getFriendsRequest = () => {

    axios.get(`http://localhost:80/frontend/back_end/friendRequests.php/${id}`)
    .then((respone)=>{
        console.log(respone.data);
        let requestFriend = respone.data.map((ele)=>{
            return ele.user_id
        })
        console.log(requestFriend);
        setrequestFriend(requestFriend);
        setRequestFriends(respone.data)
    })
}

    // status الموافقة على طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
      let inputs = {user_id:id , friend_id:friendId};
      axios.put(`http://localhost:80/frontend/back_end/friends.php/edit`,inputs)
      .then((respone)=>{
          getFriendsRequest();
      })
    }

        // الغاء  طلب الصداقة
        const removeRequest = (friendId) => {
          let inputs = {user_id:friendId , friend_id:id};
          axios.put(`http://localhost:80/react_project/back_end/removeRequest.php/edit`,inputs)
          .then((respone)=>{
              console.log(respone.data);
              getFriendsRequest();
          })
  
  
          
      }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft" style={{marginLeft:"30px"}}>
      <Link to={`/home`}>
       <img style={{ width:"160px"}} src={require(`../image/weshare white.png`)}/>
        </Link>
        
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <BsSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div  className="topbarIconItem">
          <Dropdown >
      <Dropdown.Toggle variant="#008069" bsPrefix >
      <BsFillPersonFill size={25} style={{color:"white"}} />
      {requestFriends.length > 0 ?
            <span className="topbarIconBadge">{requestFriends.length}</span>
            :
            ""}
            {/* <span className="topbarIconBadge" >{requestFriends.length}</span> */}
      </Dropdown.Toggle >
      <Dropdown.Menu >
        
      {requestFriends.map((ele,index)=>{
            return(
        <Dropdown.Item   href="#/action-1" key={index} >
          <div style={{display:"flex",borderRadius:"50%",justifyContent:"space-evenly"}}>
         <img style={{maxWidth:"30%",maxHeight:"10%"}} src={require(`../image/${ele.image}`)}/>
            <p style={{fontWeight:"600"}}>{ele.name}</p>
         </div>
         <br/>
                <Button size="sm" variant="success" onClick={()=>AcceptFriend(ele.user_id)}>Confirm</Button>
                <Button style={{marginLeft:"2%"}} size="sm" variant="danger" onClick={()=>removeRequest(ele.user_id)}>Delete</Button>
   
        </Dropdown.Item>
        // <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        // <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        )})}
      </Dropdown.Menu>
    </Dropdown>
          </div>
          {/* <div className="topbarIconItem">
            <BsFillChatFill />
            <span className="topbarIconBadge">2</span>
          </div> */}
          <div className="topbarIconItem">
       
            {/* <Dropdown> */}
      {/* <Dropdown.Toggle  id="dropdown-basic" bsPrefix>
      <span className="topbarIconBadge1">1</span>
      <MdNotifications />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu> */}
    {/* </Dropdown> */}
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap: "10px"}}>
        <p style={{marginBottom:"0"}}>Hello,{NameUser}</p>
        <Link to={`/profile/${id}`}>
        <img style={{marginLeft:"10%"}} src={require(`../image/${ImageUser}`)} alt="" className="topbarImg"/>
        </Link>
         </div>
      </div>
    </div>
  );
}
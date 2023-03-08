import "./sidebar.css";

import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill,BsFillPersonFill} from 'react-icons/bs';
import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
import { Link,NavLink } from "react-router-dom";
// import { BiGroup,BiCalendarEvent, BiFontSize } from 'react-icons/bi';
// import { BsFillPlusCircleFill } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';
import { IoMdSchool } from 'react-icons/io';
import { useState , useEffect } from 'react';
import { Users } from "../../dummyData/dummyData";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { TbLogout} from 'react-icons/tb';
import { MdOutlineGroups} from 'react-icons/md';
import { HiOutlineHome} from 'react-icons/hi';





export default function Sidebar(props) {

  const current_ID = JSON.parse(localStorage.getItem('id'));
  const [groups , setGroups] = useState([]);

  const [myAcceptrdGroups , setMyAcceptrdGroups] = useState([]);


  useEffect(()=>{
    getGroups();
    getMyAcceptrdGroups();
    console.log(props.check);
} , [props.check])

function getGroups(){
  axios.get(`http://localhost:80/frontend/back_end/groups.php/`)
  .then(response => {
      console.log(response.data)
      setGroups(response.data);
  })
}

const getMyAcceptrdGroups = () => {

  axios.get(`http://localhost:80/frontend/back_end/getMyGroupAcceptedStatus.php/${current_ID}`)
  .then(response => {
      console.log(response.data)
      setMyAcceptrdGroups(response.data);
  })

}
const handleLogOut = () => {
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('id');
  window.localStorage.removeItem('name');
  window.localStorage.removeItem('image');
  window.location.pathname = "/";
 
}

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HiOutlineHome size={20} className="sidebarIcon" />
            <NavLink to="/home" className="sidebarListItemText">Home</NavLink>
          </li>
          <li className="sidebarListItem">
          <BsFillPersonFill size={20} className="sidebarIcon" />
            <NavLink to={`/profile/${current_ID}`} className="sidebarListItemText">Profile</NavLink>
          </li>
          <li className="sidebarListItem">
            <MdOutlineGroups size={20} className="sidebarIcon" />
            <NavLink to="/Allgroups" className="sidebarListItemText">Groups</NavLink>
          </li>
          <li className="sidebarListItem">
            <BiGroup size={20} className="sidebarIcon" />
            <NavLink to="/Allusers" className="sidebarListItemText">Users</NavLink>
          </li>
          <li className="sidebarListItem">
            <TbLogout size={20} className="sidebarIcon" />
            <NavLink to="/logout" className="sidebarListItemText" onClick={handleLogOut}>Logout</NavLink>
          </li>   

          {/* <li className="sidebarListItem">
            <BsFillPersonFill className="sidebarIcon" />
            <span className="sidebarListItemText">Freinds</span>
          </li> */}

        </ul>
       
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList" >
          <h5 >My Groups</h5>
          { groups.filter(function(ele) {
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../image/${element.group_image}`)} alt="" />
                      <a href={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </a>
                    </li>
           )})}

<hr className="sidebarHr" />

        <h5 >Groups</h5>

          { myAcceptrdGroups.filter(function(ele) {
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../image/${element.group_image}`)} alt="" />
                      <a href={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </a>
                    </li>
           )})}
        </ul>
      </div>
      
    </div>
  );
}


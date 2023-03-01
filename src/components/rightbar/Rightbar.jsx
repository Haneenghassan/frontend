import "./rightbar.css";
import { Users } from "../../dummyData/dummyData";
import Online from "../online/Online";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function Rightbar({ profile }) {
// 

const {profile_id} = useParams();

const current_ID = JSON.parse(localStorage.getItem('id'));
const current_Email = localStorage.getItem('email');

const [inputs , setInputs] = useState("")
const [users , setUsers] = useState([]);
const [usersData , setDataUsers] = useState([]);



useEffect(()=>{
    getUsers();
    getDataUsers();
} , [])


function getUsers(){
    axios.get(`http://localhost:80/frontend/back_end/getAllFriendsUser.php/${profile_id}`)
    .then(response => {
      console.log(response.data);
        setUsers(response.data);
    })
  }
  
  const getDataUsers = () => {

    axios.get(`http://localhost:80/frontend/back_end/user.php/users/${current_ID}`)
    .then((respone)=>{
      setDataUsers(respone.data[0])
        console.log(respone.data[0]);
    })
}
  var i = 1;








// 
  const id = JSON.parse(localStorage.getItem('id'));
    const [acceptrdFriends,setAcceptedFriends] = useState([]);
    const [friends,setfriends] = useState([]);


    useEffect(()=>{
      getFriendsAccepted();
  },[]);
    //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    
    const getFriendsAccepted = () => {

      axios.get(`http://localhost:80/frontend/back_end/friends.php/${id}`)
      .then((respone)=>{
          console.log(respone.data);
          let friends = respone.data.map((ele)=>{
              return ele.friend_id
          })
          console.log(friends);
          setfriends(friends);
          setAcceptedFriends(respone.data)
      })
  }

  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          {/* <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span> */}
        </div>
        <img className="rightbarAd" src={require("../../components/image/Connected world-bro.png")} alt="" style={{margin:"0"}} />
        <h4 className="rightbarTitle">Friends</h4>
          <hr className="sidebarHr" />
        <ul className="rightbarFriendList">
        {acceptrdFriends.map((ele,index)=>{
            return(
            <a href={`/UserProfile/${ele.friend_id}/show`} key={index}>
            <li className="rightbarFriend" key={index}>

              <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={require(`../image/${ele.image}`)} alt="" />
                <span className="rightbarOnline"></span>
              </div>
              <span className="rightbarUsername">{ele.name}</span>
            </li>
              </a>
            )})}
        </ul>

      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {/* <button class="button" style="vertical-align:middle"><span>Hover </span></button> */}
         <h4 className='rightbarTitle'>User information <a href={`/profile/${profile_id}/edit`}><button class="button" style={{verticalAlign:"middle"}}><span>Edit </span></button></a>
         
         </h4>
                <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">email:</span>
                  <span className="rightbarInfoValue">{usersData.email}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Phone:</span>
                  <span className="rightbarInfoValue">{usersData.phone}</span>
                </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User friends</h4>
                <div className="rightbarFollowings" >
                    {acceptrdFriends.map((ele,index)=>{
                               if(ele.friend_id === current_ID){
                                return <a href={`/profile/${ele.friend_id}`} key={index}>
                                <div className="rightbarFollowing">
                                    <img src={require(`../image/${ele.image}`)} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingname">{ele.name}</span>
                                </div>
                            </a>      
                            }
                            else {
                                return <a href={`/UserProfile/${ele.friend_id}/show`} key={index}>
                                <div className="rightbarFollowing">
                                    <img src={require(`../image/${ele.image}`)} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingname">{ele.name}</span>
                                </div>
                            </a>
                            }

                                
                                })}

                </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
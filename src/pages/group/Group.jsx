import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feedGroups/Feed";
import Rightbargroup from "../../components/rightbargroup/Rightbargroup";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  useParams} from "react-router-dom";
import "./group.css";

export default function Group() {

  const {id} =useParams();
  const current_ID = JSON.parse(localStorage.getItem('id'));






  const [groups , setGroups] = useState([]);
  const [allGroups , setDataGroups] = useState([]);
  const [usersGroups , setUserGroups] = useState([]);
  const [pendingRequestGroups , setPendingRequestGroups] = useState([]);

  const [myAcceptedGroups , setMyAcceptrdGroups] = useState([]);


  const [pendingMembers,setPendingMembers] = useState([]);
  const [acceptedMembers,setAcceptedMembers] = useState([]);


  useEffect(()=>{
    getDataGroups();
    getUsersGroup();
    getPendingRequest();
    getMyAcceptrdGroups();
    getGroups();
    getPendingMempers();
    getAcceptedMempers();

   
    
} , [])

const getMyAcceptrdGroups = () => {

  axios.get(`http://localhost:80/frontend/back_end/getMyGroupAcceptedStatus.php/${current_ID}`)
  .then(response => {
      console.log(response.data)
      let myAcceptedGroups = response.data.map((ele)=>{
        return ele.group_id
    })
    console.log(myAcceptedGroups);
    console.log(id);
    console.log(myAcceptedGroups.hasOwnProperty(id));
    console.log(myAcceptedGroups.includes(id));
      setMyAcceptrdGroups(myAcceptedGroups);
  })

}
const getDataGroups = () => {

  axios.get(`http://localhost:80/frontend/back_end/getDataGroups.php/${id}`)
  .then(response => {
      console.log(response.data)
      setGroups(response.data);
  })
}
// لعرض  اعضاء الجروب
const getUsersGroup = () => {

  axios.get(`http://localhost:80/frontend/back_end/getUsersGroup.php/${id}`)
  .then(response => {
      console.log(response.data)
      setUserGroups(response.data);
  })

}

const getPendingRequest = () => {
  axios.get(`http://localhost:80/frontend/back_end/getPendingRequestForGroup.php/${id}`)
  .then((respone)=>{
      console.log(respone.data);
    
      setPendingRequestGroups(respone.data);
      // setPendingMempers(respone.data)
  })
}

// لحذف عضو من الجروب
const deleteFromGroup = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/frontend/back_end/deleteRequestForGroup.php`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })

}

// لحذف طلب الانظمام لل الجروب
const deleteRequest = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/frontend/back_end/deleteRequestForGroup.php`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })

}
//  لقبول طلب الانظمام لل الجروب
const acceptRequest = (userId) => {

  let inputs = {user_id:userId , group_id:id};
  axios.put(`http://localhost:80/frontend/back_end/membersGroup.php`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getDataGroups();
      getUsersGroup();
      getPendingRequest();
      
  })
}

// /////////////////////////////////
// لعرض كل الجروبات في الموقع

function getGroups(){
  axios.get(`http://localhost:80/frontend/back_end/groups.php/`)
  .then(response => {
      console.log(response.data)
      setDataGroups(response.data);
      
  })
}


// لاضافة عضو لجروب معين
const AddToGroup = (groupId) => {
  let inputs = {user_id:current_ID , group_id:groupId};
  axios.post(`http://localhost:80/frontend/back_end/membersGroup.php/save`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getPendingMempers();
      
            // getFriendsRequest();
  })
}
     //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
    const getPendingMempers = () => {

        axios.get(`http://localhost:80/frontend/back_end/getPendingMember.php/${current_ID}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingMembers = respone.data.map((ele)=>{
                return ele.group_id
            })
            console.log(pendingMembers);
            setPendingMembers(pendingMembers);
            // setPendingMempers(respone.data)
        })
    }

         //للجروبات accepted لعرض كل طلبات المستخدم اللي حالتهم 
         const getAcceptedMempers = () => {

          axios.get(`http://localhost:80/frontend/back_end/getAcceptedMember.php/${current_ID}`)
          .then((respone)=>{
              console.log(respone.data);
              let acceptedMembers = respone.data.map((ele)=>{
                  return ele.group_id
              })
              console.log(acceptedMembers);
              setAcceptedMembers(acceptedMembers);
              // setPendingMempers(respone.data)
          })
      }

  // لحذب طلب الاضافة 
    const removeRequest = (GroupId) => {
      let inputs = {user_id:current_ID , group_id:GroupId};
      axios.put(`http://localhost:80/frontend/back_end/getPendingMember.php/edit`,inputs)
      .then((respone)=>{
          console.log(respone.data);
          getUsersGroup();
          getPendingRequest();
          getMyAcceptrdGroups();
          getGroups();
          getPendingMempers();
          getAcceptedMempers();
      })

    }

    // delete group

    const  deleteGroup = (id) => {
      axios.delete(`http://localhost:80/react_project/back_end/groups.php/${id}`).then(function(response){
        window.location.assign('/home')
      })
    }





// ///////////////////////////////////////
let flag = false;
  return (
    <>
    {groups.map((groups,index)=>{

  return <div key={index}>


{myAcceptedGroups.map((ele)=>{
                    if (ele == id) {
                      flag=true;
                      console.log(true);
                    }
                })}   
                
                   <Topbar />
      <div className="groupContainer">
        <Sidebar />
        <div className="groupRight">
          <div className="groupRightTop">
            <div className="groupCover">
              <img
                className="groupCoverImg"
                src={groups && groups.group_image ?require(`../../components/image/${groups.group_image}`) : "assets/ad.png"}
 
                alt="cvccv"
              />
            
            </div>
            <div className="groupInfo">
            <h4 className="groupInfoName"> {groups.group_name}</h4>
            {(() => {
              if (!(groups.user_id == current_ID)){
                            if (pendingMembers.includes(groups.group_id) || acceptedMembers.includes(groups.group_id) ){
                                if(pendingMembers.includes(groups.group_id)){
                                  return ( 
                                    <Link>
                                        <Button variant="primary" className="groupInfoDesc" onClick={()=>removeRequest(groups.group_id)} style={{width:"150px",marginLeft:"0"}}>remove request</Button>
                                    </Link>
                              )

                                }
                                if(acceptedMembers.includes(groups.group_id)){
                                    return (

                                        <Link to={`/groups/${groups.group_id}/show`}>
                                            <Button variant="danger" className="groupInfoDesc" onClick={()=>removeRequest(groups.group_id)} style={{width:"150px",marginLeft:"0"}}>delete group</Button>
                                        </Link>


                                    
                                    )

                                }
                              
                             
                            }else{
                              return ( 
                  
                                <Link>
                                    <Button className="groupInfoDesc" variant="success" onClick={()=>AddToGroup(groups.group_id)} style={{width:"125px",marginLeft:"0"}}>Join Group</Button>
                                </Link>
                            
                              )
                          }}
                            
                          
              
            })()}
            {/* <Button className="groupInfoDesc" variant="success">Join Group</Button>   */}
            </div>
          </div>
          <div className="groupRightBottom">


            {/*  */}
          {/* {(() => {
                  if (myAcceptedGroups.includes(id)){
                  
                    
                    <Feed group_id={id} admin_group={groups.user_id}/> 

                    
                  }else{
                    return ( 
                      <div className="feed">
                      <div className="feedWrapper">
                
                      </div> 
                    </div> 
                    )
                }
              
            })()} */}
              

            {/*  */}
          {flag || groups.user_id === current_ID ? 
          <Feed group_id={id} admin_group={groups.user_id}/> 
          :   
          <div className="feed">
            <div className="feedWrapper">
      
            </div> 
          </div> 
          }
        
            <div className="rightbar">
                <div className="rightbarWrapper">
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                  <h4 className="rightbarTitle">Admin</h4>
                  <ul className="rightbarFriendList">

                            <li className="sidebarFriend">

                                      <img className="sidebarFriendImg" src={groups && groups.image ? require(`../../components/image/${groups.image}`) : "https://www.example.com/example.png"} alt="vcc" />

                              
                              <span className="sidebarFriendName">{groups.name}</span>
                            </li>
                        




                  </ul>
              </div>
              <hr className="sidebarHr" />
              
            { groups.user_id === current_ID ? <div className="rightbarWrapper">
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                  <h4 className="rightbarTitle">Request Members ({pendingRequestGroups.length})</h4>
                  <ul className="rightbarFriendList">

                  { pendingRequestGroups.map((element,index) => {
                          return (
                            <li className="sidebarFriend" key={index}>
                              <img className="sidebarFriendImg" src={require(`../../components/image/${element.image}`)} alt="" />
                              <span className="sidebarFriendName">{element.name}</span>
                              
                                <Button style={{ marginLeft: "8% " ,border:"none",backgroundColor:"#23c483"}} onClick={() => {acceptRequest(element.user_id)}} >Accept</Button>
                           
                                <Button style={{ marginLeft: "3% "}} variant="danger" onClick={() => {deleteRequest(element.user_id)}} >Delete</Button>
                        
                            </li>
                               )  })}




                  </ul>
                  <hr className="sidebarHr" />
              </div>
               : "" }
                <div className="rightbarWrapper">
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                  <h4 className="rightbarTitle">Members ({usersGroups.length})</h4>
                  <ul className="rightbarFriendList">

                  { usersGroups.map((element,index) => {
                          return (
                            <li className="sidebarFriend" key={index}>
                              <img className="sidebarFriendImg" src={require(`../../components/image/${element.image}`)} alt="" />
                              <span className="sidebarFriendName">{element.name}</span>
                              { groups.user_id === current_ID ?
                                 
                                        <Button style={{ marginLeft: "5% "}} variant="danger" onClick={() => {deleteFromGroup(element.user_id)}} >Remove Member</Button>
                            
                                : "" }
                            </li>
                               )  })}




                  </ul>
              </div>
              <hr className="sidebarHr" />

{groups.user_id === current_ID ?
                <div className="rightbarWrapper">
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                  <h4 className="rightbarTitle">Delete Group </h4>
                  <ul className="rightbarFriendList">
                            <Link>
                                <Button variant="danger" onClick={() => {deleteGroup(groups.group_id)}} >Delete Group</Button>
                            </Link>
                  </ul>
              </div>
                            : "" }
           
            </div>
      </div>
      </div>
        </div>
        </div>
        })}
    </>
  );
}
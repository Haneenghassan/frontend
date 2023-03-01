import { useState } from "react";
import "./register.css";
import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import  { Component } from 'react';
import axios from "axios";


const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const checkPass=RegExp(/^^[A-Za-z]\w{8,31}$/);

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
 class Register  extends Component {
 
  constructor() {
    super();
      this.state = {
        name: null,
        email: null,
        password: null,
        phone: null,
        repassword: null,
        test:"",
        accept:false,
        users:[],
        errors: {
          name: '',
          email: '',
          phone: '',
          password: '',
          repassword: '',
        }
      };
    
    }
    componentDidMount = () =>{
      axios.get("http://localhost:80/frontend/back_end/user.php/users/")
      .then((respone)=>{
        let email = respone.data.map((ele) => {
              return ele.email
        })
        console.log(email);
          this.setState({
              users:email
          })
          // setUsers(respone.data)
          console.log(respone.data);
      })
  }
    handleChange = (event) => {
    
      // event.preventDefault();
      const { name, value } = event.target;
      console.log(event.target,"event");
//         let name = event.target.name;
// let value = event.target.value;
      let errors = this.state.errors;
      switch (name) {
        case 'name': 
          errors.name = 
            value.length < 5
              ? 'name must be 5 characters long!'
              : '';
          break;
          case 'email': 
          errors.email = 
          !validEmailRegex.test(value)
          ? 'Email is not valid!'
          : this.state.users.includes(value) 
          ? 'Email is already has been taken'
          : '' ; 
          break;
          case 'phone': 
            errors.phone = 
              value.length !== 10
                ? 'Phone must be 10 characters !'
                : '';
            break;
        case 'password': 
        this.setState({
          test:value
        })
        errors.password = 
        checkPass.test(value)
        
        // value.length < 8 

        ? ''
        : 'Password must be 8 characters long!';
        break;
        case 'repassword': 
        console.log(this.state.test);
          errors.repassword = 
            value !== this.state.test
              ? 'Confirm Password not match!'
              : '';
          break;
        default:
          break;
      }
    
      this.setState({errors, [name]: value}, ()=> {
          console.log(errors);
      })
    }
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
          accept:true,

      })
      const { name, email,password,phone } = this.state;

// 
      let errors = this.state.errors;
      if(name === null){
          errors.name =  'Name is required'
      }
      if(email=== null){
          errors.email =  'email is required'
      }
      if(phone=== null){
          errors.phone =  'phone is required'
      }
      if(password === null){
          errors.password =  'password is required'
      }

      this.setState({errors}, ()=> {
          console.log(errors)
      })
// 
      if(validateForm(this.state.errors)) {
        console.info('Valid Form')
        // let newUser ={fullName:this.state.fullName,email:this.state.email,password:this.state.password}
        // this.users.push(newUser);
        let inputs = {name:this.state.name,email:this.state.email,phone:this.state.phone,password:this.state.password}
        console.log(inputs);
        axios.post("http://localhost:80/frontend/back_end/user.php/save",inputs)
        .then((respone)=>{
            console.log(respone.data);
            console.log(true);
            window.location.assign('/')
        })


        // localStorage.setItem('users',JSON.stringify(this.users))
      }else{
        console.error('Invalid Form')
      }
      console.log( this.users);
    

    }
  render() {
    const {errors} = this.state;
  return (
<>
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">
            
          <img style={{ width:"100%"}} src={require(`../../components/image/weshare green.png`)}/>

          </h3>
          <span className="loginDesc">
          Think openly , explore new worlds and meet and reach out to friends on WE SHARE .
          </span>
        </div>
         
        <div className="loginRight">
        <form onSubmit={this.handleSubmit} noValidate >
          <div className="loginBox">
        <InputGroup className="mb-3">
            <FloatingLabel  label="name">
            <Form.Control type="text" name="name" onChange={this.handleChange}  aria-label="name" placeholder="name" noValidate/>
            {errors.name.length > 0 && this.state.accept && <span className='error'>{errors.name}</span>}
            </FloatingLabel>  
        </InputGroup>
        <InputGroup className="mb-3">
            <FloatingLabel  label="Email">
            <Form.Control type='email' name='email' onChange={this.handleChange}  aria-label="email" placeholder="email" noValidate/>
            {errors.email.length > 0 && this.state.accept &&  <span className='error'>{errors.email}</span>}
            </FloatingLabel>  
        </InputGroup>
           <FloatingLabel controlId="floatingPhone" label="phone">
            <Form.Control  type='number' name='phone' onChange={this.handleChange}  aria-label="Phone" placeholder="Last name" noValidate/> 
            {errors.phone.length > 0 && this.state.accept &&  <span className='error'>{errors.phone}</span>}
            </FloatingLabel>
        <InputGroup className="mb-3">
            <FloatingLabel  label="Password">
            <Form.Control type='password' name='password' onChange={this.handleChange}  aria-label="password" placeholder="password" noValidate/>
            {errors.password.length > 0 && this.state.accept && <span className='error'>{errors.password}</span>}
            </FloatingLabel>  
        </InputGroup>
        <InputGroup className="mb-3">
            <FloatingLabel  label="Confirm Password">
            <Form.Control type='password' name='repassword' onChange={this.handleChange}  aria-label="confirmpassword" placeholder="confirmpassword" noValidate/>
            {errors.repassword.length > 0 && this.state.accept && <span className='error'>{errors.repassword}</span>}
            </FloatingLabel>  
        </InputGroup>
            <button className="loginButton">Sign Up</button>
           
            <button href='/login' className="loginRegisterButton">
            <a href="/" style={{textDecoration:"none",color:"white",marginTop:"-2%"}}>Log into Account</a>
            </button>
          </div>
          </form>
        </div>
      </div>
      
    </div>
    </>
 
  );
}
}
export default Register;
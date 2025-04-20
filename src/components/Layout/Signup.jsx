import React,{useRef} from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import {ToastContainer,toast} from "react-toastify"
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {auth,db} from "./firebase"
// import {setDoc,doc} from "firebase/firestore" 


export default function Signup() {
  const [InputValue, setInputValue] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  let firstNameRef=useRef(null)
  let lastNameRef=useRef(null)
  let emailRef=useRef(null)
  let passwordRef=useRef(null)
  let confirmPasswordRef=useRef(null) 

  function inputStateChange(event) {
    setInputValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  async function handleRegister(e){
  e.preventDefault()
  // console.log(InputValue.email, InputValue.password)
 
  let namePattern=/[\d$#^&*()!]/
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


   function greenShadow(field){
      field.current.classList.add("shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]")
      field.current.classList.remove("shadow-[0px_0px_1.5px_1.5px_rgba(255,0,0,0.5)]")
   }
   function redShadow(field){
      field.current.classList.add("shadow-[0px_0px_1.5px_1.5px_rgba(255,0,0,0.5)]")
      field.current.classList.remove("shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]")
   }
   function removeShadow(field){
    field.current.classList.remove("shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]")
   }
    let statusFlag={
      firstname:false,
      lastname:false,
      email:false,
      password:false,
      confirmpassword:false
    }
  if(InputValue.firstname==="" || namePattern.test(InputValue.firstname) ){
     redShadow(firstNameRef)
  }
  else {
    greenShadow(firstNameRef)
     statusFlag.firstname=true
  }
  if( InputValue.lastname==="" || namePattern.test(InputValue.lastname)){
   redShadow(lastNameRef)
  }
  else{
    greenShadow(lastNameRef)
    statusFlag.lastname=true
  }
  if(InputValue.email!=="" && emailPattern.test(InputValue.email)){
    greenShadow(emailRef)
    statusFlag.email=true
  }
  else{
    redShadow(emailRef)
  }
  if(InputValue.password==="" || InputValue.password.length<6 || InputValue.password!==InputValue.confirmpassword){
    redShadow(passwordRef)
    redShadow(confirmPasswordRef)
  }
  else{
    greenShadow(passwordRef)
    greenShadow(confirmPasswordRef)
    statusFlag.password=true
    statusFlag.confirmpassword=true
  }

// console.log(status.firstName,status.lastName,status.email,status.password,status.confirmPassword)
if (
  statusFlag.firstname &&
  statusFlag.lastname &&
  statusFlag.email &&
  statusFlag.password &&
  statusFlag.confirmpassword
) {
  console.log(InputValue)
  axios.post('http://localhost:5000/signup',InputValue)
  .then((response)=>{
    // console.log(response)
    // console.log(response.data.message)
    toast(response.data.message)
    setInputValue(()=>{
      return {
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmpassword:""
      }
    })
      
    
  })
  .catch((err)=>{
    // console.log(err)
    // console.log(err.response)
    toast.error(`Failed: ${err.response.data.error}`)
  })
}
else{
      // console.error("error occured")
      toast.error("All fields must be valid")
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgb(202_202_202)] border border-[rgb(202_202_202)] rounded-xl w-100 h-auto">
      <div className="inline-flex flex-col px-8 py-5 radius-xl w-100  ">
        <form onSubmit={handleRegister} noValidate>
          <div>
            <h3 className="text-xl">Create New Account</h3>
            <input
              type="text"
              name="firstname"
              value={InputValue.firstname}
              onChange={inputStateChange}
              placeholder="First Name"
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
              ref={firstNameRef}
            />
          </div>

          <div>
            {/* <h3>Last Name</h3> */}
            <input
              type="text"
              name="lastname"
              value={InputValue.lastname}
              onChange={inputStateChange}
              placeholder="Last Name"
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
              ref={lastNameRef}
            />
          </div>

          <div>
            {/* <h3>Email</h3> */}
            <input
              type="email"
              name="email"
              value={InputValue.email}
              onChange={inputStateChange}
              placeholder="Email"
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
              ref={emailRef}
            />
          </div>

          <div>
            {/* <h3>Password</h3> */}
            <input
              type="password"
              name="password"
              value={InputValue.password}
              onChange={inputStateChange}
              placeholder="Password"
              autoComplete="off"
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
              ref={passwordRef}
            />
          </div>

          <div>
            {/* <h3>Confirm Password</h3> */}
            <input
              type="password"
              name="confirmpassword"
              value={InputValue.confirmpassword}
              onChange={inputStateChange}
              placeholder="Confirm Password"
              autoComplete="off"
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
              ref={confirmPasswordRef}
            />
          </div>

          <div>
            <button type="submit" className="bg-white mt-5 p-3 w-full rounded-lg font-bold cursor-pointer">Create Now</button>
          </div>
          {/* <div> */}
           
          {/* </div> */}
        </form>
        <Link to="/login" className="mt-3 text-blue-700 hover:underline transition duration-200 ease-in">Already have an account?</Link>
        <ToastContainer position="top-center" autoClose={500}/>
      </div>
    </div>
  );
}

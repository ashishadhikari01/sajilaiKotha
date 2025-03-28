import React, { useState, useRef } from "react";
import { Link,useNavigate } from "react-router-dom";
import {auth} from "./firebase"
import {toast,ToastContainer} from "react-toastify"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  let [Data, setData] = useState({ email: "", password: "" });
  function inputHandle(event) {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
    
    let navigateToSystem=useNavigate()
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  function greenShadow(field) {
    field.current.classList.add(
      "shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]"
    );
    field.current.classList.remove(
      "shadow-[0px_0px_1.5px_1.5px_rgba(255,0,0,0.5)]"
    );
  }
  function redShadow(field) {
    field.current.classList.add(
      "shadow-[0px_0px_1.5px_1.5px_rgba(255,0,0,0.5)]"
    );
    field.current.classList.remove(
      "shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]"
    );
  }
  function removeShadow(field) {
    field.current.classList.remove(
      "shadow-[0px_0px_1.5px_1.5px_rgba(0,255,0,0.5)]"
    );
  }

  let statusFlag = {
    email: false,
    password: false,
  };
  let emailRef = useRef(null);
  let passwordRef = useRef(null);

  function handleLogin(e) {
    e.preventDefault();
    if (Data.email !== "" && emailPattern.test(Data.email)) {
      greenShadow(emailRef);
      statusFlag.email = true;
    } else {
      redShadow(emailRef);
    }
    if (Data.password !== "" && Data.password.length >= 6) {
      greenShadow(passwordRef);
      statusFlag.password = true;
    } else {
      redShadow(passwordRef);
    }

    if(statusFlag.email && statusFlag.password){
        signInWithEmailAndPassword(auth,Data.email, Data.password)
        .then(()=>{
            toast.success("Signed In")
            setData(()=>{
                return {
                    email:"",
                    password:""
                }
            })
            removeShadow(emailRef)
            removeShadow(passwordRef)
        setTimeout(()=>{
          navigateToSystem("/tenant")
        },1000)
        })
        
        .catch((err)=>{
            toast.error(err.message)
        })
    }
  }

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgb(202_202_202)] border border-[rgb(202_202_202)] rounded-xl w-100 h-auto ">
      <div className="inline-flex flex-col px-10 py-13 radius-xl w-100">
        <form onSubmit={handleLogin} noValidate>
          <h3 className="text-xl">Get into sajilai kotha</h3>
          <div>
            <input
              type="text"
              placeholder="Email"
              onChange={inputHandle}
              name="email"
              value={Data.email}
              ref={emailRef}
              className="bg-white p-2 w-full mt-3 rounded-lg border border-[#C0C0C0] focus:outline-none "
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={inputHandle}
              name="password"
              value={Data.password}
              ref={passwordRef}
              autoComplete="off"
              className="bg-white p-2 w-full mt-4 rounded-lg border border-[#C0C0C0] focus:outline-none"
            />
            {/* <span><img src="/icons8-eye-30.png" className=""/> </span> */}
          </div>
          <div>
            <button className="bg-white mt-5 p-3 w-full rounded-lg font-bold cursor-pointer :active scale(0.98)">
              Log In
            </button>
          </div>
        </form>
        <Link
          to="/signup"
          className="mt-3 text-blue-700 hover:underline transition duration-200 ease-in"
        >
          Wanna create new acccount?
        </Link>
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    </div>
  );
}

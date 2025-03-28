import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

export default function Navbar() {
  let entryExpandRef = React.useRef("");
  let navBarRef = React.useRef("");
  function entrybtnClicked() {
    entryExpandRef.current.classList.toggle("show");
  }

  return (
    <div className="navbar" ref={navBarRef}>
      <nav>
        <h1>Sajilai Kotha</h1>
        <div className="entry-outline">
          <a onClick={entrybtnClicked}>
            <img
              src="./icons8-login-100.png"
              alt="login/signup"
              width="40px"
              height="40px"
            />
          </a>
        </div>
      </nav>
      <div className="entry-expand" ref={entryExpandRef}>
        <div className="entry-expand-outline">
          <BrowserRouter>
            <div className="entry-options">
              {/* <a><p>Log In</p></a> */}
              <Link to="/login" className="links">
                Log In
              </Link>
            </div>
            <div className="entry-options">
              {/* <a><p>Sign Up</p></a> */}
              <Link to="/signup" className="links">
                Sign Up
              </Link>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

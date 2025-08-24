import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  let entryExpandRef = React.useRef("");
  let navBarRef = React.useRef("");
  const [isEntryOpen, setIsEntryOpen]=React.useState(false)
  function entrybtnClicked() {
    entryExpandRef.current.classList.toggle("hidden");
  }
  return (
    <>
      <div className="h-20 bg-gray-300" ref={navBarRef}>
        <nav className="w-[90%] mx-auto flex justify-between items-center h-full">
          <Link className="text-2xl font-bold" to="/">Sajilai Kotha</Link>
          <div className="border border-[#C0C0C0] w-14 h-10 bg-white rounded-lg hover:shadow-[0.5px_0.5px_5px_2px_black] ">
            <a
              onClick={entrybtnClicked}
              className="flex justify-center items-center h-full"
            >
              <img
                src="./icons8-login-100.png"
                alt="login/signup"
                width="40px"
                height="40px"
              />
            </a>
          </div>
        </nav>
      </div>

      <div className="mt-3 flex justify-end absolute right-15 top-20 bg-gray-300 rounded-lg shadow-[0px_0px_2px_0.5px_rgb(55, 55, 55)]  hidden" ref={entryExpandRef}>
        <div className="flex flex-col justify-center gap-3 w-50 h-auto font-bold py-1 text-lg">
          <Link to="/" className="px-5 no-underline hover:bg-[#f5f5f5]" onClick={entrybtnClicked}>
            Home
          </Link>
          <Link to="/login" className="px-5 no-underline hover:bg-[#f5f5f5]" onClick={entrybtnClicked}>
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-5 no-underline hover:bg-[#f5f5f5]"
            onClick={entrybtnClicked}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

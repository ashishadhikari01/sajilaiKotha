import React from "react";

export default function Home() {
  const message = [
    "Hello there!",
    "Hii there!",
    "What's up?",
    "How everything?",
    "Good to see you",
    "Namaste",
    "Hola!",
    "I hope you are doing well",
  ];
  const randomNum = Math.floor(Math.random() * 8);
  return (
    <>
      <div className="max-h-screen">
        <div className="flex">
          <div className=" flex-2">
            <p className="mt-1 pt-8 w-[80%] mx-auto text-5xl font-semibold italic">
              {message[randomNum]}
            </p>
            <p className="mt-3 w-[75%] mx-auto text-2xl font-semibold italic opacity-0 animate-[fadeIn_1s_ease-out_forwards] [animation-delay:0.3s]">
              Say goodbye to rental stress — and hello to your new home
            </p>
          </div>
          <div className="flex-1 bg-gray-100 pl-3 pt-3 rounded-l-xl">
            <img
              src="./goodspace.jpg"
              width={500}
              height={100}
              className="rounded-l-xl"
            />
          </div>
        </div>

        <div className="w-[100%] mx-auto p-5 flex gap-x-10  bg-gray-100">
          <div className="">
            <p className="text-3xl font-semibold animate-fadeIn pl-6">
              What we offer?
            </p>

            <ul className="mt-3 list-disc pl-15 text-2xl italic">
              <li
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "0.5s",
                  animationFillMode: "forwards",
                }}
              >
                A seamless role switch between tenant and landlord
              </li>
              <li
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "0.7s",
                  animationFillMode: "forwards",
                }}
              >
                Advance nearby search implemented based on user realtime
                location
              </li>
              <li
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "0.9s",
                  animationFillMode: "forwards",
                }}
              >
                Smart filtering based on space type and price range
              </li>
              <li
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "1.1s",
                  animationFillMode: "forwards",
                }}
              >
                Abundance space detail along with watchlist feature
              </li>
              <li
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: "1.3s",
                  animationFillMode: "forwards",
                }}
              >
                Effortlessly list, update, and manage spaces with premium access
                to tenant details
              </li>
            </ul>
          </div>
        </div>
        {/* footer area */}
        <div className="mt-10 flex justify-center gap-x-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl flex items-center justify-center 
                    animate-pop"
            >
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/color/48/facebook-new.png"
                alt="facebook-new"
              />
            </div>
          </a>

          <a
            href="https://www.youtube.com/@NirantarKhabardari"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl flex items-center justify-center 
                    animate-pop"
            >
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/color/48/youtube-play.png"
                alt="youtube-play"
              />
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/ashishadhikari11/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-xl flex items-center justify-center 
                    animate-pop"
            >
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="linkedin"
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

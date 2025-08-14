import React, { useEffect, useRef, useState} from "react";
import axios from "axios"
import { useNavigate } from "react-router";

export default function TenantAccount(){
        const [userData, setUserData] = React.useState({
            view: true,
            edit: false,
            obtainedInfo:{
              _id:null,
              firstname:null,
              lastname:null,
              email:null
            },
            updatedData:{
            firstName: "",
            lastName: ""
             },
            
            oldPassword:"",
            newPassword:"",

            deletionData:{
                email:"",
                password:""
            }
          });
          console.log(userData)
          console.log(userData.oldPassword, userData.newPassword)
        
          const [image, setImage] = useState("/icons8-user-96.png");
        
          let userDataRef = {
            firstNameRef: useRef(null),
            lastNameRef: useRef(null),
          };
          // const [isPasswordVisible, setIsPasswordVisible] = useState(false);
          function handleEdit() {
            setUserData((prev) => {
              return {
                ...prev,  // keep only existing field only
                view: false,
                edit: true,
                firstnam:prev.obtainedInfo.firstname,
                lastname:prev.obtainedInfo.lastname 
              };
            });
          }
        
          useEffect(() => {
            userDataRef.firstNameRef.current.classList.add("bg-blue-100");
            userDataRef.lastNameRef.current.classList.add("bg-blue-100");
          }, [userData.edit]);
        
          function handleUserData(event) {
            setUserData((prev) => {
              const {name, value}=event.target
              return {
                ...prev,
                [name]: value,
                updatedData:{
                  ...prev.updatedData,
                  [name]:value
                },
                deletionData:{
                    ...prev.deletionData,
                     [name]:value
                }
              };
            });
          }
        //   console.log(userData);
        //   console.log(handleUserData.deletionData)
        
          function handleSave() {
            
            axios.put('http://localhost:5000/profile/update', userData.updatedData)
              .then(()=>{
                console.log('updated sucessfully')
                window.location.reload()
              })
              .catch((err)=>console.error('error on updating:', err.message))
            setUserData((prev) => {
              return {
                ...prev,
                view: true,
                edit: false,
              };
              
            });
          }
        
          const fileInputRef =
            useRef(null); /* fileInputRef takes reference of the <input/> */
          function fileRefGet() {
            fileInputRef.current.click();
            // when <p></P> get clicked actually the reference of the input get clicked and does what input intended to do.
          }
        
          function handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
              const imgUrl = URL.createObjectURL(file);
              // setImage(imgUrl);
            }
            const formData=new FormData()
            formData.append('profilePic',file)
            axios.post('http://localhost:5000/profile/updateProfilePic',formData)
            .then((res)=>{
              window.location.reload()
              console.log('image send',res)
            })
            .catch((err)=>console.log('err on sending',err))
          }
          // console.log(image)
          useEffect(()=>{
             axios.get('http://localhost:5000/profile/pic')
             .then((res)=>{
              console.log('image obtained',res)
              setImage(res.data.userProfile)
            })
             .catch((err)=>console.log('err on image fetch',err))
          },[handleFileChange])

          // axios.get('http://localhost:5000/profile/')
        //   let errMsgRef=useRef(null)
        const [msg, setMsg]=useState({errMsg:"",sucMsg:""})
          function handleUpdatePassword() {
            console.log("update");
            axios.put('http://localhost:5000/profile/updatepassword',{
                oldPassword:userData.oldPassword,
                newPassword:userData.newPassword
            })
            .then((res)=>{
                setUserData((prev)=>{
                    return {
                        ...prev,
                        oldPassword:"",
                        newPassword:""
                    }
                })
                console.log(res)
                setMsg((prev)=>{
                    return{
                        ...prev,
                        sucMsg:res.data
                    }
                })
                console.log('Sucess:',res.data)
            })
            .catch((err)=>{
                setMsg((prev)=>{
                   return {...prev,
                   errMsg:err.response.data
                   }
                })
                console.log('Error:',err.response.data)
                // console.log(errMsg)
            })  
          }
        
          useEffect(()=>{
           if(msg.errMsg || msg.sucMsg){
            const timer=setTimeout(()=>{
             setMsg({errMsg:"", sucMsg:""})
            },1500)
             return()=>clearTimeout(timer)
           }
          },[msg])
        

          // const [user, setUser] = useState(null);
        
          useEffect(() => {
            axios.get('http://localhost:5000/profile')
              .then(res => {
                // setUser(res.data);
                setUserData((prev)=>{
                  return {
                     ...prev,
                     obtainedInfo: {
                      _id: res.data._id,
                      firstname: res.data.firstname,
                      lastname: res.data.lastname,
                      email: res.data.email,    
                      }
                }
                })
                console.log('Fetched user:', res.data);
              })
              .catch(err => {
                console.error('Error fetching user:', err);
              });
          }, []);
        
          const [deleteRes,setDeleteRes]=useState({deleteSuc:"", deleteErr:""})
          const backToHome=useNavigate('')
        //   deleting account permanetly
        function handleDeleteAccount(){
            console.log('lauuu')
            axios.delete('http://localhost:5000/profile/delete',{
                data:userData.deletionData
            })
            .then((res)=>{
                setDeleteRes((prev)=>{
                    return {
                        ...prev,
                        deleteSuc:res.data
                    }
                })
                console.log('deleting..',res.data)
                setTimeout(()=>{
                 backToHome('/')
                },1600)
            })
            .catch((err)=>{
                setDeleteRes((prev)=>{
                    return {
                        ...prev,
                        deleteErr:err.response.data
                    }
                })
                console.log('error on delete acc:',err.response.data)
        })
        }
        // setMsg((prev)=>{
        //     return{
        //         ...prev,
        //         sucMsg:res.data
        //     }
        // })
        // console.log('Sucess:',res.data)
        
        useEffect(()=>{
            if(deleteRes.deleteSuc || deleteRes.deleteErr){
            const deleteResErase=setTimeout(()=>{
            setDeleteRes({deleteSuc:"", deleteErr:""})
            },1500)
            return()=>clearTimeout(deleteResErase)
        }
        },[deleteRes])
        
        
          
          return (
            <>
              <div className="flex flex-col bg-slate-50 overflow-auto">
                <div className="p-5 mx-auto w-[50%] mt-7 mb-7 ">
                  <div className="flex gap-x-10 items-center justify-between mb-5 px-5">
                    <div className="flex justify-center items-center border-2 border-gray-400 w-25 h-25 rounded-full overflow-hidden">
                      <img
                        src={image}
                        // width={96}
                        // height={96}
                        alt="profile-picture"
                        className=" w-full h-full object-cover"
                      />
                    </div>
                    <p
                      className="cursor-pointer text-red-600 text-lg font-semibold hover:underline"
                      onClick={fileRefGet}
                    >
                      Upload Profile Picture
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </p>
                  </div>
        
                  <div className="border border-gray-400 rounded-xl p-5">
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">First Name</h1>
                      <p
                        className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl ${
                          userData.view ? "block" : "hidden"
                        }`}
                      >
                        {userData.obtainedInfo.firstname}
                      </p>
                      <input
                        type="text"
                        value={userData.updatedData.firstName|| userData.obtainedInfo.firstname}
                        name="firstName"
                        autoFocus
                        onChange={handleUserData}
                        ref={userDataRef.firstNameRef}
                        className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl ${
                          userData.edit ? "block" : "hidden"
                        }`}
                      />
                    </div>
        
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">Last Name</h1>
                      <p
                        className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl ${
                          userData.view ? "block" : "hidden"
                        }`}
                      >
                        {userData.obtainedInfo.lastname}
                      </p>
                      <input
                        type="text"
                        value={ userData.updatedData.lastName ||userData.obtainedInfo.lastname}
                        name="lastName"
                        autoFocus
                        onChange={handleUserData}
                        ref={userDataRef.lastNameRef}
                        className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl ${
                          userData.edit ? "block" : "hidden"
                        }`}
                      />
                    </div>
        
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">Email</h1>
                      <p className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl`}>
                      {userData.obtainedInfo.email}
                      </p>
                    </div>
        
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">User ID</h1>
                      <p className={`border-2 border-gray-400 w-[90%] p-2 rounded-xl`}>
                      {userData.obtainedInfo._id}
                      </p>
                    </div>
        
                    {/* <div className="mb-5">
                    <h1 className="text-lg font-semibold">Password</h1>
                    <input
                      type={isPasswordVisible? "text":"password"}
                      value={userData.password}
                       readOnly
                      onClick={(()=>setIsPasswordVisible(!isPasswordVisible))}
                      className={`border-2 border-gray-400 w-[100%] p-2 rounded-xl cursor-pointer outline-none`}
                    />
                  </div> */
                  }
        
                    <div className="flex gap-x-7 ">
                      <button
                        className="border border-slate-500 px-4.5 py-1.5 bg-slate-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="border border-green-500 px-4.5 py-1.5 bg-green-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in"
                        onClick={handleSave}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  {/* update password section */}
                  <div className="mt-5 border w-[100%] p-5 rounded-xl border-gray-400">
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">Old Password</h1>
                      <input
                        type="password"
                        value={userData.oldPassword}
                        name="oldPassword"
                        // autoFocus
                        onChange={handleUserData}
                        // ref={userDataRef.firstNameRef}
                        className="border-2 border-gray-400 w-[90%] p-2 rounded-xl"
                      />
                    </div>
                    <div className="mb-5">
                      <h1 className="text-lg font-semibold">Update Password</h1>
                      <input
                        type="password"
                        value={userData.newPassword}
                        name="newPassword"
                        // autoFocus
                        onChange={handleUserData}
                        // ref={userDataRef.firstNameRef}
                        className="border-2 border-gray-400 w-[90%] p-2 rounded-xl "
                      />
                    </div>
                    <div className={`mb-1 italic text-lg font-semibold ${msg.errMsg? "text-red-500": "text-green-500" }`}>
                        {msg && <h1>{msg.errMsg || msg.sucMsg}</h1>}
                    </div>
                    <div>
                      <button
                        className="border border-green-500 px-4.5 py-1.5 bg-green-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in"
                        onClick={handleUpdatePassword}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  </div>
                  {/* update password part ends here */}
        
                  {/* deletion zone starts here */}
                  <div className="border-b border-t w-[100%] mx-auto border-gray-400">
                    <div className="w-[90%] mx-auto py-3">
                      <h1 className="font-bold text-2xl text-red-500">Danzer Zone</h1>
                      <p className="text-lg font-semibold italic">
                        Deleting your account is permanent. When you delete your
                        account, you won't be able to retrieve the content or
                        information you've shared on this system.
                      </p>
                      </div>
                    </div>
        
                    <div className="mt-5 mb-5 mx-auto w-[50%] border border-gray-400 rounded-xl p-5 ">
                    <div>
                     <h1 className="text-lg font-semibold">Email</h1>
                     <input
                        type="text"
                        value={userData.deletionData.email}
                        name="email"
                        
                        onChange={handleUserData}
                        // ref={userDataRef.lastNameRef}
                        className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
                      />
                    </div>
        
                    <div className="mt-5 mb-5">
                     <h1 className="text-lg font-semibold">Password</h1>
                     <input
                        type="password"
                        value={userData.deletionData.password}
                        name="password"
                        
                        onChange={handleUserData}
                        // ref={userDataRef.lastNameRef}
                        className="border-2 border-gray-400 w-[100%] p-2 rounded-xl"
                      />
                    </div>

                    <div className={`mb-1 italic text-lg font-semibold ${deleteRes.deleteErr? "text-red-500": "text-green-500" }`}>
                        {deleteRes && <h1>{deleteRes.deleteErr || deleteRes.deleteSuc}</h1>}
                    </div>

                      <button
                        className="border border-red-500 px-4.5 py-1.5 bg-red-400 rounded-lg cursor-pointer text-white font-semibold font-xl hover:shadow-sm shadow-slate-500 active:scale-90 transition ease-in"
                        onClick={handleDeleteAccount}
                      >
                        Delete Permanently
                      </button>
                    </div>
                    
                    {/* </div> */}
                  {/* </div> */}
                </div>
              {/* </div> */}
            </>
          );
}
import { MdOutlineEdit } from "react-icons/md";
import { useState, useRef , useEffect} from "react";
import axios from 'axios'
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary";
import { useLoginContext } from "../../Context/loginContext";
import { Navigate, useNavigate } from "react-router-dom";

export function Account() {
    const navigate = useNavigate()
    const {loginState} = useLoginContext()
    console.log({loginState})
    
       
    const [editPhotoVisibility, setEditPhotoVisibility] = useState(false);
    const [userDetails , setUserDetails] = useState(null)
    const [userProfilePhoto , setUserProfilePhoto] = useState(null)
    const fileInputRef = useRef(null);
    const token = localStorage.getItem('token')

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:3000/profile',{
                    params:{
                        token
                    }
                })
                if(response.data.success === true){
                    console.log('user ka profile', {response})
                    setUserDetails(response.data.user)
                    setUserProfilePhoto(response.data.user.profileImage)
                }
                console.log('user : ',{response})
            }catch(err){
                console.log("ERROR : ",err)
            }
        })()
    },[])

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])

    function editPhotoHandler() {
        // Trigger the file input element
        fileInputRef.current.click();
    }

    async function handleFileInputChange(event) {
        const file = event.target.files[0];
        // Do something with the selected file (e.g., upload it)
        try{
            const uplaodPhotoResponse = await uploadOnCloudinary(file,"image","User")
          
            const photoUrl = uplaodPhotoResponse.data.url

            const response = await axios.post('http://localhost:3000/profile/update/photo',{
                token,
                photo : photoUrl
            })
            console.log('photo upload',{response})
            setUserProfilePhoto(photoUrl)
        }catch(err){
            console.log("ERROR : ",err)
        }
        console.log("Selected file:", file);
    }
    console.log({userProfilePhoto})
    return (
        <div className="main h-full w-full relative">
            
            <div className="heading h-1/4 w-full flex items-center justify-center text-8xl text-white">
                PROFILE
            </div>
            {userDetails ?
            <div className="image-container-wrapper h-3/4 w-full flex flex-row gap-2">
                <div className="image-container h-full w-1/2 border-r-2 border-solid border-white flex items-center justify-center ">
                    <div
                        className="image-wrapper h-80 w-80 rounded-full border-2 border-solid border-white flex items-center  justify-center relative "
                        onMouseLeave={() => setEditPhotoVisibility(false)}
                        onMouseEnter={() => setEditPhotoVisibility(true)}
                    >
                        <div
                            className="image  h-full w-full bg-cover bg-center rounded-full"
                            style={{
                                backgroundImage:
                                    `url('${userProfilePhoto}')`,
                            }}
                        ></div>

                        <div
                            className={`${editPhotoVisibility ? "visible" : "hidden"
                                } hover:cursor-pointer h-full w-full edit-image absolute left=0 top-0 flex items-center  justify-center `}
                            onClick={editPhotoHandler}
                        >
                            <MdOutlineEdit className={` hover:cursor-pointer text-white  h-1/3 w-1/3 opacity-70`} />
                        </div>
                    </div>
                </div>
                 
                <div className="details-container h-full w-1/2  flex flex-col justify-center items-center text-white overflow-x-hidden overflow-y-auto">
                    <div className="Name h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-3xl h-full w-1/2 overflow-x-auto">Name</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.firstName} {userDetails.lastName}</span>
                    </div>
                    <div className=" Username h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-3xl h-full w-1/2 overflow-x-auto">Username</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.username}</span>
                    </div>
                    <div className=" Email h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-3xl h-full w-1/2 overflow-x-auto">Email</span>
                        <span className=" mr-2 flex items-center text-xl overflow-x-auto h-full w-1/2">{userDetails.email} </span>
                    </div>
                    <div className=" SongsOwned h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-3xl h-full w-1/2 overflow-x-auto">SongsOwned</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.songsOwned.length}</span>
                    </div>
                    <div className=" AccountType h-1/5 w-full flex flex-row items-center justify-between">
                        <span className=" ml-2 flex items-center text-3xl h-full w-1/2 overflow-x-auto">Account Type</span>
                        <span className=" mr-2 flex items-center h-full w-1/2 text-xl overflow-x-auto">{userDetails.accountType } </span>
                    </div>
                  
                </div>
            </div>
            :
            <div className="flex justify-center mt-10 text-white text-xl">Loading...</div>
        }
            {/* Hidden file input element */}
            <input
                type="file"
                id="upload-photo-input"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
                ref={fileInputRef}
            />
            
        </div>
    );
}

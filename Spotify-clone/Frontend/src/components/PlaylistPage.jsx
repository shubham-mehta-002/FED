import { SongTiles } from "./SongTiles"
import { useParams } from "react-router-dom"
import { useEffect ,useState } from "react"
import axios from 'axios'
import playButton from '../images/playButton.png'
import { useAppContext } from '../Context/appContext'


export function PlaylistPage()
{
    const [playlistData , setPlaylistData ] = useState({})
    const {state,dispatch}= useAppContext()
    const {playlistId} = useParams()
    const token = localStorage.getItem('token')

    useEffect(()=>{
        (async()=>{
            try{
                
                const response = await axios.get(`http://localhost:3000/playlist/${playlistId}`,{
                    params: {
                        token:token,
                        playlistId
                    }})
                    // console.log('playlst page',{response})
                setPlaylistData(response.data.playlist)
       
            }catch(err){

                console.log(err)
            }
        })()
    },[playlistId])
 
    // const demoSong = {
    //     name:"shubham",
    //     collaborators:['hi','hello','buddy'],
    //     thumbnail:"http://res.cloudinary.com/dudcrgnld/image/upload/v1712314155/dzxebmgprfdzunbjfihy.png",
    //     track:"http://res.cloudinary.com/dudcrgnld/video/upload/v1712314157/vj814ccrukdqm68sqb8u.mp3",
    //     artist:{
    //         username:"shubham-yoyo"
    //     },
    //     playlists:[],
    //     isLiked:true
    // }
    // console.log('data',playlistData)
    // const thumbnailImage = playlistData.thumbnail ? playlistData.thumbnail : (playlistData.songs ? playlistData.songs[0].songs) 
    
    // }
    return(
        <div className='h-full w-full bg-customLightBlack text-white overflow-x-hidden overflow-y-auto'>
            <div className="h-1/3 w-full flex flex-row justify-between">
                <div className="header flex flex-row items-center w-full">
                    <div  className="playlist-thumbnail h-full w-1/2 m-3 ">
                        <img src={playlistData.thumbnail} className="h-full w-full rounded" />
                    </div>

                    <div className="playlist-data h-4/3 w-full  flex flex-col gap-3">
                        <div className="text-4xl font-semibold">{playlistData.name}</div>
                          <div className=" text-base">{playlistData.songs ? playlistData.songs.length : 0} items </div> 
                        <div className=" text-lg overflow-hidden whitespace-nowrap overflow-ellipsis">{playlistData.collaborators && playlistData.collaborators.join(' | ')}</div>
                    </div>
                
                </div>                
            </div>

            <div className="py-3 w-1/4 flex justify-start items-center">
                    <img src={playButton} className="hover:scale-105 hover:cursor-pointer ml-3 h-20 w-20"/>
            </div>  

            <hr className="customGray m-4"/>

            <div className=" h-1/3 w-full">
            {
                playlistData.songs && playlistData.songs.length!==0 ? 
                    playlistData.songs.map(song => <SongTiles key={song._id} {...song} />) 
                        :
                    <div className="text-white flex flex-col gap-4 items-center justify-center">
                        <div className="text-4xl">
                            No songs added
                        </div> 
                        <div className="text-sm">
                            Click on the plus button on playlist tile to add songs 
                        </div>
                    </div>
            }
       
            </div>
        </div>
    )
}
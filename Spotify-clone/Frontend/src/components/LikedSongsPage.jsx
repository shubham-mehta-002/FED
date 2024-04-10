import { useAppContext } from '../Context/appContext'
import {SongTiles} from '../components'
import {useState , useEffect} from 'react'
import axios from 'axios'
export function LikedSongsPage()
{

    const {state,dispatch} = useAppContext()
    const [likedSongs , setLikedSongs] = useState([])
    const token = localStorage.getItem('token')
    useEffect(()=>{
        try{
             (async()=>{
            const response = await axios.get('http://localhost:3000/song/liked',{
                params:{
                    token
                }
            })
            // console.log(response)
            if(response.data.success){
                setLikedSongs(response.data.likedSongs)
            }
        }
        )()
        }catch(err){
            console.log(err)
        }


    },[])

    // console.log('liked songs',{state})
    return (
        <div className='m-4 flex flex-col jsutify-center gap-3'>
            {
                likedSongs.map(song => <SongTiles key={song._id} {...song}/>)
            }
        </div>
    )
}


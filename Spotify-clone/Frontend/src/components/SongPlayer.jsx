import greenHeart from '../images/green-heart.png'
import playButton from '../images/playButton-white.png'
import { useCurrentSongContext } from '../Context/currentSongContext';
// import { playMusic } from '../utils/playMusic.jsx';
// import { pauseMusic } from '../utils/pauseMusic.jsx';
import loop from '../images/loop.png'
import next from '../images/next-song.png'
import prev from '../images/previous-song.png'
import play from '../images/playButton-white.png'
import pause from '../images/pause.png'
import restart from '../images/restart.png'
import { useState } from 'react';
import {demo } from  '../components/demo.jsx'
import { useAppContext } from "../Context/appContext"


export function SongPlayer()
{
    const {state , dispatch} = useAppContext()
    const {thumbnail , artist ,name } = state.currentSong
    // console.log({thumbnail , name, artist} )
    // const thumbnail=greenHeart
    // const artist="Shubham mehta"
    // const collaborators=['shubham','hello World']
    // const {currentSong , setCurrentSong} = useCurrentSongContext()
    
    // const [isPaused , setIsPaused] = useState(true)

    // console.log("in songPlayer ",{currentSong})
    // console.log({currentSong.songData , currentSong.name})
    // if(state.currentSong && (state.currentSong._id === _id )){
    //     state.isPlaying ? state.currentSong.audio.play() : state.currentSong.audio.pause()
    // }
        


    
    const togglePlayPause = () =>{
        // if(state.isPlaying){
        //     pauseMusic(state.currentSong.track)
        // }
        // else{
        //     playMusic(state.currentSong.track)
        // }
          
        dispatch({type:"TOGGLE_PLAYING" , payload:{isPlaying : state.isPlaying ? false: true}})
    }

    // const audio = new Audio(state.currentSong.track)
    
    

    return(
        <div className="h-full w-full flex flex-row text-black items-center ">
            
            {/* {state.currentSong.isPlaying && audio.play} */}
            
            <div className="song-details h-full w-1/4 bg-white flex flex-row items-center gap-3">
                <div className='thumbnail h-5/6 w-1/6 rounded'>
                    <img src={thumbnail} className='h-full w-full' />
                </div>
                <div className='artist-details'>
                    <div className='artist-details text-base font-medium'>{name}</div>
                    <div className='collaborators-details text-xs'>{artist.username}</div>
                </div>
            </div>

            <div className="h-full w-1/2 ">
                <div className='h-1/2 w-full flex flex-row justify-center items-center gap-5'>

                    <img src={loop} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={prev} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={state.isPlaying ? pause : play} className='hover:cursor-pointer  h-8 w-8'
                        onClick={togglePlayPause}
                    />
                    <img src={next} className='hover:cursor-pointer  h-5 w-5'/>
                    <img src={restart} className='hover:cursor-pointer  h-5 w-5'/>

                   
                </div>
                <div className='h-1/2 w-full flex flex-col justify-center items-center'>
                    <input type='range' min={0} max={100}  step={0.1}className='h-1/2 w-full'/>                    
                </div>
            </div>
            <div className="h-full w-1/4 bg-black"></div>

        


        </div>
    )
}

//http://res.cloudinary.com/dudcrgnld/video/upload/v1712491705/y9zhloq60rvmaajdifol.mp3
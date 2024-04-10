import {Howl, Howler} from 'howler';
import { SongTiles } from '../components/SongTiles';
import { useAppContext } from "../Context/appContext"


// import { useCurrentSongContext } from '../Context/currentSongContext';


export const playMusic = async(soundSrc , isPlaying) =>{
    const audio= new Audio(soundSrc)
    if(state.isPlaying){
        await audio.play()
    }else{
        audio.pause()
    }

}



// // const {currentSong , setCurrentSong} = useCurrentSongContext()
// console.log({soundSrc})
// if(currentSong){
//     currentSong.stop()
// }
// let sound = new Howl({
//     src: [soundSrc],
//     html5: true
//   });
// setCurrentSong(sound)
// sound.play();
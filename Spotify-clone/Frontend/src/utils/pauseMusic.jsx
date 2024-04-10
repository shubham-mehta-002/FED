import {Howl, Howler} from 'howler';
import { SongTiles } from '../components/SongTiles';


export const pasueMusic = async(soundSrc , isPlaying) =>{
    const audio= new Audio(soundSrc)
    if(state.isPlaying){
        await audio.play()
    }else{
        audio.pause()
    }
}
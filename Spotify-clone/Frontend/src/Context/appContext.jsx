import {  createContext , useContext, useEffect ,useState} from "react";
import { useReducer } from "react";
import axios from 'axios'
export const appContext = createContext()
export const useAppContext = () => useContext(appContext)
    

function reducer(state,action)
{

    switch(action.type){ 
        case "SET_PLAYLIST_INITIAL_VALUE":{
            return {...state,playlists:action.payload.playlists}
        }    
        
        case "SET_LIKED_SONGS_INITIAL_VALUE":{
            // console.log('intial value set',{...state,likedSongs:action.payload.likedSongs})
            return {...state,likedSongs:action.payload.likedSongs}
        }  

        case "ADD_PLAYLIST":{  
            // console.log('I am being called') 
            return {...state, playlists:[...state.playlists,...action.payload.playlist]}
        }

        case "ADD_SONG_TO_PLAYLIST":{
            // console.log('aay')
            // console.log()
            // console.log('dispatch function called .....')
            // console.log('playlist before : ',state.playlists)
            const newPlaylist = state.playlists.map((playlist)=>{
                // console.log(playlist)
                if(playlist._id !== action.payload.playlistId)
                    return playlist
                else
                    return ({...playlist,songs:[...playlist.songs,action.payload.songId]})
            
            })

            // console.log('new playlist generated ', {newPlaylist})
            return {...state,playlists:newPlaylist}
        }

        case "REMOVE_SONG_FROM_PLAYLIST":{
            const newPlaylist = state.playlists.map((playlist) => {

                if(playlist._id !== action.payload.playlistId)  
                    return playlist
                else{
                    const updatedSongsInPlaylist = playlist.songs.filter(songId =>songId !== action.payload.songId)
                    return {...playlist , songs:updatedSongsInPlaylist}
                }
            })
            
            return {...state , playlists : newPlaylist}
        }

        case "ADD_TO_LIKED_SONGS":{
            console.log('like me app context called',action)
            console.log('before',state)
            console.log('after',{...state , likedSongs:[...state.likedSongs , action.payload.songId]})
            return {...state , likedSongs:[...state.likedSongs , action.payload.songId]}
        }
        case "REMOVE_FROM_LIKED_SONGS":{
            console.log(action.payload.songId)
            console.log(state.likedSongs.filter(likedSong => likedSong !== action.payload.songId))
            const newLikedSongsData = state.likedSongs.filter(likedSongId => likedSongId !== action.payload.songId)
            // console.log()
            return {...state , likedSongs:newLikedSongsData}
        }   

        // case "PLAY_MUSIC":{
        //     return {...state,currentSong:action.payload.songData}
        // }
        // case "PAUSE_MUSIC":{
        //     return {...state,isPlaying:false}
        // }
         
        case "SET_CURRENT_SONG":{
            (state&& state.currentSong) ? state.currentSong.audio.pause() : null
            return{
                ...state,
                currentSong: action.payload.currentSong,
                isPlaying : true
            }
        }

        case "TOGGLE_RANDOM":{
            return{
                ...state,
                random : action.payload.random
            }
        }

        case "TOGGLE_REPEAT":{
            return{
                ...state,
                repeat : action.payload.repeat
            }
        }

        case "TOGGLE_PLAYING":{
            // console.log(state.isPlaying)
            return{
                ...state,
                isPlaying : action.payload.isPlaying
            }
        }
    
        default :
            return state
    }
}



export const AppProvider = ({children}) =>
{
    const [state,dispatch] = useReducer(reducer,{
        playlists:[],
        likedSongs:[], 
        currentSong:null,
        isPlaying:false,
        currentDuration:0,
        repeat:false,
        nextSong:null,
        prevSong:null,
        random:false,
 

    })
    
    return (<appContext.Provider value={{state,dispatch}}>
        {children}
    </appContext.Provider>)
}
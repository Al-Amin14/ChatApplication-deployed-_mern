import io from 'socket.io-client'
import React ,{ Children , useEffect, useState, createContext, useContext} from 'react'

const socketContext=createContext()

export const useSocketContext=()=>{
    return useContext(socketContext)
}



export const SocketProvider=({children})=>{
    const [socket, setSocket] = useState(null);
    const [Onlineuser, setOnlineuser] = useState([]);
    const authUser=localStorage.getItem('id')
    useEffect(() => {
        if(authUser){
            console.log("auth is here"+authUser)
            const sockets= io('http://localhost:3000',{
                query:{
                    useId:authUser,
                }}
            )
            console.log(sockets)
            setSocket(sockets)

            sockets.on("getOnlineuser",(users)=>{
                setOnlineuser(users)
                console.log("socket disconnected")
            })
            return  ()=>sockets.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser]);
    return (<socketContext.Provider value={{socket,Onlineuser}}>{children}</socketContext.Provider>)
}
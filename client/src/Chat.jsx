import React, { useEffect, useState } from 'react';

const Chat = ({socket, userName, roomName}) => {
    const [currentMsg, setCurrentMsg] = useState("")
    const [msgList, setMsgList] = useState([])

    const sendMessage = async() => {
        if(currentMsg !== ""){
            const messageData = {
                roomName,
                author: userName,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
            }
        
            await socket.emit("sendMessage", messageData)
            setMsgList((prev)=>[...prev, messageData])

        }

    }


    useEffect(()=> {
        const handleMessage = (data) => {
            console.log(data);
            setMsgList((prev) => [...prev, data]);
        };
       
        socket.on("receiveMessage", handleMessage);

        return () => {
            socket.off("receiveMessage", handleMessage); // 👈 clean up
        };

    },[socket])

    console.log(msgList)
    return (
        <div>
            <div>
                {
                    msgList.map(msg=><div className='bg-green-100 w-[480px] mb-1 p-1 flex'>
                        <p className='bg-green-700 w-20 text-white p-2 text-center h-10'>{msg.author}</p>
                        <p className='p-2'>{msg.message}</p>
                    </div>)
                }
            </div>
            <input className='h-10 p-2 w-[400px]' placeholder='Your message here..' type="text"
                onChange={(event)=>{
                    setCurrentMsg(event.target.value)
                }}
            />
            <button className='bg-blue-700 text-white p-2 w-20' onClick={sendMessage}>Send</button>
            <button className='bg-blue-700 text-white ml-2 p-2 w-20' onClick={()=>setMsgList([])}>Clear</button>
            
        </div>
    );
};

export default Chat; 
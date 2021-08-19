
import React, { useState, useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from "./axios";

function App() {

  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    axios.get("/messages/sync")
    .then(response =>{
     
      setMessages(response.data);
    })
    }, [])
  

  useEffect(() => {
    const pusher = new Pusher('9acd2da9b0746c88b1b5', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
    
  }, [messages]);




   console.log(messages);
  return (
    <div className="App">
      <div className="app_body">
        

    {/* Side-Bar Component */}
    <Sidebar/>
    {/* Chat-Bar Component */}
    <Chat messages={messages} />

      </div>


    </div>
  );
}

export default App;

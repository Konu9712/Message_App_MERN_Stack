import React from 'react'
import './Sidebar.css'

import SidebarChat from './SidebarChat'

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import {IconButton, Avatar } from '@material-ui/core';


function Sidebar() {
    return (
        <div className="sidebar"> 
            <div className="sidebar_header">
                <Avatar src="https://kit.snapchat.com/images/docs/bitmoji-avatar.png" />
                <div className="sidebar_headerRight">
                   <IconButton>
                     <DonutLargeIcon/> 
                   </IconButton> 
                   <IconButton>
                     <ChatIcon/> 
                   </IconButton> 
                   <IconButton>
                     <MoreVertIcon/> 
                   </IconButton> 
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon/>
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>

            <div className="sidebar_chats">
               <SidebarChat/>
               <SidebarChat/>
               <SidebarChat/>
               
            </div>
        </div>
    )
}

export default Sidebar

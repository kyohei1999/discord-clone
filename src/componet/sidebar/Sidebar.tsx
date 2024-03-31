import React, { useEffect, useState } from 'react';
import './Sidebar.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';
// import {  collection, query } from 'firebase/firestore';
// import { onSnapshot } from 'firebase/firestore';

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const { doucuments: channels } = useCollection('channels');

  const addchannel = async () => {
    let channelName: string | null = prompt('新しいチャンネルを作成します');

    if (channelName) {
      await addDoc(collection(db, 'channels'), {
        channelName: channelName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebarLeft">
        <div className="serverIconMain">
          <img src="discordIcon.png" alt=""></img>
        </div>
        <div className="serverIcon">
          <img src="logo192.png" alt=""></img>
        </div>
      </div>
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon></ExpandMoreIcon>
        </div>

        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              <ExpandMoreIcon />
              <h4 className="text">プログラミングチャネル</h4>
            </div>
            <AddIcon
              className="sidebarAddIcon"
              onClick={() => addchannel()}
            ></AddIcon>
          </div>

          <div className="sidebarChannelList">
            {channels.map((channel) => (
              <SidebarChannel
                key={channel.id}
                channel={channel}
                id={channel.id}
              />
            ))}
            {/* <SidebarChannel />
            <SidebarChannel />
            <SidebarChannel /> */}
          </div>

          <div className="sidebarFooter">
            <div className="sidebarAccount">
              <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
              <div className="accounName">
                <h4>S{user?.displayName}</h4>
                <span>#{user?.uid.substring(0, 4)}</span>
              </div>
            </div>

            <div className="sidebarVoice">
              <MicIcon></MicIcon>
              <HeadphonesIcon></HeadphonesIcon>
              <SettingsIcon></SettingsIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

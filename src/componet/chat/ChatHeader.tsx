import React from 'react';
import './ChatHeader.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

type Props = {
  channelName: string | null;
};

const ChatHeader = (props: Props) => {
  const { channelName } = props;
  return (
    <div className="chatHeader">
      <div className="chatHeaderLeft">
        <span className="chatHeaderHash">#</span>
        <h3>{channelName}</h3>
      </div>

      <div className="chatHeaderRight">
        <NotificationsIcon></NotificationsIcon>
        <PushPinIcon></PushPinIcon>
        <PeopleAltIcon></PeopleAltIcon>

        <div className="chatHeaderSearch">
          <input type="text" placeholder="検索"></input>
          <SearchIcon></SearchIcon>
        </div>
        <SendIcon></SendIcon>
        <HelpIcon></HelpIcon>
      </div>
    </div>
  );
};

export default ChatHeader;

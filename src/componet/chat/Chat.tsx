import React, { useEffect, useState } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Query,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
import useSubCollection from '../../hooks/useSubCollection';

const Chat = () => {
  const [inputText, setInputText] = useState<string>('');
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user);
  const { subDoucuments: messages } = useSubCollection('channels', 'messages');

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const collectionRef: CollectionReference = collection(
      db,
      'channels',
      String(channelId),
      'messages'
    );

    const docref: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timeStamp: serverTimestamp(),
        user: user,
      }
    );
    // console.log(docref);
    setInputText('');
  };

  // console.log(inputText);
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
        {/* <ChatMessage />
        <ChatMessage /> */}
      </div>
      <div className="chatInput">
        <AddCircleOutlineIcon></AddCircleOutlineIcon>
        <form>
          <input
            type="text"
            placeholder="#Udemyへメッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          ></button>
        </form>

        <div className="chatInputIcon">
          <CardGiftcardIcon></CardGiftcardIcon>
          <GifIcon></GifIcon>
          <InsertEmoticonIcon></InsertEmoticonIcon>
        </div>
      </div>
    </div>
  );
};

export default Chat;

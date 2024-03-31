import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  DocumentData,
  collection,
  query,
  onSnapshot,
  Query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { useAppSelector } from '../app/hooks';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDoucuments, setSubDocuments] = useState<Messages[]>([]);

  useEffect(() => {
    const collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );
    console.log(collection(db, 'messages'));

    const collectionRefOrderby = query(
      collectionRef,
      orderBy('timestamp', 'desc')
    );

    onSnapshot(collectionRef, (snaphot) => {
      let results: Messages[] = [];
      snaphot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timeStamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });

      setSubDocuments(
        // results.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
        results.sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return a.timestamp.seconds - b.timestamp.seconds;
          } else {
            const currentDate = new Date();
            return currentDate.getTime() - currentDate.getTime(); // Handle case where both timestamps are null
          }
        })
      );
    });
  }, [channelId]);

  return { subDoucuments };
};

export default useSubCollection;

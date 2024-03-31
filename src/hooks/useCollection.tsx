import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  DocumentData,
  collection,
  query,
  onSnapshot,
  Query,
} from 'firebase/firestore';

interface Channels {
  id: string;
  channel: DocumentData;
}

function useCollection(data: string) {
  const [doucuments, setDocuments] = useState<Channels[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResult: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        //  console.log(doc.id, doc.data()));
        channelsResult.push({ id: doc.id, channel: doc.data() })
      );
      setDocuments(channelsResult);
    });
  }, []);

  return { doucuments };
}

export default useCollection;

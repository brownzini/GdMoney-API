import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
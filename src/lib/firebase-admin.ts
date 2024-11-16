import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

// Users Collection
export const usersCollection = collection(db, 'users');

// Events Collection
export const eventsCollection = collection(db, 'events');

// Orders Collection
export const ordersCollection = collection(db, 'orders');

// WhatsApp Groups Collection
export const groupsCollection = collection(db, 'groups');

// Flight Pools Collection
export const flightPoolsCollection = collection(db, 'flightPools');

// Match Pools Collection
export const matchPoolsCollection = collection(db, 'matchPools');
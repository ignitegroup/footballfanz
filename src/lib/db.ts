import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { User } from 'firebase/auth';

// User Management
export async function createUserProfile(user: User, additionalData: any) {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    try {
      await updateDoc(userRef, {
        displayName: user.displayName,
        email: user.email,
        createdAt: serverTimestamp(),
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  return userRef;
}

// Orders Management
export async function createOrder(userId: string, orderData: any) {
  try {
    const orderRef = await addDoc(collection(db, 'orders'), {
      userId,
      ...orderData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return orderRef;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

// Flight Pool Management
export async function createFlightPool(poolData: any) {
  try {
    const poolRef = await addDoc(collection(db, 'flightPools'), {
      ...poolData,
      createdAt: serverTimestamp(),
      participants: [],
    });
    return poolRef;
  } catch (error) {
    console.error('Error creating flight pool:', error);
    throw error;
  }
}

export async function joinFlightPool(poolId: string, userId: string) {
  try {
    const poolRef = doc(db, 'flightPools', poolId);
    const poolDoc = await getDoc(poolRef);
    
    if (poolDoc.exists()) {
      const participants = poolDoc.data().participants || [];
      if (!participants.includes(userId)) {
        await updateDoc(poolRef, {
          participants: [...participants, userId],
        });
      }
    }
  } catch (error) {
    console.error('Error joining flight pool:', error);
    throw error;
  }
}

// Match Pool Management
export async function createMatchPool(poolData: any) {
  try {
    const poolRef = await addDoc(collection(db, 'matchPools'), {
      ...poolData,
      createdAt: serverTimestamp(),
      participants: [],
    });
    return poolRef;
  } catch (error) {
    console.error('Error creating match pool:', error);
    throw error;
  }
}

export async function joinMatchPool(poolId: string, userId: string) {
  try {
    const poolRef = doc(db, 'matchPools', poolId);
    const poolDoc = await getDoc(poolRef);
    
    if (poolDoc.exists()) {
      const participants = poolDoc.data().participants || [];
      if (!participants.includes(userId)) {
        await updateDoc(poolRef, {
          participants: [...participants, userId],
        });
      }
    }
  } catch (error) {
    console.error('Error joining match pool:', error);
    throw error;
  }
}

// WhatsApp Groups Management
export async function requestGroupAccess(groupId: string, userId: string, userData: any) {
  try {
    const requestRef = await addDoc(collection(db, 'groupRequests'), {
      groupId,
      userId,
      ...userData,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return requestRef;
  } catch (error) {
    console.error('Error requesting group access:', error);
    throw error;
  }
}
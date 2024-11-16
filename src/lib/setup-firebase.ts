import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

const initialData = {
  users: [
    {
      id: 'admin',
      email: 'admin@reggaefootballfanz.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'demo-fan',
      email: 'fan@reggaefootballfanz.com',
      name: 'Demo Fan',
      role: 'fan',
      createdAt: new Date().toISOString(),
    },
  ],
  events: [
    {
      id: 'usa-nov-14',
      title: 'Jamaica vs USA - CONCACAF Nations League Quarter Finals',
      date: '2024-11-14',
      time: '8:00 PM',
      location: 'Kingston, Jamaica',
      venue: 'National Stadium',
      description: 'First leg of the Quarter Finals',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80',
    },
    {
      id: 'usa-nov-18',
      title: 'USA vs Jamaica - CONCACAF Nations League Quarter Finals',
      date: '2024-11-18',
      time: '7:00 PM',
      location: 'Austin, TX',
      venue: 'City Park',
      description: 'Second leg of the Quarter Finals',
      imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80',
    },
  ],
};

export async function setupFirebase() {
  try {
    // Check if setup has already been done
    const usersRef = collection(db, 'users');
    const adminQuery = query(usersRef, where('role', '==', 'admin'));
    const adminSnapshot = await getDocs(adminQuery);

    if (!adminSnapshot.empty) {
      console.log('Firebase already set up');
      return true;
    }

    // Create users
    for (const user of initialData.users) {
      await setDoc(doc(db, 'users', user.id), user);
    }

    // Create events
    for (const event of initialData.events) {
      await setDoc(doc(db, 'events', event.id), event);
    }

    // Create empty collections for other data
    const collections = ['orders', 'groups', 'flightPools', 'matchPools'];
    for (const collectionName of collections) {
      const collRef = collection(db, collectionName);
      const snapshot = await getDocs(collRef);
      if (snapshot.empty) {
        // Create a temporary document that we'll delete right away
        // This ensures the collection exists
        const tempDoc = doc(collRef);
        await setDoc(tempDoc, { temp: true });
        await tempDoc.delete();
      }
    }

    console.log('Firebase setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up Firebase:', error);
    throw error;
  }
}
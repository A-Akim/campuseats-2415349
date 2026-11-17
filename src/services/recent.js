import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

// Live listener for the student's recently viewed document
export function subscribeToRecentlyViewed(uid, onData, onError) {
  return onSnapshot(
    doc(db, 'recent', uid),
    (snap) => {
      onData(snap.exists() ? (snap.data().items ?? []) : [])
    },
    onError
  )
}

// Write the updated array back to Firestore
export function saveRecentlyViewed(uid, items) {
  return setDoc(doc(db, 'recent', uid), { items })
}
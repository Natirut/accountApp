import firebase from 'firebase'
import '@firebase/firestore'
import '@firebase/storage'
import { firebaseConfig } from './config'



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
// export const TwitterProvider = new firebase.auth.TwitterAuthProvider()
export const auth = firebase.auth()
export const db = firebase.firestore()
export const fireStorage = firebase.storage()
export const { TimeStamp, GeoPoint } = firebase.firestore
export default firebase

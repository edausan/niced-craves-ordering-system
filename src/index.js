import React, { createContext } from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w",
	authDomain: "niced-craves-ordering-system.firebaseapp.com",
	projectId: "niced-craves-ordering-system",
	storageBucket: "niced-craves-ordering-system.appspot.com",
	messagingSenderId: "312614147462",
	appId: "1:312614147462:web:31c8a827a9b4600f79c807",
	measurementId: "G-KBG9XZMELD"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const db = getFirestore()
const storage = getStorage()
const imagesRef = ref(storage, "images")

const fileName = "chicken.jpg"
const chickenRef = ref(imagesRef, fileName)
const path = chickenRef.fullPath

console.log({ path, chickenRef, imagesRef })

// const riceMealRef = collection(db, "rice_meals")
// getDocs(riceMealRef).then(snapshot => {
// 	// console.log({ snapshot: snapshot.docs })
// 	snapshot.docs.forEach(doc => {
// 		console.log({ data: doc.data() })
// 	})
// })

export const MainCtx = createContext()

ReactDOM.render(
	<React.StrictMode>
		<MainCtx.Provider value={{ db }}>
			<App />
		</MainCtx.Provider>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// scrabble board is 15x15 fields (225 in total)
import React from "react";

import "./App.css";

// import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// import { useCollectionData } from "react-firebase-hooks/firestore";
import { Game } from "./components/organisms";

// const firebaseConfig = {
//   apiKey: "AIzaSyCvAGhz44yopunfaldCFL5sqGF7Iu3fIbo",
//   authDomain: "scrabble-1dd3f.firebaseapp.com",
//   projectId: "scrabble-1dd3f",
//   storageBucket: "scrabble-1dd3f.appspot.com",
//   messagingSenderId: "744182020847",
//   appId: "1:744182020847:web:d2750e9fb92b275b42391a",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const database = firestore.collection("Gameboard");

// async function update(value:any) {
//   await database.doc("config").update({
//     board: value,
//   })
// }
// <button onClick={()=>update(["A","B", "Cy"])}>update firestore pls</button>

function App() {
  // const query = database.orderBy('message').limit(25);
  // const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <DndProvider backend={HTML5Backend}>
      <Game />
    </DndProvider>
  );
}

export default App;

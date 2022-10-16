import app from "./firebase";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";

export const db = getFirestore(app)

export const usersRef = collection(db, "users")
/*
    users has next structure:
    
    uuid: {
        favourite_pokemons: [pokemon_id:int, ...],
        name: { first_name: str, last_name: str },
        nickname: str,
        group: "user"|"admin",
        uuid: str
    },
    ...
*/

export async function setUserParams(uuid, params) {
    // console.log("setUserParams", uuid, params)
    let userDoc = doc(usersRef, uuid);
    await setDoc(userDoc, params);
}

export async function updateUserParams(uuid, params) {
    // console.log("updateUserParams", uuid, params)
    let userDoc = doc(usersRef, uuid);
    await updateDoc(userDoc, params);
}

export async function getUserData(uuid, cb) {
    // usage: getUserData("test", console.log)
    try {
        const snapshot = await getDoc(doc(db, "users", uuid));
        const data = snapshot.data();
        cb(data);
    } catch (err) {
        console.error(err.message);
        cb(null);
    }
}




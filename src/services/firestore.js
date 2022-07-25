import app from "./firebase";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";


export const db = getFirestore(app)

export const usersRef = collection(db, "users")
/*
    users has next structure:
    
    uuid: {
        favourite_pokemons: [pokemon_id:str, ...],
        name: { first_name: str, last_name: str },
        nickname: str,
        uuid: str
    },
    ...
*/

export async function getUserData(uuid, cb) {
    // usage: getUserData("test", console.log)
    try {
        const snapshot = await getDoc(doc(db, "users", uuid));
        const data = snapshot.data();
        cb(data);
    } catch (err) {
        console.log(err.message);
        cb(null);
    }
}




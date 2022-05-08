import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import {db} from "../config/Firebase/firebase"


  export const getService = async (path) => {

   return     await getDocs(collection(db, path));

  };


  export const deleteService = async (path,id) => {

  return      await deleteDoc(doc(db, path, id));

  };


   export const updateService = async (path,id,data) => {

        const washingtonRef = doc(db, path, id);
      
        return    await updateDoc(washingtonRef, data)
   
       };      
       

   export const postService = async (path,data) => {
      

        return  await addDoc(collection(db, path), data);

   
       };  

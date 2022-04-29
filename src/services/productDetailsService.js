import { collection ,getDocs,deleteDoc,doc} from "firebase/firestore"; 
import {db} from "../firebase"
export function getAllProductDetails() {
    return [
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},
{
    Id: "1",
    Name: "ali",
    price: "100",
    quantity: "1"
},
{
    Id: "2",
    Name: "ahsan",
    price: "200",
    quantity: "2"
},
{
    Id: "3",
    Name: "waseem",
    price: "300",
    quantity: "3"
},
   
{
    Id: "4",
    Name: "naseem",
    price: "400",
    quantity: "4"
},
{
    Id: "5",
    Name: "junaid",
    price: "500",
    quantity: "5"
},
{
    Id: "6",
    Name: "akram",
    price: "600",
    quantity: "6"
},

    


]

}

export   function  getAllShopItems()  {
    let list=[];
    let myPromise = new Promise(function(myResolve, myReject) {      
        const querySnapshot =  getDocs(collection(db, "shop"));
        if (querySnapshot) {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                list.push({id:doc.id,...doc.data()})
              
              
                // console.log(doc.id, " => ", doc.data());
              });    
         console.log('list',list)
          myResolve(list);
        } else {
          myReject("Error");
        }
      });
  
      myPromise.
      then(function (data) {
       return data
      }).
      catch(function (error) {
          console.log('Some error has occurred',error);
      });  
//   setLoader(true)
//   setRecords(list)
//   setLoader(false)

  };
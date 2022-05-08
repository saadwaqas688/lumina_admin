import React, { useEffect, useState } from 'react'
import FormikForm from '../Product/addProduct';
import Popup from '../Popup/Popup';
import { collection ,getDocs,doc, updateDoc} from "firebase/firestore"; 
import {db} from "../../../config/Firebase/firebase"
import {Skeleton} from '@mui/material';
import PageWrapper from '../../../PageWrapper';
import Table from '../Table/Table';


const headCells = [
    { id: 'fullName', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ViewAllUsers() {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const handelFetch = async() => {
        setLoading(true)
        let list=[];      
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,
            firstValue:doc.data().name,
            secondValue:doc.data().email,
            thirdValue:doc.data().phone,
          
          ...doc.data()})
      
      
        // console.log(doc.id, " => ", doc.data());
      });
      
      setRecords(list)
      setLoading(false)

      
      };


      function handleModal(){
        setRecordForEdit('')
        setOpenPopup(!openPopup)
    
    
    }
    useEffect(()=>{
        // if(!openPopup){
        handelFetch()
        // }
       },[ ])

      const updateStatus = async (id,status) => {
        const newStatus= status==="blocked"?"active":"blocked";
      const washingtonRef = doc(db, "Users", id);
      await updateDoc(washingtonRef, {
          status: newStatus
        })
        const updatedData = records.map((item) => {
            
          if(item.id === id){
              item.status=newStatus
          } 
          return item
          
          });   
        setRecords(updatedData) 
    }
    return (
        <PageWrapper>
          

{   loading ? (
    <>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
    </>
):

    records ?
    <>
    <Table records={records} 
    
    setOpenPopup={setOpenPopup} 
    //   openPopup={openPopup}
      setRecordForEdit={setRecordForEdit}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={false}
      deleteButton={false}
      updateStatus={updateStatus}
      path='users'
/>
   
              <Popup
              title="Product"
              openPopup={openPopup}
            //   setOpenPopup={setOpenPopup}
              handleModal={handleModal}

          >
        <FormikForm
                         records={records}
                         setRecords={setRecords}
                         handleModal={handleModal}
                         recordForEdit={recordForEdit}
        />

          </Popup>
          </>:
          <></>

}


        </PageWrapper>

    )
}

import React, { useEffect, useState } from 'react'
import FormikForm from '../Product/addProduct';
import Popup from '../Popup/Popup';
import { collection ,getDocs,deleteDoc,doc} from "firebase/firestore"; 
import {db} from "../../../config/Firebase/firebase"
import {Skeleton} from '@mui/material';
import PageWrapper from '../../../PageWrapper';
import Table from '../Table/Table';


const headCells = [
    { id: 'fullName', label: 'Name' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'In Stock' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ProductDetails() {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const handelFetch = async() => {
        setLoading(true)
        let list=[];      
      const querySnapshot = await getDocs(collection(db, "shop"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,
            firstValue:doc.data().name,
            secondValue:doc.data().price,
            thirdValue:doc.data().quantity,
          
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
      
      const handelDelete = async (id) => {
        await deleteDoc(doc(db, "shop", id));
      
        const result =records.filter((item)=>item.id!==id)
      
        setRecords(result)
            
      };
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
      handelDelete={handelDelete}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={true}
      deleteButton={true}
      addNew={true}
      path="shop"

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

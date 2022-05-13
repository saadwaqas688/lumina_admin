
import React, { useEffect, useState } from 'react'
import AddClass from './addClass';
import {Skeleton} from '@mui/material';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';
import { deleteAsset, deleteService, getService } from '../../../services/services';
import Popup from '../../UI/Popup/Popup';
import Table from '../../UI/Table/Table';
import AddClassCategory from './addClassCategory';
const headCells = [
    { id: 'fullName', label: 'Name' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'In Stock' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ViewAllClassCategories() {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const getAllProducts = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("classCategories")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              firstValue:doc.data().name,
              secondValue:doc.data().price,
              thirdValue:doc.data().quantity,
              ...doc.data()})
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
       getAllProducts()
        // }
       },[ ])
      
      const deleteProduct = async (id,url) => {
        console.log('ViewAllProducts',url)
        
        await deleteService("classCategories",id)
        if(url){
          deleteAsset(url)
        }
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
      setRecordForEdit={setRecordForEdit}
      handelDelete={deleteProduct}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={true}
      deleteButton={true}
      addNew={true}
      path="classCategories"
      searchBar={true}
      firstButtonText={false}
      secondButtonText={false}

/>
   
              <Popup
              title="Add Category"
              openPopup={openPopup}
            //   setOpenPopup={setOpenPopup}
              handleModal={handleModal}

          >
        <AddClassCategory
                         records={records}
                         setRecords={setRecords}
                         handleModal={handleModal}
                         getAllProducts={getAllProducts}
                         recordForEdit={recordForEdit}
        />

          </Popup>
          </>:
          <></>

}


        </PageWrapper>

    )
}

import React, { useEffect, useState } from 'react'
import FormikForm from './addMeal';
import {Skeleton} from '@mui/material';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
import Table from '../../UI/Table/Table';
import Popup from '../../UI/Popup/Popup';
const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'status', label: 'Status', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ViewAllMeals() {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const getAllMeals = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("meal")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,
              firstValue:doc.data().title,
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
       getAllMeals()
        // }
       },[ ])
      
      const deleteProduct = async (record,url) => {
        console.log('ViewAllProducts',url)
        
        await deleteService("shop",record.id)
        if(url){
          deleteAsset(url)
        }
        await deleteService("meal",record.id)
        const result =records.filter((item)=>item.id!==record.id)
        setRecords(result)
      };

      const updateStatus = async (id,status) => {
        const newStatus= status==="featured"?"notFeatured":"featured";
        await updateService('meal',id,{status:newStatus})

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
      setRecordForEdit={setRecordForEdit}
      handelDelete={deleteProduct}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={true}
      deleteButton={true}
      updateStatus={updateStatus}
      addNew={true}
      path="meal"

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
                         getAllMeals={getAllMeals}
                         recordForEdit={recordForEdit}
        />

          </Popup>
          </>:
          <></>

}


        </PageWrapper>

    )
}

import React, { useEffect, useState } from 'react'
import {Skeleton} from '@mui/material';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';
import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
import AddClass from './addClass';
import Popup from '../../UI/Popup/Popup';
import Table from '../../UI/Table/Table';
const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'duration', label: 'Duration' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ViewAllClasses() {

    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)

    const durationConverter=(duration)=>{
      if(duration<60){
        return duration.toFixed(2)+" sec"
      }else{
        return (duration/60).toFixed(2)+" min"
      }
    }
    const getAllClasses = async() => {
        let list=[]
        setLoading(true)
        const querySnapshot =await getService("classes")

        querySnapshot.forEach((doc) => {
        
          list.push({id:doc.id,
              firstValue:doc.data().title,
              secondValue:durationConverter(doc.data().duration),
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
       getAllClasses()
       },[ ])
      
      const deleteProduct = async (id,url) => {
        await deleteService("classes",id)
        if(url){
          deleteAsset(url)
        }
        const result =records.filter((item)=>item.id!==id)
        setRecords(result)
      };

      const updateStatus = async (id,status) => {
        const newStatus= status==="featured"?"notFeatured":"featured";
        await updateService('classes',id,{status:newStatus})

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
          

{   loading  ? (
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
      path="Classes"

/>
   
              <Popup
              title="Product"
              openPopup={openPopup}
            //   setOpenPopup={setOpenPopup}
              handleModal={handleModal}

          >
        <AddClass
                         records={records}
                         setRecords={setRecords}
                         handleModal={handleModal}
                         getAllClasses={getAllClasses}
                         recordForEdit={recordForEdit}
        />

          </Popup>
          </>:
          <></>

}


        </PageWrapper>

    )
}

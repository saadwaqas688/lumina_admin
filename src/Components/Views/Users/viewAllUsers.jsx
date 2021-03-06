import React, { useEffect, useState } from 'react'
import {Skeleton} from '@mui/material';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';
import { getService, updateService } from '../../../services/services';
import Table from '../../UI/Table/Table';


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
    const handelFetch = async() => {
        setLoading(true)
        let list=[];      
      const querySnapshot =await getService("Users")

      querySnapshot.forEach((doc) => {
        list.push({id:doc.id,
            firstValue:doc.data().name,
            secondValue:doc.data().email,
            thirdValue:doc.data().phone,
          
          ...doc.data()})
            });
      
      setRecords(list)
      setLoading(false)

      
      };

    useEffect(()=>{
        // if(!openPopup){
        handelFetch()
        // }
       },[ ])

  
    const updateStatus = async (id,status) => {
      const newStatus= status==="blocked"?"active":"blocked";
      await updateService('Users',id,{status:newStatus})
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
    
    <Table records={records} 
    
      headCells={headCells}
      viewDetailsButton={true}
      editButton={false}
      deleteButton={false}
      updateStatus={updateStatus}
      path='users'
/> :
          <></>

}


        </PageWrapper>

    )
}

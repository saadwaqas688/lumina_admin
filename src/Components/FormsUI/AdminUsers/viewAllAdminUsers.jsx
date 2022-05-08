import React, { useEffect, useState } from 'react'
import Popup from '../Popup/Popup';
import { Skeleton, Stack } from '@mui/material';
import PageWrapper from '../../../PageWrapper';
import AddAdminUser from './addAdminUser';
import Table from '../Table/Table';
import { getService, updateService } from '../../../services/services';


const headCells = [
    { id: 'fullName', label: 'Email' },
    { id: 'price', label: 'Created At' },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]

export default function ViewAllAdminUsers() {
    const [records, setRecords] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)




    const handelFetch = async() => {
        setLoading(true)
        let list=[];
        const querySnapshot =await getService("adminUsers")
        querySnapshot.forEach((doc) => {
        list.push({id:doc.id,
                  firstValue:doc.data().email,
                  secondValue:(new Date(doc.data().time.toDate())).toDateString(),
                  ...doc.data()})
                                    });

      setRecords(list)
      setLoading(false)
     console.log(list)
      
      };

    useEffect(()=>{
        if(!openPopup){
        handelFetch()
        }
       },[openPopup])

      const updateStatus = async (id,status) => {
          const newStatus= status==="blocked"?"active":"blocked";
          await updateService('adminUsers',id,{status:newStatus})
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
            
     { loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>):
            records ?

        <>
            <Table records={records} 
    
            setOpenPopup={setOpenPopup} 
            headCells={headCells}
    //   openPopup={openPopup}
           viewDetailsButton={false}
           editButton={false}
           updateStatus={updateStatus}
/>
            
            <Popup
                title="Add Admin User"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                    <AddAdminUser
                     setOpenPopup={setOpenPopup}
                    />
            </Popup>
            </>
            :<></>
}
</PageWrapper>

    )
}

  
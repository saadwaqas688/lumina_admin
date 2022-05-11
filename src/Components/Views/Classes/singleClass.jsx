import React, { useEffect, useState } from 'react';
import { doc ,getDoc} from "firebase/firestore"; 
import {db} from "../../../config/Firebase/firebase"
import { useParams } from "react-router-dom";
import { Box } from '@material-ui/core';
import { Skeleton, Stack } from '@mui/material';
import SingleClassDetails from './singleClassDetails';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';

export default function SingleClass() {
  const [data,setData]=useState()
  const [loading, setLoading] = useState(false);

  let { id } = useParams();

    

    useEffect(() => {
      // declare the data fetching function
       if(id){
const handelFetch = async() => {
  setLoading(true)
    const docRef = doc(db, "classes", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
      setLoading(false)

    } else {
      console.log("No such document!");
      setLoading(false)
    }
    
    };
      // call the function
      handelFetch()
        // make sure to catch any error
        .catch(console.error);
  }
    }, [id])

  return (
    <PageWrapper>
     <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>{ data ?
          <SingleClassDetails data={data}/>:<></>
        }
        </>
      )}
    </Box>

</PageWrapper>
  );
}

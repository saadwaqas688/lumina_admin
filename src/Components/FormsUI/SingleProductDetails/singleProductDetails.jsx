import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { doc ,getDoc} from "firebase/firestore"; 
import {db} from "../../../config/Firebase/firebase"
import { useParams } from "react-router-dom";
import PageWrapper from '../../../PageWrapper';
import { Box } from '@material-ui/core';
import { Skeleton, Stack } from '@mui/material';
import SingleProduct from './singleProduct';

export default function SingleProductDetails() {
  const [data,setData]=useState()
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
    
const handelFetch = async() => {
  setLoading(true)
    const docRef = doc(db, "shop", id);
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

    useEffect(()=>{
        if(id){
            handelFetch()

        }
    },[])

    console.log('data',data)

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
          <SingleProduct data={data}/>:<></>
        }
        </>
      )}
    </Box>

</PageWrapper>
  );
}

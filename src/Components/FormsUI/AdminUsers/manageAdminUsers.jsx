
//   import { Box } from "@material-ui/core";
// import React from "react";
// import PageWrapper from "../../../PageWrapper";
  
//   const ManageAdminUsers = () => {
//     return (

//         <PageWrapper>
// <Box flex={4} p={{ xs: 0, md: 2 }}>

//     <h1>ManageAdminUsers</h1>
//     </Box>
//     </PageWrapper>

//     );
//   };
  
//   export default ManageAdminUsers;
  import React, { useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Avatar, Typography } from '@material-ui/core';
import useTable from "../Table/useTable";
import Controls from '../controls/Controls';
import FormikForm from '../Product/addProduct';
import Popup from '../Popup/Popup';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Search from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CircularIndeterminate from '../Loader';
import { collection ,getDocs,deleteDoc,doc} from "firebase/firestore"; 
import {db} from "../../../config/Firebase/firebase"
import { Box, Skeleton, Stack } from '@mui/material';
import { Link as RouterLink} from "react-router-dom";
import PageWrapper from '../../../PageWrapper';
import { textAlign } from '@mui/system';
import Button from '../controls/Button';
import ActionButton from '../controls/ActionButton';
import AddAdminUser from './addAdminUser';





const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'fullName', label: 'Email' },
    { id: 'price', label: 'Created At' },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]

export default function ManageAdminUsers() {

    const classes = useStyles();
    // const [records, setRecords] = useState(ProductDetailservice.getAllProductDetails())
    const [records, setRecords] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [loading, setLoading] = useState(false)

    // console.log('filterFn',filterFn)
    // console.log('records',records)
    const items=searchResult?searchResult:records;

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(items, headCells, filterFn,setPage,setRowsPerPage,page,rowsPerPage,pages);

    const handleSearch = e => {
        let target = e.target;
        setSearchTerm(target.value)
        const result=records.filter(x => x.email.toLowerCase().includes(target.value))
        setSearchResult(result)

        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else{
                   
                  return result;
                }
 
            }
        })

    }


    const handelFetch = async() => {
        setLoading(true)
        let list=[];
      
      
      
      const querySnapshot = await getDocs(collection(db, "adminUsers"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,...doc.data()})
      
      
        // console.log(doc.id, " => ", doc.data());
      });
      
      setRecords(list)
      setLoading(false)

      
      };


    useEffect(()=>{
        setPage(0)
    },[searchTerm])

    useEffect(()=>{
        if(!openPopup){
        handelFetch()
        }
       },[openPopup])
      
      const handelDelete = async (id) => {
        await deleteDoc(doc(db, "adminUsers", id));
      
        const result =records.filter((item)=>item.id!=id)
      
        setRecords(result)
      
        console.log('result++++',result)
      
      };

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    console.log('records',records)
    return (
        <PageWrapper>
       
        <Box flex={4} p={{ xs: 0, md: 2 }}>
        { loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>):
        <>
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm /> */}
                <Toolbar>
                    <Controls.Input
                        label="Search Product"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                       <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true) }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>
                                         

                               <Typography variant="body2" color="text.secondary" align='justify' >
                                              {item.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Typography variant="body2" color="text.secondary" >

                                    22 june
                                        </Typography>
                                        </TableCell>
                                                                     
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => { handelDelete(item.id) }}  
                                            >
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>

                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
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
}
</Box>
</PageWrapper>

    )
}

  
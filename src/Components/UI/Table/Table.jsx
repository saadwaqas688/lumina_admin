import React, { useEffect, useState } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment,Typography } from '@material-ui/core';
import useTable from "../Table/useTable";
import Search from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Box} from '@mui/material';
import { Link as RouterLink} from "react-router-dom";
import ActionButton from '../controls/ActionButton';
import EditIcon from '../../Icons/EditIcon';
import DeleteIcon from '../../Icons/DeleteIcon';
import Button from '../controls/Button';
import Input from '../controls/Input';





const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%',
    },
    searchInput2: {
        width: '100%',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


export default function Table({records,
    setOpenPopup,
    setRecordForEdit,
    handelDelete,
    headCells,
    viewDetailsButton,
    editButton,
    deleteButton,
    updateStatus,
    addNew,
    path

}) {

    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
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
        const result=records.filter(x => x.firstValue.toLowerCase().includes(target.value.toLowerCase()))
        setSearchResult(result)

        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else{
                   
                  return result;
                }
 
            }
        })

    }

    useEffect(()=>{
        setPage(0)
    },[searchTerm])

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    return (
        <>
        <Box flex={4} p={{ xs: 0, md: 2 }}>

            <Paper >
                <Toolbar>
                    <Input
                        label="Search Product"
                        className={addNew?classes.searchInput:classes.searchInput2}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />{ addNew &&
                       <Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true) }}
                    />
                      }
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {    

                            recordsAfterPagingAndSorting().map(item =>{

                                const assetUrl=item.videoUrl?item.videoUrl:item.image?item.image:null
                                
                                return (<TableRow key={item.id}>
                                    <TableCell>
                                    { item.image?
                                        <Box sx={{ display:'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
                                          <img src={item.image} 
                                          alt="Preview" 
                                          width='100' 
                                          height='100' 
                                          style={{borderRadius:'10px'}}
                                          />
                                <Typography variant="body1" color="text.secondary"  >
                                              {item.firstValue}
                               </Typography>
                                     </Box>:item.videoUrl?
                                           <Box sx={{ display:'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
                                           <video
                                           src={item.videoUrl}
                                               controls
                                           style={{ width: "200px", height: "200px" }}
                               />
                                 <Typography variant="body1" color="text.secondary"  >
                                               {item.firstValue}
                                </Typography>
                                </Box>:
                               <Typography variant="body1" color="text.secondary"  >
                                     {item.firstValue}
                              </Typography>

                                        }
                                </TableCell>
                                    { item.secondValue &&
                                     
                                    <TableCell align="center">
                                    <Typography variant="body2" color="text.secondary" >
                                    {item.secondValue}
                                        </Typography>
                                        </TableCell>
                                        }
                                        { item.thirdValue &&
                                    <TableCell>
                                        
                                    <Typography variant="body2" color="text.secondary" >
                                    {item.thirdValue}
                                        </Typography>
                                       </TableCell>
                                        }
                                    { viewDetailsButton &&
                                    <TableCell align="center">
                                    <RouterLink to={`/${path}/${item.id}`}  style={{ textDecoration: 'none' }} >
                                    <ActionButton variant="contained" color="primary">
                                       View Details
                                    </ActionButton>

                                     </RouterLink>
                                    </TableCell>
                                        }
                                        { item.status &&
                                    <TableCell align="center">
                                    <ActionButton
                                     variant="contained" 
                                    color={item.status==="blocked"?"":"primary"}
                                    onClick={() => { updateStatus(item.id,item.status) }} 
                                    >
                                    {item.status}
                                    </ActionButton>
                                    </TableCell>
                                        }   
                                 {  (editButton  || deleteButton)   &&
                                    <TableCell align="center">
                                        {  editButton &&
                                    <EditIcon  
                                      variant="contained"
                                      color="primary"
                                      onClick={() => { openInPopup(item) }} />
                                        }
                                 {    deleteButton  && 
                                        <DeleteIcon
                                        variant="contained"
                                        color="primary"
                                        onClick={() => { handelDelete(item.id,assetUrl) }}  
                                         />
                                 }
                                    </TableCell>
                                  }

                                </TableRow>)
                            }
                            )
                                }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            </Box>

            </>

    )
}



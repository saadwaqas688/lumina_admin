// import React, { useEffect, useState } from 'react'
// import {Skeleton} from '@mui/material';
// import PageWrapper from '../../UI/PageWrapper/PageWrapper';
// import { deleteAsset, deleteService, getService, updateService } from '../../../services/services';
// import AddClass from './addClass';
// import Popup from '../../UI/Popup/Popup';
// import Table from '../../UI/Table/Table';
// const headCells = [
//     { id: 'title', label: 'Title' },
//     { id: 'duration', label: 'Duration' },
//     { id: 'Details', label: 'Details', disableSorting: true },
//     { id: 'Actions', label: 'Actions', disableSorting: true },

// ]
// export default function ViewAllClasses() {

//     const [records, setRecords] = useState()
//     const [loading, setLoading] = useState(false)
//     const [openPopup, setOpenPopup] = useState(false)
//     const [recordForEdit, setRecordForEdit] = useState(null)

//     const durationConverter=(duration)=>{
//       if(duration<60){
//         return duration.toFixed(2)+" sec"
//       }else{
//         return (duration/60).toFixed(2)+" min"
//       }
//     }
//     const getAllClasses = async() => {
//         let list=[]
//         setLoading(true)
//         const querySnapshot =await getService("classes")

//         querySnapshot.forEach((doc) => {
        
//           list.push({id:doc.id,
//               firstValue:doc.data().title,
//               secondValue:durationConverter(doc.data().duration),
//               ...doc.data()})
//                 });
//         setRecords(list)
//         setLoading(false)
//             };


//       function handleModal(){
//         setRecordForEdit('')
//         setOpenPopup(!openPopup)
//     }
//     useEffect(()=>{
//        getAllClasses()
//        },[ ])
      
//       const deleteProduct = async (id,url) => {
//         await deleteService("classes",id)
//         if(url){
//           deleteAsset(url)
//         }
//         const result =records.filter((item)=>item.id!==id)
//         setRecords(result)
//       };

//       const updateStatus = async (id,status) => {
//         const newStatus= status==="featured"?"notFeatured":"featured";
//         await updateService('classes',id,{status:newStatus})

//         const updatedData = records.map((item) => {
            
//           if(item.id === id){
//               item.status=newStatus
//           } 
//           return item
          
//           });   
//         setRecords(updatedData) 
//     }
//     return (
//         <PageWrapper>
          

// {   loading  ? (
//     <>
//           <Skeleton variant="text" height={100} />
//           <Skeleton variant="text" height={20} />
//           <Skeleton variant="text" height={20} />
//           <Skeleton variant="rectangular" height={300} />
//     </>
// ):

//     records ?
//     <>
//     <Table records={records} 
    
//       setOpenPopup={setOpenPopup} 
//       setRecordForEdit={setRecordForEdit}
//       handelDelete={deleteProduct}
//       headCells={headCells}
//       viewDetailsButton={true}
//       editButton={true}
//       deleteButton={true}
//       updateStatus={updateStatus}
//       addNew={true}
//       path="Classes"

// />
   
//               <Popup
//               title="Product"
//               openPopup={openPopup}
//             //   setOpenPopup={setOpenPopup}
//               handleModal={handleModal}

//           >
//         <AddClass
//                          records={records}
//                          setRecords={setRecords}
//                          handleModal={handleModal}
//                          getAllClasses={getAllClasses}
//                          recordForEdit={recordForEdit}
//         />

//           </Popup>
//           </>:
//           <></>

// }


//         </PageWrapper>

//     )
// }


import React, { useEffect, useState } from 'react'
import AddClass from './addClass';
import {Skeleton} from '@mui/material';
import PageWrapper from '../../UI/PageWrapper/PageWrapper';
import { deleteAsset, deleteService, getService, updateService} from '../../../services/services';
import Popup from '../../UI/Popup/Popup';
import Table from '../../UI/Table/Table';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/Firebase/firebase';
const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'In Stock' },
    { id: 'Details', label: 'Details', disableSorting: true },
    { id: 'Actions', label: 'Actions', disableSorting: true },

]
export default function ViewAllClasses() {
  
    const [workOuts, setWorkOuts] = useState()
    const [equipments, setEquipments] = useState()
    const [records, setRecords] = useState()
    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState(false)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const getAllClasses = async() => {
      // const data={

      //   categoryName:'test1',
      //   categoryDescription:'testDescription',
      //   image:'testImage',
      //   classes: [
      //     { className:'firstClass',
      //       shedule:[{start:'9am',end:'10am'},{start:'12am',end:'1am'}],
      //        workOuts:[
      //                 {id:'1',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //                 {id:'2',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //                 {id:'3',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //                 ],
    
      //      },
      //      { className:'secondClass',
      //      shedule:[{start:'9am',end:'10am'},{start:'12am',end:'1am'}],
      //      workOuts:[
      //               {id:'3',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //               {id:'4',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //               {id:'5',name:'firstWorkOut',duration:'10min',equipments:['firstEquiment','secondEquiment']},
      //               ],
    
      //    }
      //        ]
    
      // }

   
    
         
                
      
      // await postService("/classCategories//classes",)

        let list=[]      
        let newList=[]
        setLoading(true)
        const querySnapshot =await getService("classCategories")

        querySnapshot.forEach((doc) => {
          list.push({id:doc.id,firstValue:doc.data().title,

              ...doc.data()})
                });

                // list[0].classes.forEach((item) => {
                //   newList.push({id:item.id,firstValue:item.title,
        
                //       ...item})
                //         });
                list.map((item)=>{
                  return(
                 item.classes.map((item)=> {
                   return(
                    item.firstValue=item.title,
                    item.secondValue=item.category.value,
                    newList.push(item)
                   )
                  }))
                })


                console.log('allClasses+++++====',list)

        setRecords(newList)
        setLoading(false)
            };
            
            const getAllClassCategories = async() => {
              let list=[]
              setLoading(true)
              const querySnapshot =await getService("classCategories")

      
              querySnapshot.forEach((doc) => {
                list.push({id:doc.id,
                    value:doc.data().name})
                      });
              setCategories(list)
              setLoading(false)
                  };

                  const getAllWorkOuts = async() => {
                    let list=[]
                    setLoading(true)
                    const querySnapshot =await getService("workOuts")
            
                    querySnapshot.forEach((doc) => {
                      list.push({id:doc.id,value:doc.data().name,
                          ...doc.data()})
                            });
                            console.log('listsaturday++++++',list)
                            setWorkOuts(list)
                    setLoading(false)
                        };
                        const getAllProducts = async() => {
                          let list=[]
                          setLoading(true)
                          const querySnapshot =await getService("shop")
                    
                          querySnapshot.forEach((doc) => {
                            list.push({id:doc.id,
                                value:doc.data().name,
                                ...doc.data()})
                                  });
                          setEquipments(list)
                          setLoading(false)
                              };

      function handleModal(){
        setRecordForEdit('')
        setOpenPopup(!openPopup)
    }
    useEffect(()=>{


       getAllClasses()
       getAllClassCategories()
       getAllProducts()
      
       },[ ])
      
      const deleteClass = async (item,url) => {
        console.log('itemformviewlallclasses',item)
        const docRef = doc(db, "classCategories", item.category.id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        console.log("Document data viky: from viewallcallsses", docSnap.data());

          let list=docSnap.data()
         list.classes = list.classes.filter((i)=>i.id!==item.id);
          await updateService("classCategories",item.category.id,list)
            const result =records.filter((i)=>i.id!==item.id)
            setRecords(result)
    
        } else {
          console.log("No such document!");
          // setLoading(false)
        }        
        if(url){
          deleteAsset(url)
        }
     
      };

      console.log('records meray records',records)
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

    records  && categories ?
    <>
    <Table records={records} 
    
    setOpenPopup={setOpenPopup} 
      setRecordForEdit={setRecordForEdit}
      handelDelete={deleteClass}
      headCells={headCells}
      viewDetailsButton={true}
      editButton={true}
      deleteButton={true}
      addNew={false}
      path="Classes"
      searchBar={false}
      firstButtonText="View Categories"
      secondButtonText="Add Class"

/>
        <Popup
              title="Product"
              openPopup={openPopup}
            //   setOpenPopup={setOpenPopup}
              handleModal={handleModal}

          >
        <AddClass 
                         records={records}
                         workOuts={workOuts}
                         categories={categories}
                         setRecords={setRecords}
                         handleModal={handleModal}
                         getAllProducts={getAllClasses}
                         recordForEdit={recordForEdit}
                         equipments={equipments}

        />

          </Popup>
          </>:
          <></>

}


        </PageWrapper>

    )
}

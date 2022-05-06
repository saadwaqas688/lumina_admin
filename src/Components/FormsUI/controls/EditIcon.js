import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ActionButton from './ActionButton';


 const EditIcon=(props)=> {
     console.log('props',props)


    return (
        <ActionButton
   
       {...props}
      >
       <EditOutlinedIcon fontSize="small" />
      </ActionButton>
        // <Button
        //     className={`${classes.root} ${classes[color]}`}
        //     onClick={onClick}
        //     variant = {variant}
        //     {...props}
        //     >
        //     {children}
        // </Button>
    )
}


export default EditIcon

// ActionButton.defaultProps={
//     variant:"outlined"
// }
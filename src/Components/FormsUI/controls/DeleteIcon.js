import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from './ActionButton';


 const DeleteIcon=(props)=> {
    return (
        <ActionButton
       {...props}
      >
     <CloseIcon fontSize="small"/>
      </ActionButton>
    )
}


export default DeleteIcon

// ActionButton.defaultProps={
//     variant:"outlined"
// }
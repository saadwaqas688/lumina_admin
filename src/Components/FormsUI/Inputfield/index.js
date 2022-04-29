import React from 'react';
import { useField, useFormikContext } from 'formik';
import {storage}  from '../../../config/Firebase/firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const TextfieldWrapper = ({
  name,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);

  const handleChange = evt => {
    setFieldValue('loader',true)

    const  value  = evt.target.files[0];
    console.log(value)
    const name2= new Date().getTime() + "" +value.name
    console.log('name+++++',name2)
    const storageRef = ref(storage, "photos/"+ name2);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    // if(progress==100){
    //     setCheck(false)
    // }
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
        break;
    }
  }, 
  (error) => {
    console.log(error)
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setFieldValue(name, value);
      setFieldValue('imageUrl',downloadURL)
      setFieldValue('loader',false)

    });
  }
);
    };

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    onChange: handleChange,

  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }

//   useEffect(()=>{
//     if(selectedFile){
//     const name= new Date().getTime() + "" +selectedFile?.name
//     console.log('name+++++',name)
//     const storageRef = ref(storage, name);
//     const uploadTask = uploadBytesResumable(storageRef, selectedFile);
// uploadTask.on('state_changed', 
//   (snapshot) => {
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     if(progress==100){
//         setCheck(false)
//     }
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//         default:
//         break;
//     }
//   }, 
//   (error) => {
//     console.log(error)
//   }, 
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//       console.log('File available at', downloadURL);
//       setUrl(downloadURL)
//     });
//   }
// );
//     }

//   },[selectedFile])
  return (
    <>
      <input id='file' name={name}  type="file" 
      onChange={handleChange}
    //   onChange={(event) => {
    //   setFieldValue(name, event.currentTarget.files[0]);
    // }} 
     />
    </>
  );
};

export default TextfieldWrapper;
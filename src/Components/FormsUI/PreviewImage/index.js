// import React from 'react';

// const PreviewImage = ({file}) => {

//   // const [preview, setPreview] = React.useState(null);

//   // const reader = new FileReader();

//   // reader.readAsDataURL(file);

//   // reader.onload = () => {

//   //   setPreview(reader.result);

  

//   return (

//     <div className='text-center'>

//       <img src="https://firebasestorage.googleapis.com/v0/b/task-bdbaf.appspot.com/o/1650967825073download%20(2).jpeg?alt=media&token=84494e3c-afce-44e8-b371-108da78594dd" alt="Preview" width='100' height='100' />

//     </div>

//   )

// }

// export default PreviewImage

import React from 'react';

const PreviewImage = ({url,file}) => {

  const [preview, setPreview] = React.useState(null)
  if(url){
    console.log('i am called')

  }else{
    const reader = new FileReader();

    reader.readAsDataURL(file);
  
    reader.onload = () => {
  
      setPreview(reader.result);
  
    }
  }

  
  // console.log('preview',preview)

  return (
    <div>

      <img src={url?url:preview} alt="Preview" 
      width="80%" 
      height="400px" 
      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",borderRadius:"10px",objectFit:"fill"}}     
      />

    </div>
  )

}

export default PreviewImage
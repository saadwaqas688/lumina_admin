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

const PreviewImage = ({file}) => {

  const [preview, setPreview] = React.useState(null);

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {

    setPreview(reader.result);

  }

  return (

    <div className='text-center'>

      <img src={preview} alt="Preview" width='100' height='100' />

    </div>

  )

}

export default PreviewImage
import React from "react";
import { Formik, Form, FieldArray} from "formik";
// import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";
import Textfield from "../Textfield";
import PreviewImage from "../PreviewImage";
import Inputfield from "../Inputfield";
import Select from "../Select";
import Button from "../Button";
import FormButton from "../DynamicButton";
import { collection,  addDoc } from "firebase/firestore"; 
import {db} from '../../../config/Firebase/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },

  formWrapper: {
    padding: theme.spacing(3),

    height: "auto",
    margin: "auto",
    width: "80%",
    marginTop: "50px",
  },
}));

const INITIAL_FORM_STATE = {
  name: "",
  price: "",
  discountPrice:"",
  quantity: "",
  description: "",
  colors: ['Orange'],
  file: null,
  imageUrl:'',
  loader:false
};

// const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg", "image/gif"];

// const FORM_VALIDATION = Yup.object().shape({
//   name: Yup.string()
//     .typeError("Please enter a valid phone number")
//     .required("Required"),
//   price: Yup.number().integer().required("Required"),
//   quantity: Yup.number()
//     .integer()
//     .typeError("Please enter a valid phone number")
//     .required("Required"),

//   description: Yup.string().required("Required"),
//   colors: Yup.array()
//     .of(
//       Yup.string("String is Required!")
//         .min(4, "Too Short")
//         .max(20, "Too Long")
//         .required("Required")
//     )
//     .min(1, "Atleast One Social Media is Required!")
//     .required("Required"),
//   file: Yup.mixed()
//     .nullable()
//     .required("Required Field")
//     .test(
//       "type",
//       "Invalid file format selection",
//       (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
//     ),
// });

const quantity={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10"}
const FormikForm = ({recordForEdit,records,setRecords,handleModal

}) => {
  console.log('recordForEdit',recordForEdit)
  const initialValues=recordForEdit?recordForEdit:INITIAL_FORM_STATE;

  const classes = useStyles();
//   const [field] = useField(INITIAL_FORM_STATE.file);

//   useEffect(()=>{
// 	console.log('values',field)

//   },[field])
async function  handelclick(values) {
  console.log('values',values)
  let data=records;
  const record={
    colors:values.colors,
    description:values.description,
    image:values.imageUrl?values.imageUrl:values.image,
    likedBy:[], 
    name:values.name, 
    numberOfViews:[],
    price:values.price,
    quantity:values.quantity,
    rating:"",
    discountPrice:values.discountPrice
    // file:values.file
 }
    await addDoc(collection(db, "shop"), record);
    data.push(record);
    setRecords(data);    
    handleModal()
  }
  return (
    <Paper className={classes.formWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{
                  ...initialValues
                  
                }}
                // validationSchema={FORM_VALIDATION}
                onSubmit={(values) => handelclick(values)
                }
                render={({ values }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Textfield name="name" label="Name" size="small" />
                      </Grid>

                      <Grid item xs={3}>
                        <Textfield name="price" label="Price" size="small" />
                      </Grid>
                      <Grid item xs={3}>
                        <Textfield name="discountPrice" label="Discount Price" size="small" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          minRows={4}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Select
                          name="quantity"
                          label="Quantity"
                          size="small"
                          options={quantity}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FieldArray
                          name="colors"
                          render={(arrayHelpers) => (
                            <div>
                              {
                                values.colors && values.colors.length > 0 && (
                                  <>
                                    <Grid
                                      container
                                      spacing={2}
                                      style={{ marginBottom: "10px" }}
                                    >
                                      {values.colors.map((friend, index) => (
                                        <Grid item xs={4}>
                                          <div key={index}>
                                            <Textfield
                                              name={`colors.${index}`}
                                              label="color"
                                              size="small"
                                            />
                                          </div>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </>
                                )

                              }
                              <>
                                {values.colors.length > 0 && (
                                  <FormButton
                                    style={{ marginRight: "10px" }}
                                    color="secondary"
                                    onClick={() =>
                                      arrayHelpers.remove(
                                        values.colors.length - 1
                                      )
                                    } // remove a friend from the list
                                  >
                                    Remove color
                                  </FormButton>
                                )}
                                <FormButton
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      values.colors.length,
                                      ""
                                    )
                                  }
                                >
                                  Add Color
                                </FormButton>
                              </>
                            </div>
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Inputfield name="file" />
                        {recordForEdit && (!values.loader && !values.file)?
                        <PreviewImage url={recordForEdit.image} />:
                        <></>
                        }

                        {values.loader?<h1>Loading.....</h1> : 
                        values.file ?
                        <PreviewImage file={values.file} />:
                        <></>
                      }
                      </Grid>

                      <Grid item xs={12}>
                        <Button>Submit Form</Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              ></Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormikForm;

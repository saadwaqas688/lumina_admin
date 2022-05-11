import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper} from "@material-ui/core";
import Textfield from "../Textfield";
import PreviewImage from "../PreviewImage";
import Inputfield from "../Inputfield";
import {storage } from "../../../config/Firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ActionButton from "../controls/ActionButton";
import { deleteAsset, postService, updateService } from "../../../services/services";
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
const AddClass = ({ recordForEdit,handleModal,getAllClasses }) => {
  const [editMode, setEditMode] = useState(false);
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif"];

  const INITIAL_FORM_STATE = {
    title: "",
    duration: "",
    description:"",
    file: null,
    videoUrl: "",
    loader: false,
    error: null,
  };

  let FORM_VALIDATION = "";

  if (editMode) {
    FORM_VALIDATION = Yup.object().shape({
      title: Yup.string()
        .typeError("Please enter a valid phone number")
        .required("Required"),
        protiens: Yup.number().integer().required("Required"),
        fats: Yup.number().integer().required("Required"), 
        carbs: Yup.number().integer().required("Required"),
        ingredients:Yup.array(
          Yup.object({
            ingredient: Yup.string()
              .required('Ingredient name needed'),
              // .min(3, 'Ingredient name needs to be at least 3 characters')
              // .max(
              //   10,
              //   'Ingredient name needs to be at most 10 characters'
              // ),
            quantity: Yup.number()
              .required('Quantity needed')
              // .min(1, 'Quantity needs to be at least 1%')
              // .max(100, 'Quantity can be at most 100%'),
          })
        )
          .min(1, 'You need to provide at least 1 ingredient')
          .max(3, 'You can only provide 3 ingredient'),
          recipe: Yup.array()
          .of(
            Yup.string("String is Required!")
              .min(4, "Too Short")
              .max(20, "Too Long")
              .required("Required")
          )
          .min(1, "Atleast One Social Media is Required!")
          .required("Required"),

      // file: Yup.array()
      //   .required("Required Field")
    });
  } else {
    FORM_VALIDATION = Yup.object().shape({
      title: Yup.string()
      .typeError("Please enter a valid phone number")
      .required("Required"),
      protiens: Yup.number().integer().required("Required"),
      fats: Yup.number().integer().required("Required"), 
      carbs: Yup.number().integer().required("Required"),
      ingredients:Yup.array(
        Yup.object({
          ingredient: Yup.string()
            .required('Ingredient name needed')
            .min(3, 'Ingredient name needs to be at least 3 characters')
            .max(
              10,
              'Ingredient name needs to be at most 10 characters'
            ),
          quantity: Yup.number()
            .required('Quantity needed')
            // .min(1, 'Quantity needs to be at least 1%')
            // .max(100, 'Quantity can be at most 100%'),
        })
      )
        .min(1, 'You need to provide at least 1 ingredient')
        .max(3, 'You can only provide 3 ingredient'),
        recipe: Yup.array()
        .of(
          Yup.string("String is Required!")
            .min(4, "Too Short")
            .max(20, "Too Long")
            .required("Required")
        )
        .min(1, "Atleast One Social Media is Required!")
        .required("Required"),
      file: Yup.mixed()
        .nullable()
        .required("Required Field")
        .test(
          "type",
          "Invalid file format selection",
          (value) =>
            !value || (value && SUPPORTED_FORMATS.includes(value[2].type))
        ),
    });
  }
  const initialValues = recordForEdit ? recordForEdit : INITIAL_FORM_STATE;
  const [loader, setloader] = useState(false);

  const classes = useStyles();
  async function handelclick(values) {
    setloader(true);

    try {
      if (values.file[2]) {
        const value = values.file[2];
        const name2 = new Date().getTime() + "" + value.name;
        const storageRef = ref(storage, "videos/" + name2);
        const uploadTask = uploadBytesResumable(storageRef, value);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
            setloader(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const filedata = [values.file[0], values.file[1]];
                const record = {
                  title: values.title,
                  duration: values.file[3],
                  description:values.description,
                  videoUrl: downloadURL,
                  file: filedata,
                };
                if (recordForEdit) {
                  deleteAsset(values.videoUrl)
                  await updateService("classes",recordForEdit.id,record)
                  setloader(false);
                  handleModal();
                  getAllClasses()
                } else {
                  await postService("classes",record)
                  setloader(false);
                  handleModal();
                  getAllClasses()

                }
              }
            );
          }
        );
      } else {
      
        const record = {
          title: values.title,
          duration: values.duration,
          description:values.description,
          file: values.file,
        };
        await updateService("classes",recordForEdit.id,record)
        setloader(false);
        handleModal();
        getAllClasses()
      }
    } catch (error) {
      console.log("catchError", error);
    }
  }

  useEffect(() => {
    if (recordForEdit) {
      setEditMode(true);
    }
  }, [recordForEdit]);

  return (
    <Paper className={classes.formWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{
                  ...initialValues,
                }}
                // validationSchema={FORM_VALIDATION}
                onSubmit={(values) => handelclick(values)}
                render={({ values, errors, touched,submitForm}) => (
                  <>
                  {console.log(values)}
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Textfield name="title" label="Title" size="small" />
                      </Grid>
                      <Grid item xs={12}>
                        <Textfield
                          name="description"
                          label="Description"
                          size="small"
                          multiline={true}
                          minRows={4}
                        />
                      </Grid>
                      
                        <Grid item xs={12}>
                        {recordForEdit && editMode ? (
                            <PreviewImage url={recordForEdit.videoUrl} />
                          ) : values.file && values.file[2] ? (
                            <PreviewImage file={values.file[2]} />
                          ) : (
                            <></>
                          )}
                       
                        </Grid>
                           <Grid item xs={12}>
                        
                     
                       <Inputfield name="file" video={true} setEditMode={setEditMode} />
                     </Grid>
                      

                      <Grid item xs={12}>
                      <ActionButton variant="contained"  color="primary"  
                                    fullWidth
                                     onClick={() =>submitForm()
                                   
                                  } >
                       {loader ? "Please Wait..." : "Submit Form"}

                                    </ActionButton>
                      
                      </Grid>
                    </Grid>
                  </Form>
                  </>
                )}
              ></Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddClass;


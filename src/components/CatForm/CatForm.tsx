import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import styles from './catform.module.css'

export const CatForm:FunctionComponent = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      age: '',
      rate: '',
      favorite: 'false',
      description: ''
    },
    onSubmit: values => {
      console.log(values)
      fetch("https://cats.petiteweb.dev/api/single/DS/add", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: Date.now(),
          name: formik.values.name,
          image: formik.values.image,
          age: formik.values.age,
          rate: formik.values.rate,
          favorite: Boolean(formik.values.favorite.length),
          description: formik.values.description
      })
    })
.then( (response) => {
  console.log(response.status)
});
    },
  })

  return(
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField onChange={formik.handleChange} value={formik.values.name} type="text" name="" id="name" placeholder="Введите имя котика" required={true} variant="outlined"/>
        <TextField onChange={formik.handleChange} value={formik.values.age} type="text" name="" id="age" placeholder="Введите возраст котика числом" required={true} variant="outlined"/>
        <TextField onChange={formik.handleChange} value={formik.values.image} type="text" name="" id="image" placeholder="Введите ссылку на картинку из интернета" required={true} variant="outlined"/>
        <TextField onChange={formik.handleChange} value={formik.values.rate} type="text" name="" id="rate" placeholder="Введите рейтинг от 1 до 5" required={true} variant="outlined"/>
        <FormControlLabel control={<Checkbox id="favorite" onChange={formik.handleChange}/>} label="Любимый котик" />
        <TextField onChange={formik.handleChange} value={formik.values.description} type="text" name="" id="description" placeholder="Введите описание котика" required={true} variant="outlined" multiline={true}/>
        <Button variant="contained" type="submit">Добавить котика</Button>
      </form>
    </div>
  )
}
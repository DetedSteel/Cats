import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect, useState } from 'react';
import styles from './editCatForm.module.css';
import { CatsContext } from '../../Context/CatsContext';
import { CatT } from '../../types/app';
import { useNavigate } from 'react-router-dom';

export const EditCatForm: FC = () => {
  const navigate = useNavigate();

  const catContext = useContext(CatsContext);

  const [curCat, setCat] = useState<CatT>();

  const formik = useFormik({
    initialValues: {
      name: curCat ? curCat.name : '',
      image: curCat ? curCat.image : '',
      age: curCat ? curCat.age : '',
      rate: curCat ? curCat.rate : '',
      favorite: curCat ? curCat.favorite : false,
      description: curCat ? curCat.description : '',
    },
    onSubmit: () => {
      fetch(`https://cats.petiteweb.dev/api/single/DS/update/${catContext.id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Date.now(),
          name: formik.values.name,
          image: formik.values.image,
          age: formik.values.age,
          rate: formik.values.rate,
          favorite: formik.values.favorite,
          description: formik.values.description,
        }),
      }).then(response => {
        catContext.setUpdated(!catContext.updated);
        console.log(response.status);
      });
      catContext.catUpdateFn(false);
      navigate('/');
    },
  });

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/DS/show/`, { method: 'get' }).then(
      function (response) {
        if (response.ok) {
          response.json().then(data => {
            const cat: CatT = data.find((e: CatT) => e.id === catContext.id);
            setCat(cat);
            formik.values.name = cat.name;
            formik.values.image = cat.image;
            formik.values.age = cat.age;
            formik.values.rate = cat.rate;
            formik.values.favorite = cat.favorite;
            formik.values.description = cat.description;
          });
        } else {
          throw new Error('Ошибка при выполнении запроса');
        }
      },
    );
  }, []);

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          name=""
          id="name"
          placeholder={curCat ? curCat?.name : 'Введите имя котика'}
          required={true}
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.age}
          type="text"
          name=""
          id="age"
          placeholder={curCat ? curCat?.age.toString() : 'Введите возраст котика числом'}
          required={true}
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.image}
          type="text"
          name=""
          id="image"
          placeholder={curCat ? curCat?.image : 'Введите ссылку на картинку из интернета'}
          required={true}
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.rate}
          type="text"
          name=""
          id="rate"
          placeholder={curCat ? curCat?.rate.toString() : 'Введите рейтинг от 1 до 5'}
          required={true}
          variant="outlined"
        />
        <FormControlLabel
          control={
            <Checkbox
              id="favorite"
              checked={formik.values.favorite || false}
              onChange={formik.handleChange}
            />
          }
          label="Любимый котик"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          name=""
          id="description"
          placeholder={curCat ? curCat?.description : 'Введите опписаниу котика'}
          required={true}
          variant="outlined"
          multiline={true}
        />
        <Button variant="contained" type="submit">
          Добавить котика
        </Button>
      </form>
    </div>
  );
};

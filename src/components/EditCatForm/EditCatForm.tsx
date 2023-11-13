import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, FC, RefObject, useContext, useEffect, useRef, useState } from 'react';
import styles from './editCatForm.module.css';
import { CatsContext } from '../../Context/CatsContext';
import { CatT } from '../../types/app';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import { catSchema } from '../../validation/schemas';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';

export const EditCatForm: FC = () => {
  const navigate = useNavigate();

  const scrollTargetRef = useRef() as RefObject<HTMLInputElement>;

  function scrollHandle() {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  const [curCat, setCat] = useState<CatT>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CatT>();

  register;

  const formik = useFormik({
    initialValues: {
      name: curCat ? curCat.name : '',
      image: curCat ? curCat.image : '',
      age: curCat ? curCat.age : '',
      rate: curCat ? curCat.rate : '',
      favorite: curCat ? curCat.favorite : false,
      description: curCat ? curCat.description : '',
    },
    validationSchema: catSchema,
    onSubmit: () => {
      fetch(
        `https://cats.petiteweb.dev/api/single/${loginContext.username}/update/${catContext.id}`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: catContext.id,
            name: formik.values.name,
            image: formik.values.image,
            age: formik.values.age,
            rate: formik.values.rate,
            favorite: formik.values.favorite,
            description: formik.values.description,
          }),
        },
      ).then(response => {
        catContext.setUpdated(!catContext.updated);
        console.log(response.status);
      });
      catContext.catUpdateFn(false);
      navigate('/cats');
    },
  });

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => {
          const cat: CatT = data.find((e: CatT) => e.id === catContext.id);
          setCat(cat);
          setValue('name', cat.name);
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
    });
    scrollHandle();
  }, []);

  const h = document.documentElement.scrollHeight;

  return (
    <div className={styles.container} style={{ height: `${h}px` }} ref={scrollTargetRef}>
      <div
        className={styles.close}
        onClick={() => {
          catContext.catUpdateFn(false);
        }}
      >
        <CloseIcon color="error" sx={{ fontSize: 50 }} />
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        <label className="label">
          <span className="label-text">Имя котика</span>
        </label>
        <input className="my-input" {...register('name')} />
        <label>Возраст котика</label>
        <input className="my-input" {...register('age')} />
        <label>Ссылка на картинку</label>
        <input {...register('image')} className="my-input" />
        <label>Рейтинг котика</label>
        <input {...register('rate')} className="my-input" />
        <label className="label cursor-pointer">
          <span className="label-text">Любимый котик?</span>
          <input {...register('favorite')} type="checkbox" className="checkbox-primary checkbox" />
        </label>
        <textarea
          className="textarea textarea-primary resize-none overscroll-none overflow-y-hidden"
          rows={1}
          onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
            e.currentTarget.style.height = 'auto'
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight + 2}px`;
          }}
        ></textarea>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          name=""
          id="description"
          placeholder={curCat ? curCat?.description : 'Введите опписаниу котика'}
          variant="outlined"
          multiline={true}
          label="Описание котика"
        />
        <Button variant="contained" type="submit">
          Изменить котика
        </Button>
      </form>
    </div>
  );
};

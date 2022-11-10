import React from 'react';
import { AddCircle, Delete } from '@material-ui/icons';
import {
  Backdrop,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Theme,
  InputLabel,
} from '@material-ui/core';
import { useFormik, Field, Formik } from 'formik';

import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';
import { Topping } from '../../types/schema';
import { GET_TOPPINGS } from '../../hooks/graphql/topping/queries/get-toppings';
import { useQuery } from '@apollo/client';
import { PizzaItem } from './PizzaItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1, 4, 3, 5),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(5),
        width: '25ch',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  setSelectedPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toppingList?: any;
}

interface FormValues {
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
}

const PizzaModal = ({ selectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();
  const { data } = useQuery(GET_TOPPINGS);

  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  const initialValues = selectedPizza
    ? {
        id: selectedPizza.id,
        name: selectedPizza.name,
        description: selectedPizza.description,
        toppingIds: selectedPizza.toppings.map((topping: Topping) => topping.id),
        imgSrc: selectedPizza.imgSrc,
      }
    : {
        name: '',
        description: '',
        toppingIds: [],
        imgSrc: '',
      };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      selectedPizza?.id ? onUpdatePizza(values) : onCreatePizza(values);
      setOpen(!open);
    },
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      key={PizzaItem.name}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <h2>{selectedPizza ? 'Edit' : 'Add'} Pizza</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={(values: FormValues): void => {
              selectedPizza ? onUpdatePizza(values) : onCreatePizza(values);
              setOpen(!open);
              console.log('formik values: ', values);
            }}
          >
            <form onSubmit={formik.handleSubmit} className={classes.root} noValidate autoComplete="off">
              <Field
                component={TextField}
                id="name"
                label="Pizza Name"
                type="text"
                name="name"
                defaultValue={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Field
                component={TextField}
                id="description"
                label="Pizza Description"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <InputLabel>Toppings</InputLabel>
              <Field
                component={Select}
                label="Pizza Toppings"
                multiple
                value={formik.values.toppingIds}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputProps={{ name: 'toppingIds', id: 'toppingIds' }}
                renderValue={(selected: any): React.ReactNode => {
                  return data?.toppings
                    .filter((topping: Topping) => selected.includes(topping.id))
                    .map((topping: Topping) => <p key={topping.name}> - {topping.name}</p>);
                }}
                defaultValue={selectedPizza?.toppings}
              >
                {data?.toppings.map((topping: Topping) => (
                  <MenuItem value={topping.id} key={topping.id}>
                    {topping.name}
                  </MenuItem>
                ))}
              </Field>

              <Field
                component={TextField}
                id="imgSrc"
                label="Pizza Image"
                type="text"
                name="imgSrc"
                value={formik.values.imgSrc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <IconButton edge="end" aria-label="update" type="button" onClick={formik.submitForm}>
                <AddCircle />
              </IconButton>

              <IconButton
                edge="end"
                aria-label="delete"
                type="button"
                onClick={(): void => {
                  onDeletePizza(selectedPizza);
                  setOpen(false);
                }}
              >
                <Delete />
              </IconButton>
            </form>
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;

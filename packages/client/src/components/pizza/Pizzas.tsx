import React from 'react';
import { Container } from '@material-ui/core';
import PageHeader from '../common/PageHeader';
import PizzaList from './PizzaList';

const Pizzas: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizzas'} />
      {/* <img alt="under-construction" src="./codingcat.jpeg" /> */}
      <PizzaList />
    </Container>
  );
};

export default Pizzas;

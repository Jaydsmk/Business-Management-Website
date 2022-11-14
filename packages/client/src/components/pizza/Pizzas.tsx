import React from 'react';
import { Container } from '@material-ui/core';
import PageHeader from '../common/PageHeader';
import PizzaList from './PizzaList';

const Pizzas: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader pageHeader={'Pizzas'} />
      <PizzaList />
    </Container>
  );
};

export default Pizzas;

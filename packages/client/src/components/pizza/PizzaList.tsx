import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types/pizza';
import CardItemSkeleton from '../common/CardItemSkeleton';
import { PizzaItem } from './PizzaItem';

const PizzaList: React.FC = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);
  const [getError, setGetError] = useState(false);

  //console.log (data)

  if (error) {
    setGetError(true);
  }

  const displayErr = (
    <div>
      <p>Can't Display Pizzas</p>
    </div>
  );

  if (loading) {
    <div>
      <CardItemSkeleton data-testid="pizza-list-loading" />
    </div>;
  }

  const pizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} />
  ));

  // console.log(pizzaList);

  return (
    <div>
      {getError ? displayErr : ''}
      {pizzaList}
    </div>
  );
};

export { PizzaList };

import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types/pizza';
import CardItemSkeleton from '../common/CardItemSkeleton';
import { PizzaItem } from './PizzaItem';
import PizzaModal from './pizzaModal';

const PizzaList: React.FC = () => {
  const { loading, data, error } = useQuery(GET_PIZZAS);
  const [getError, setGetError] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  const handleOpen = (pizza?: Pizza): void => {
    setSelectedPizza(pizza);
    setOpen(true);
  };

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
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} handleOpen={handleOpen} />
  ));

  const toppingList = data?.toppings;

  return (
    <>
      <div>
        {getError ? displayErr : ''}
        <PizzaItem key="add-pizza" handleOpen={handleOpen} />
        {pizzaList}
      </div>
      <div>
        <PizzaModal
          selectedPizza={selectedPizza}
          setSelectedPizza={setSelectedPizza}
          open={open}
          setOpen={setOpen}
          toppingList={toppingList}
        />
      </div>
    </>
  );
};

export { PizzaList };

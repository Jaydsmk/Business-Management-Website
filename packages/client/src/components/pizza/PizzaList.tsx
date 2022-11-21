import { useQuery } from '@apollo/client';
import { Box, Grid, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DoubleArrow } from '@material-ui/icons';

import React, { useState } from 'react';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import { Pizza } from '../../types/pizza';
import CardItemSkeleton from '../common/CardItemSkeleton';
import { PizzaItem } from './PizzaItem';
import PizzaModal from './pizzaModal';

const useStyles = makeStyles((theme: Theme) => ({
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px',
  },

  loadMoreBtn: {
    transform: 'rotate(90deg)',
    '& svg': {
      fontSize: 40,
      color: '#84415C',
      textAlign: 'center',
      animation: `$blinkArrow 1s ${theme.transitions.easing.easeInOut} infinite`,
    },
  },

  '@keyframes blinkArrow': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));

const PizzaList: React.FC = () => {
  const classes = useStyles();

  const { loading, data, error, fetchMore } = useQuery(GET_PIZZAS, {
    variables: {
      input: {
        cursor: '',
        limit: 5,
      },
    },
  });
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
    return (
      <div>
        <CardItemSkeleton data-testid="pizza-list-loading" />
      </div>
    );
  }

  const pizzaList = data?.pizzas.results.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} handleOpen={handleOpen} />
  ));

  const toppingList = data?.toppings;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>
        {getError ? displayErr : ''}
        <Grid container spacing={6}>
          <PizzaItem key="add-pizza" handleOpen={handleOpen} />
          {pizzaList}
        </Grid>
      </div>

      {data?.pizzas.hasNextPage && (
        <div className={classes.btnContainer}>
          <IconButton
            edge="end"
            aria-label="loadMore"
            className={classes.loadMoreBtn}
            onClick={(): void => {
              const cursorId = data?.pizzas.results[data?.pizzas.results.length - 1].id;

              fetchMore({
                variables: {
                  input: {
                    limit: 6,
                    cursor: cursorId,
                  },
                },
                updateQuery: (prevCursorResult: any, { fetchMoreResult }) => {
                  fetchMoreResult.pizzas.results = [
                    ...prevCursorResult.pizzas.results,
                    ...fetchMoreResult.pizzas.results,
                  ];

                  return fetchMoreResult ? fetchMoreResult : prevCursorResult;
                },
              });
            }}
          >
            <DoubleArrow />
          </IconButton>
        </div>
      )}

      <div>
        <PizzaModal
          selectedPizza={selectedPizza}
          setSelectedPizza={setSelectedPizza}
          open={open}
          setOpen={setOpen}
          toppingList={toppingList}
        />
      </div>
    </Box>
  );
};

export default PizzaList;

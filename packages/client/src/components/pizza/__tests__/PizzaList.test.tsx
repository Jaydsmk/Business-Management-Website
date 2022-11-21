/* eslint-disable testing-library/await-async-utils */
import { screen, waitFor } from '@testing-library/react';
import { graphql } from 'msw';
import { server } from '../../../lib/test/msw-server';

import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import PizzaList from '../PizzaList';
import { createTestPizza } from '../../../lib/test/helper/pizzas';
import CardItemSkeleton from '../../common/CardItemSkeleton';
import { Pizza } from '../../../types';

describe('PizzaList', () => {
  const renderPizzaList = () => {
    const view = renderWithProviders(<PizzaList />);

    return {
      ...view,
      $findPizzaItems: () => screen.findAllByTestId(/^pizza-item-/),
      $findPizzaItemsButtons: () => screen.findAllByRole('button'),
    };
  };

  const mockPizzaQuery = (data: Partial<Pizza[]>) => {
    server.use(
      graphql.query('Pizzas', (_request, response, context) => {
        return response(
          context.data({
            loading: false,
            pizzas: {
              results: [...data],
              totalCount: 1,
              hasNextPage: false,
              cursor: '',
            },
          })
        );
      })
    );
  };

  beforeEach(() => {
    // const pizza = createTestPizza();
    // mockPizzaQuery([pizza]);

    const pizza1 = createTestPizza();
    const pizza2 = createTestPizza();
    mockPizzaQuery([pizza1, pizza2]);
  });

  test('should display a list of pizzas', async () => {
    const { $findPizzaItems } = renderPizzaList();

    waitFor(() => expect(Promise.resolve($findPizzaItems())).resolves.toHaveLength(2));
  });

  const renderPizzaLoading = () => {
    const view = renderWithProviders(<CardItemSkeleton />);

    return {
      ...view,
      $checkPizzaLoading: () => screen.queryByTestId(/^pizza-list-loading/),
    };
  };

  test('should loading pizzas', async () => {
    const { $checkPizzaLoading } = renderPizzaLoading();

    waitFor(() => expect(Promise.resolve($checkPizzaLoading())).resolves.not.toBeNull());
    waitFor(() => expect(Promise.resolve($checkPizzaLoading())).resolves.toBeVisible());
  });
});

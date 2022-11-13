import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import toDollars from '../../../lib/format-dollars';
import { createTestPizza } from '../../../lib/test/helper/pizzas';
import { renderWithProviders } from '../../../lib/test/renderWithProviders';
import { PizzaItem, PizzaItemProps } from '../PizzaItem';

describe('PizzaItem', () => {
  const renderPizzaList = (props: PizzaItemProps) => {
    const view = renderWithProviders(<PizzaItem {...props} />);

    return {
      ...view,

      $getItem: () => screen.getByTestId(/^pizza-item/),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getItem, $getModifyButton } = renderPizzaList(props);

    expect($getItem().textContent).toContain(props.pizza.name);
    expect($getItem().textContent).toContain(props.pizza.description);
    expect($getItem().innerHTML).toContain(props.pizza.imgSrc);
    expect($getItem().textContent).toContain(toDollars(props.pizza.priceCents));
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);

    act(() => userEvent.click($getModifyButton()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});

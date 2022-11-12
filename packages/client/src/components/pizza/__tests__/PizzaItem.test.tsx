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
      $getName: () => screen.getByTestId(/^pizza-name/),
      $getDescription: () => screen.getByTestId(/^pizza-desc/),
      $getImgSrc: () => screen.getByTestId(/^pizza-img/),
      $getPrice: () => screen.getByTestId(/^pizza-price/),
      $getModifyButton: () => screen.getByRole('button'),
    };
  };

  const props = {
    handleOpen: jest.fn(),
    pizza: createTestPizza(),
  };

  test('should display all components of the pizza item', async () => {
    const { $getName, $getDescription, $getImgSrc, $getPrice, $getModifyButton } = renderPizzaList(props);

    expect($getName().innerHTML).toContain(props.pizza.name);
    expect($getDescription().innerHTML).toContain(props.pizza.description);
    expect($getImgSrc().innerHTML).toContain(props.pizza.imgSrc);
    expect($getPrice().innerHTML).toContain(toDollars(props.pizza.priceCents));
    expect($getModifyButton()).toBeVisible();
  });

  test('should call handleOpen when the modify button is clicked', async () => {
    const { $getModifyButton } = renderPizzaList(props);

    act(() => userEvent.click($getModifyButton()));

    expect(props.handleOpen).toHaveBeenCalledTimes(1);
  });
});

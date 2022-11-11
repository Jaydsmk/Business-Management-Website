import { IconButton, ListItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircle, Edit } from '@material-ui/icons';
import toDollars from '../../lib/format-dollars';
import MakePizzaImg from '../../assets/img/make-pizza.jpeg';

import { Pizza } from '../../types';

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const useStyles = makeStyles(({ typography }: Theme) => ({
  container: {
    display: 'flex',
  },
  img: {
    width: '100px',
    height: '100px',
  },
  name: {
    minWidth: typography.pxToRem(220),
    marginLeft: '100px',
    textAlign: 'left',
  },
  desc: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <ListItem {...props} className={classes.container}>
      <img src={pizza?.imgSrc ?? MakePizzaImg} data-testid={`pizza-img-${pizza?.id}`} className={classes.img} alt="" />
      <p data-testid={`pizza-name-${pizza?.id}`} className={classes.name}>
        {pizza?.name ?? 'Add Pizza'}
      </p>
      <p data-testid={`pizza-desc-${pizza?.id}`} className={classes.desc}>
        {pizza?.description}
      </p>
      <p data-testid={`pizza-price-${pizza?.priceCents}`}>{pizza?.priceCents ? toDollars(pizza.priceCents) : ''}</p>
      <IconButton edge="end" aria-label="modify" type="button" onClick={(): void => handleOpen(pizza)}>
        {pizza ? <Edit /> : <AddCircle />}
      </IconButton>
    </ListItem>
  );
};

export { PizzaItem };

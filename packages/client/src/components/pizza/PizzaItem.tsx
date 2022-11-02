import { ListItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Pizza } from '../../types';

export interface PizzaItemProps {
  pizza?: Pizza;
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
    minWidth: typography.pxToRem(500),
    marginLeft: '100px',
  },
  right: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, ...props }) => {
  const classes = useStyles();

  return (
    <ListItem {...props} className={classes.container}>
      <img src={pizza?.imgSrc} data-testid={`pizza-img-${pizza?.id}`} className={classes.img} alt="" />
      <p data-testid={`pizza-name-${pizza?.id}`} className={classes.name}>
        {' '}
        {pizza?.name}{' '}
      </p>
      <div className={classes.right}>
        <p data-testid={`pizza-desc-${pizza?.id}`}>{pizza?.description}</p>
      </div>
    </ListItem>
  );
};

export { PizzaItem };

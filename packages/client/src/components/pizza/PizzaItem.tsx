import { Grid, IconButton, ListItem } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AddCircle } from '@material-ui/icons';
import toDollars from '../../lib/format-dollars';
import MakePizzaImg from '../../assets/img/make-pizza.jpeg';

import { Pizza } from '../../types';
import CardItem from '../common/CardItem';

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const useStyles = makeStyles(({ typography }: Theme) => ({
  root: {
    margin: '0',
    padding: '0',
    height: '100%',
    width: '105%',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
    margin: '0',
    padding: '5px',
  },

  addContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: '10px',
  },

  MakePizzaImg: {
    objectFit: 'cover',
    width: '100%',
  },

  addName: {
    fontSize: '35px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },

  addBtn: {
    '& svg': {
      fontSize: 50,
      color: 'white',
    },
  },

  img: {
    width: '330px',
    height: '330px',
    objectFit: 'cover',
    borderRadius: '5px',
  },

  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'space-around',
  },

  name: {
    minWidth: typography.pxToRem(300),
    minHeight: typography.pxToRem(40),
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    margin: '10px',
  },

  desc: {
    fontSize: '16px',
    minHeight: typography.pxToRem(50),
    textAlign: 'center',
  },

  price: {
    fontSize: '23px',
  },
}));

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen, ...props }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={9} md={6} lg={4} xl={4}>
      <CardItem
        {...props}
        rootClassName={classes.root}
        aria-label="modify"
        data-testid={`pizza-modifyBtn-${pizza?.id}`}
        onClick={(): void => handleOpen(pizza)}
      >
        {pizza ? (
          <ListItem {...props} className={classes.container} data-testid={`pizza-item-${pizza?.id}`}>
            <div data-testid={`pizza-img-${pizza?.id}`}>
              <img src={pizza?.imgSrc} alt="" className={classes.img} />
            </div>
            <div className={classes.detailContainer}>
              <div data-testid={`pizza-name-${pizza?.id}`} className={classes.name}>
                {pizza?.name}
              </div>
              <div data-testid={`pizza-desc-${pizza?.id}`} className={classes.desc}>
                {pizza?.description ? pizza.description : <div></div>}
              </div>
              <div data-testid={`pizza-price-${pizza?.priceCents}`} className={classes.price}>
                {pizza?.priceCents ? toDollars(pizza.priceCents) : ''}
              </div>
            </div>
          </ListItem>
        ) : (
          <div className={classes.addContainer}>
            <div className={classes.addName}>{'Make a New Pizza'}</div>
            <img src={MakePizzaImg} alt="" className={classes.MakePizzaImg} />
            <IconButton onClick={(): void => handleOpen(pizza)} className={classes.addBtn}>
              <AddCircle />
            </IconButton>
          </div>
        )}
      </CardItem>
    </Grid>
  );
};

export { PizzaItem };

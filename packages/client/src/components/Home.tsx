import { NavLink } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core';
import HomePizzaImg from '../assets/img/home.jpeg';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: 'black',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
    zIndex: -1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  link: {
    textDecoration: 'none',
    fontWeight: 700,
    color: 'white',
    fontSize: theme.typography.pxToRem(50),
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
}));

const Home = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <NavLink className={classes.link} to="/pizzas">
          Pizzas
        </NavLink>
        <NavLink className={classes.link} to="/toppings">
          Toppings
        </NavLink>
      </div>
      <img alt="samurai-pizza-cats" className={classes.img} src={HomePizzaImg} />
    </div>
  );
};

export default Home;

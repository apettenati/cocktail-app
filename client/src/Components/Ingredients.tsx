import { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { INGREDIENTS } from '../static/ingredients'
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);

interface IngredientsProps {
  authenticated: boolean
}

export const Ingredients: React.FC<IngredientsProps> = ({ authenticated }) => {
  const classes = useStyles();
  const [userIngredients, setUserIngredients] = useState([])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIngredients({ ...userIngredients, [event.target.name]: event.target.checked });
  };


  return (
    <div className={classes.root}>
      {/* {!authenticated */}
      {/* ? <p>Please log in to view this page</p> */}
      {/* : */}
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Select Ingredients You Have</FormLabel>
        <FormGroup>
          {INGREDIENTS.map((ingredient) => {
            return (
              <FormControlLabel
                control={<Checkbox checked={false} onChange={handleChange} name={ingredient} />}
                label={ingredient}
              />
            )
          })}
        </FormGroup>
        {/* <FormHelperText>Be careful</FormHelperText> */}
      </FormControl>
      {/* } */}
    </div>
  );
}
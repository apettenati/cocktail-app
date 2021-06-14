import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { INGREDIENTS } from '../static/ingredients'
import axios from 'axios'
import { UserStore } from '../store'

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


export const Ingredients: React.FC = () => {
  const classes = useStyles();
  const authenticated = UserStore.useState((s) => s.authenticated)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO update state with array of user ingredients
    UserStore.update((s) => { s.ingredients = [] })
  };


  return (
    <div className={classes.root}>
      {!authenticated
        ?
        <FormControl component="fieldset" className={classes.formControl}>
          <FormHelperText>Please log in to view this page</FormHelperText>
        </FormControl>
        :
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
        </FormControl>
      }
    </div>
  );
}
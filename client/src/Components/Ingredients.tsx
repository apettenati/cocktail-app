import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import { INGREDIENTS } from '../static/ingredients'
import { UserStore } from '../store'
import { useEffect } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
)

export const Ingredients: React.FC = () => {
  const classes = useStyles()
  const authenticated = UserStore.useState((s) => s.authenticated)
  const userIngredients = UserStore.useState((s) => s.ingredients)

  const getIngredients = () => {
    fetch('http://localhost:4000/ingredients', {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true"
      }
    }).then(async (res) => {
      const ingredients = await res.json()
      UserStore.update((s) => { s.ingredients = ingredients })
    })
      .catch((error) => { console.log({ error }) })
  }

  useEffect(getIngredients, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked
    const name = event.target.name
    let ingredients: string[] = []
    status
      ? ingredients = [...userIngredients, name]
      : ingredients = userIngredients.filter(item => item !== name)
    fetch('http://localhost:4000/ingredients', {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify({ ingredients })
    }).then(() => {
      UserStore.update((s) => { s.ingredients = ingredients })
    })
      .catch((error) => { console.log({ error }) })
  }

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
            {INGREDIENTS.map((ingredient, i) => {
              return (
                <FormControlLabel
                  key={i}
                  // control={<Checkbox checked={false} onChange={handleChange} name={ingredient} />}
                  control={
                    <Checkbox
                      checked={userIngredients.includes(ingredient)}
                      onChange={handleChange}
                      name={ingredient}
                    />
                  }
                  label={ingredient}
                />
              )
            })}
          </FormGroup>
        </FormControl>
      }
    </div>
  )
}
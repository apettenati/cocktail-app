import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { UserStore } from '../../store'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

export const Logout = () => {
  const classes = useStyles()
  const history = useHistory()

  function logout(event: React.FormEvent<HTMLButtonElement>) {
    event?.preventDefault()
    fetch('http://localhost:4000/user/logout', {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true"
      },
    }).then((res) => {
      console.log('success login')
      window.localStorage.removeItem('username')
      UserStore.update((s) => { s.authenticated = false })
      UserStore.update((s) => { s.username = '' })
      history.push('/login')
      console.log('logged out')
    })
      .catch((error) => { console.log({ error }) })
  }

  return (
    <Button href="/user/logout" onClick={logout} color="primary" variant="outlined" className={classes.link}>
      Logout
    </Button>
  )
}
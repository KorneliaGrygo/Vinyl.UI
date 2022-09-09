import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ThemeProvider, createTheme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import Search from './pages/Search'
import useAuthContext from './hooks/useAuthContext'
import Profile from './pages/Profile'
import AlbumDetails from './components/AlbumDetails'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: grey
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  const { user } = useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              {!user &&
                <Login />
              }
              {user &&
                <Home />
              }
            </Route>
            <Route path="/signup">
              {!user &&
                <Signup />
              }
              {user &&
                <Home />
              }
            </Route>
            <Route path="/wyszukaj">
              <Search />
            </Route>
            <Route path="/profil">
              <Profile />
            </Route>
            <Route path='/albums/details/:albumId'>
              <AlbumDetails/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

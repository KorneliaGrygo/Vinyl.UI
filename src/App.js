import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import {ThemeProvider, createTheme} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import Search from './pages/Search'
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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/wyszukaj">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Quiz from './components/Quiz'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/quiz" component={Quiz} />
      <Route exact path="/not-found" component={NotFound} />

      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App

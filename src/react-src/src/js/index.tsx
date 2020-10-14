import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Settings from './Settings'
import './styles/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWindowClose,
  faSearch,
  faEdit,
  faPlus,
  faFileImport,
  faTimes,
  faTrash,
  faSave,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faWindowClose,
  faSearch,
  faEdit,
  faTrash,
  faPlus,
  faFileImport,
  faTimes,
  faSave
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/settings" exact component={Settings} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

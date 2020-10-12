import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faWindowClose,
  faSearch,
  faEdit,
  faPlus,
  faFileImport,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

library.add(faWindowClose, faSearch, faEdit, faTrash, faPlus, faFileImport)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'
import './styles/app.css' 
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore()


render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
)
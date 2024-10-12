import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import './main.css'
import { store } from './redux/store'
import { SocketContextProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </Provider>
  // </StrictMode>,
)

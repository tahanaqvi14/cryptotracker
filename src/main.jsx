import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
// import { store } from './store.js';
import './index.css';
import App from './App.jsx';
import "@fontsource/poppins"; // Importing Poppins globally


createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
    <App />
  // </Provider>
);

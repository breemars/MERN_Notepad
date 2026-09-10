import { StrictMode } from 'react' //Used to detect problems within React
import { createRoot } from 'react-dom/client' //Tells React which HTML element contains the React application
import './index.css'
import App from './App.jsx' //Main/root component of the React application
import { BrowserRouter } from "react-router" //Allows multiple pages/routes without doing a full browser refresh
import { Toaster } from "react-hot-toast" //Displays temporary notifications

//Looks for the element with id "root" in index.html and renders the application inside of that element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)

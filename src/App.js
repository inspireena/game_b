
import './App.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Trial from './components/Trial';


function App() {
  let router = createBrowserRouter([
    {path :'/',
  element :<Login/>},
  {path :'/trial',
  element :<Trial/>},

  {path :'/dashboard',
element :<Dashboard/>}
  ])
  return (<RouterProvider router ={router}/> );
}

export default App;

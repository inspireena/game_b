
import './App.css';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Trial from './components/Trial';
import Header from './common/Header';


function App() {
  let router = createBrowserRouter([
    {path :'/',
  element :<Login/>},
  {path :'/trial',
  element :<Header/>},

  {path :'/dashboard',
element :<Dashboard/>}
  ])
  return (<RouterProvider router ={router}/> );
}

export default App;

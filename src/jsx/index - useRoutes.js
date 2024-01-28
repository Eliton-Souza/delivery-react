import React from "react";

/// React router dom
import {  useRoutes } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";

/// Dashboard
import Home from "./components/Dashboard/Home";
import FoodOrder from "./components/Dashboard/FoodOrder";


const Markup = () => {



  const routes = useRoutes([
   
    {
      path: '',
      element: <Nav />,
      children: [
      {
        path: 'dashboard',
        element: <Home />,
      },
      {
        path: 'food-order',
        element: <FoodOrder />,
      }],
      
    }
  ]);
  return routes;
}

 

export default Markup;

import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import { Cat } from "../components/Cat/Cat";
import { CatForm } from "../components/CatForm/CatForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cats/:id",
    element: <Cat />
  },
  {
    path: '/add',
    element: <CatForm/>
  }
]);
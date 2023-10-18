import { createHashRouter } from "react-router-dom";
import App from "../components/App";
import { Cat } from "../components/Cat/Cat";
import { CatForm } from "../components/CatForm/CatForm";

export const router = createHashRouter([
  {
    path: "/Cats",
    element: <App />,
  },
  {
    path: "/Cats/cats/:id",
    element: <Cat />
  },
  {
    path: '/Cats/add',
    element: <CatForm/>
  }
]);
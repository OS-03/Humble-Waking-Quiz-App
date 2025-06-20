import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Quiz from "./components/Quiz";
import StartQuiz from "./components/StartQuiz";

const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path:"/startquiz",
    element:<StartQuiz/>
  }
]);

export default function App() {
  return (
      <RouterProvider router={appRouter} />
  );
}
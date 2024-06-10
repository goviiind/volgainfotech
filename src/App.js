import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Userlist from "./components/UserList/Userlist";
import Userdetails from "./components/UserDetails/Userdetails";

function App() {
  //Defining routers
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlist />,
    },
    {
      path: "/user-details",
      element: <Userdetails />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

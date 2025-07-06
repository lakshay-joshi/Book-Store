import {createBrowserRouter} from "react-router-dom";
import App from "../src/App";
import Home from "../pages/home/home";
import Login from "../component/login";
import Register from "../component/register";
import CartPage from "../pages/books/cartPage";
import CheckoutPage from "../pages/books/checkoutPage";
import SingleBook from "../pages/books/singleBook";
import PrivateRoute from "./privateRoute";
import OrderPage from "../pages/books/orderPage";
import AdminLogin from "../component/adminLogin";
import DashboardLayout from "../pages/dashboard/dashboardLayout";
import Dashboard from "../pages/dashboard/dashboard";
import ManageBook from "../pages/dashboard/manageBooks/manageBook";
import AddBook from "../pages/dashboard/addBook/addBook";
import UpdateBook from "../pages/dashboard/EditBook/EditBook";
import AdminRoutes from "./AdminRoutes";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element:<Home></Home>,
      },
      {
        path:"/orders",
        element:<PrivateRoute><OrderPage></OrderPage></PrivateRoute>
      },
      {
        path:"/about",
        element:<div>About</div>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
       path:"/cart",
       element:<CartPage></CartPage>
      },
      {
       path:"/checkout",
       element:<PrivateRoute><CheckoutPage></CheckoutPage></PrivateRoute>
      },
      {
        path: "/books/:id",
        element: <SingleBook></SingleBook>
      }

    ]
  },
  {
    path: "/admin",
    element:<AdminLogin></AdminLogin>
  },
  {
    path: "/dashboard",
    element: <AdminRoutes><DashboardLayout></DashboardLayout></AdminRoutes>,
    children:[
      {
        path: "",
        element: <AdminRoutes><Dashboard></Dashboard></AdminRoutes>
      },
      {
        path: "add-new-book",
        element: <AdminRoutes><AddBook></AddBook></AdminRoutes>
      },
      {
        path: "edit-book/:id",
        element:  <AdminRoutes><UpdateBook></UpdateBook></AdminRoutes>
      },
      {
        path: "manage-books",
        element:  <AdminRoutes><ManageBook></ManageBook></AdminRoutes>
      },
      
    ]
  },
  

  
]);

export default router;
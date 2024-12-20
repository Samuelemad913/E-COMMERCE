import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import WishList from "./Components/WishList/WishList";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import NotFound from "./Components/NotFound/NotFound";
import Categories from "./Components/Categories/Categories";
import { ReactQueryDevtools } from "react-query/devtools";
import PoductDetails from "./Components/PoductDetails/PoductDetails";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import AuthLayOut from "./Components/LayOut/AuthLayOut";
import CheckOut from "./Components/CheckOut/CheckOut";
import Allorders from "./Components/Allorders/Allorders";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Verify from './Components/Verify/Verify';
function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoutes>
              <PoductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayOut />,
      children: [
        {
          path: "login",
          element: <SignIn />,
        },
        {
          path: "forget-password",
          element: <ForgotPassword />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
        { path: "resetPassword", element: <ResetPassword /> },
        { path: "verify", element: <Verify /> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routs}></RouterProvider>;
      <ReactQueryDevtools />
    </>
  );
}

export default App;

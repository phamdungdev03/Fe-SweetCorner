import {
  HomeDashBoard,
  AccountsDashboard,
  CategoriesDashboard,
  OdersDashboard,
  ProductsDashboard,
} from "../Admin";
import {
  AccountPage,
  CartPage,
  CheckOutPage,
  Collections,
  HomePage,
  NewsPage,
  ProductDetailPage,
  ThankYouCheckOut,
} from "../Page";
import NotFoundPage from "../Page/NotFoundPage";
import OrderDetail from "../Admin/Order/component/OrderDetail";
import IntroducPage from "../Page/Introduce";
import { ForgotPassword, Login, ResetPassword, SignUp } from "../Auth";
import ContactPage from "../Page/Contact";

const routes = [
  {
    path: "/admin",
    element: HomeDashBoard,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/admin/accounts",
    element: AccountsDashboard,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/admin/category",
    element: CategoriesDashboard,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/admin/product",
    element: ProductsDashboard,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/admin/order",
    element: OdersDashboard,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/admin/order/detail",
    element: OrderDetail,
    isSildebar: true,
    isProtected: true,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/sign_up",
    element: SignUp,
  },
  {
    path: "/forgot-password",
    element: ForgotPassword,
  },
  {
    path: "/reset-password",
    element: ResetPassword,
  },
  { path: "/", element: HomePage, isHeader: true },
  { path: "/collections", element: Collections, isHeader: true },
  { path: "/checkout", element: CheckOutPage },
  { path: "/checkout/thankyou", element: ThankYouCheckOut },
  { path: "/cart", element: CartPage, isHeader: true },
  { path: "/productDetail/:id", element: ProductDetailPage, isHeader: true },
  { path: "/introduce", element: IntroducPage, isHeader: true },
  { path: "/news", element: NewsPage, isHeader: true },
  { path: "/contact", element: ContactPage, isHeader: true },
  { path: "/account", element: AccountPage, isHeader: true },
  { path: "*", element: NotFoundPage },
];

export default routes;

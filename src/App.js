import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./Routers";
import { AdminLayout, PageLayout } from "./Component";
import PrivateRoute from "./Routers/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element, isSildebar, isHeader, isProtected }) => {
          const PageElement = element;
          let routeElement = <PageElement key={path} />;
          if (isProtected) {
            routeElement = (
              <PrivateRoute key={path}>{routeElement}</PrivateRoute>
            );
          }
          if (isSildebar) {
            return (
              <Route
                key={path}
                path={path}
                element={<AdminLayout>{routeElement}</AdminLayout>}
              />
            );
          }

          if (isHeader) {
            return (
              <Route
                key={path}
                path={path}
                element={<PageLayout>{routeElement}</PageLayout>}
              />
            );
          }

          return <Route key={path} path={path} element={routeElement} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

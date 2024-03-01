import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Inicio from "./components/pages/Admin/Inicio";
import Paginas from "./components/pages/Admin/Paginas/Paginas";
import Proyectos from "./components/pages/Admin/Proyectos";
import ProyectoEditar from "./components/pages/Admin/ProyectoEditar";
import Cuenta from "./components/pages/Admin/Cuenta";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
        />
        <Route
          path="/paginas"
          element={
            <PrivateRoute>
              <Paginas />
            </PrivateRoute>
          }
        />
        <Route
          path="/proyectos"
          element={
            <PrivateRoute>
              <Proyectos />
            </PrivateRoute>
          }
        />
        <Route
          path="/proyectos/:id"
          element={
            <PrivateRoute>
              <ProyectoEditar />
            </PrivateRoute>
          }
        />
        <Route
          path="/cuenta"
          element={
            <PrivateRoute>
              <Cuenta />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

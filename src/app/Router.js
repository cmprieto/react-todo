import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import TodoContainer from "../components/TodoContainer";

/* import ProtectedRoute from "./ProtectedRoute"; */

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        {/*    ENVOLVER TODAS LAS RUTAS CON Route Layout */}
        <Route path="/react-todo" element={<TodoContainer />} />
        <Route path="/react-todo/todocontainer" element={<TodoContainer />} />
        {/* Es muy recomendable añadir esta ruta para obtener un mensaje de error en el caso de que la ruta no exista. De lo contrario, si la ruta no existe llegaremos a una página en blanco */}
        {/*         <Route path="/react-youtube/profile/" element={<ProtectedRoute component={<Profile />}/>} /> */}
        <Route path="/react-todo/*" element={<div>error 404</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;

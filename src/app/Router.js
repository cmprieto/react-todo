import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import TodoContainer from "../components/TodoContainer";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/react-todo" element={<TodoContainer />} />
        <Route path="/react-todo/*" element={<div>error 404</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;

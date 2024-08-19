import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const Layout = () => {
  // const [theme] = useLocalStorage("theme","");
  return (
    <Fragment>
      {/* /* className={`container${theme}`} >*/}
      <Outlet />
    </Fragment>
  );
};

export default Layout;

import { Outlet } from "react-router-dom";
import { Fragment } from "react";

//import {useLocalStorage} from '@uidotdev/usehooks';

const Layout = () => {
  // const [theme] = useLocalStorage("theme","");
  return (
    <Fragment>
      {" "}
      {/* /* className={`container${theme}`} >*/}
      <Outlet />
    </Fragment>
  );
};

export default Layout;

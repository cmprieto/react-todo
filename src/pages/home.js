import { Fragment } from "react";
import TodoContainer from "../components/TodoContainer";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const Home = () => {
  return (
    <Fragment>
      <TodoContainer />
    </Fragment>
  );
};

/*  export default withAuthenticationRequired(Home);  */
export default Home;

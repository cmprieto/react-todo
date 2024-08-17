import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
    <Link><h3>Anonimo</h3></Link>
    <Link><h3>Sign In with Google</h3></Link>
    {/*   <TodoContainer /> */}
    </div>
  );
};

export default Home;

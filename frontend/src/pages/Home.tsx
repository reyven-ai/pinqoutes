import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Hello World</h1>
      <Link to="/profileview">View</Link>
    </>
  );
}

export default HomePage;

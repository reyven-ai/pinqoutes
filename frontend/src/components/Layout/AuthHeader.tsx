import { Link, useLocation } from "react-router-dom"; // Assuming you are using react-router for navigation
import { Close } from "@material-ui/icons";

function AuthHeader() {
  const location = useLocation();

  const getHeaderComponent = () => {
    if (
      location.pathname.includes("/signup") ||
      location.pathname.includes("/login")
    ) {
      return (
        <Link to="/">
          <Close />
        </Link>
      );
    } else {
      return <Link to="/">Skip for now</Link>;
    }
  };
  return (
    <>
      <header className="flex justify-between px-[16%] py-[2%] border">
        <div className="text-3xl font-semibold">Pintech</div>
        <div>{getHeaderComponent()}</div>
      </header>
    </>
  );
}

export default AuthHeader;

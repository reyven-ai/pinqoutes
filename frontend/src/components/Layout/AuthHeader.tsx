import { Link, useLocation } from "react-router-dom";
import { Close } from "@material-ui/icons";
import Logo from "../../assets/Pintech.png";
import Logos from "../../assets/Logos.png";

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
      <header className="flex justify-between items-center border xs:px-[5%] md:px-[8%] lg:px-[16%] lg:py-[2rem] xs:py-[1rem]">
        <div className="text-3xl font-semibold">
          <img
            className="w-[125px] h-[auto] lg:block xs:hidden"
            src={Logo}
          ></img>
          <img className="w-[40px] h-[auto] lg:hidden" src={Logos}></img>
        </div>
        <div>{getHeaderComponent()}</div>
      </header>
    </>
  );
}

export default AuthHeader;

import { Close } from "@material-ui/icons";

function AuthHeader() {
  return (
    <>
      <header className="flex justify-between px-[16%] py-[2%] border">
        <div className="text-3xl font-semibold">Pintech</div>
        <div>
          <Close />
        </div>
      </header>
    </>
  );
}

export default AuthHeader;

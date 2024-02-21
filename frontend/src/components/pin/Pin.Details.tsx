import { usePinDetails } from "@/hooks/usePinAction";
import { Link, useParams } from "react-router-dom";
import { ArrowBackSharp, Share } from "@material-ui/icons";
import MenuDropdown from "../DropdownUtil/Edit.Delelete.Button";
import SavePinButton from "./Pin.SaveButton";

const PinDetails: React.FC = () => {
  const { id } = useParams();
  const { pinDetails } = usePinDetails(id || "");

  return (
    <div className="w-[100%] mt-20">
      <Link to="/" className="absolute left-10 top-[12%]">
        <ArrowBackSharp className="font-bold text-[26px]" />
      </Link>
      {pinDetails ? (
        <div className="flex w-[60%] bg-white m-[auto] justify-center rounded-[25px] shadow-shadowTop">
          <div className="w-[100%] h-[auto] ">
            <img
              className="rounded-l-[25px] shadow-shadowTop object-cover"
              src={pinDetails.image_url}
              alt=""
            />
          </div>
          <div className="w-[100%]">
            <div className="flex justify-between px-8 pt-6 items-center">
              <ul className="flex gap-[12px]">
                <li className="bg-[#e4e6eb] rounded-[50%]">
                  <Share className="mx-2.5 my-2.5" />
                </li>
                <li>
                  <MenuDropdown />
                </li>
              </ul>
              <SavePinButton />
            </div>
            <div className="px-8 py-5">
              <Link className="underline" to={`${pinDetails.link}`}>
                {pinDetails.link}
              </Link>
              <h2 className="text-[26px] font-semibold leading-[2rem] my-[1.5rem]">
                {pinDetails.title}
              </h2>
              <p>{pinDetails.description}</p>
            </div>
            <div className="flex justify-between items-center px-8 pt-6">
              <Link
                to={`/profile/${pinDetails.user_id}`}
                className="flex items-center gap-2 w-[322px] rounded-lg"
              >
                <img
                  className="w-[50px] rounded-[50%] ml-[0.3rem]"
                  src="https://s.pinimg.com/images/user/default_140.png"
                  alt=""
                />
                <div>
                  <h2 className="w-[250px] font-semibold mb-[-5px]">
                    {pinDetails.created_by}
                  </h2>
                  <span className="text-[13px] font-semibold text-[#6D6D6D]">
                    3k followers
                  </span>
                </div>
              </Link>
              <div>
                <button className="px-4 py-3 bg-[#e4e6eb] rounded-[24px] font-semibold">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading pin details...</p>
      )}
    </div>
  );
};

export default PinDetails;

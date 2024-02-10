import { usePinDetails } from "@/hooks/usePinAction";
import { Link, useParams } from "react-router-dom";
import { Share } from "@material-ui/icons";
import MenuDropdown from "../DropdownUtil/Edit.Delelete.Button";
import SavePinButton from "./Pin.SaveButton";

const PinDetails: React.FC = () => {
  const { id } = useParams();
  const { pinDetails } = usePinDetails(id || "");

  return (
    <div className="w-[100%] mt-20">
      {pinDetails ? (
        <div className="flex w-[65%] bg-white m-[auto] justify-center rounded-[25px] shadow-shadowTop">
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
              <Link to={`${pinDetails.link}`}>{pinDetails.link}</Link>
              <h2 className="text-[26px] font-semibold leading-[3rem]">
                {pinDetails.title}
              </h2>
              <p>{pinDetails.description}</p>
            </div>
            <div className="flex mb-[1rem]">
              <Link
                to={`/profile/${pinDetails.user_id}`}
                className="flex items-center gap-2 w-[322px] px-6 py-4 rounded-lg"
              >
                <img
                  className="w-[50px] h-[50px] rounded-[50%] ml-[0.3rem]"
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

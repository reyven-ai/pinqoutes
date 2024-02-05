import { Link } from "react-router-dom";
import SaveButton from "../pin/Pin.SaveButton";
import { Pin } from "@/types/pin.types";

const Column: React.FC<{ pins: Array<Pin> }> = ({ pins }) => {
  return (
    <div className="column flex-1 p-2">
      {pins.map((pin) => (
        <div key={pin.id} className="relative group mb-4">
          <img
            className="rounded-[24px] w-full h-auto relative group-hover:opacity-50 transition-opacity"
            src={pin.image_url}
            alt={pin.title}
          />
          <div className="text-[13px] flex items-center mt-2 gap-[5px]">
            <img
              className="w-[35px] h-[35px] rounded-[50%]"
              src="https://s.pinimg.com/images/user/default_140.png"
              alt=""
            />
            {pin.created_by}
          </div>
          <Link to={`/pins/${pin.id}`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ">
              {pin.created_by && (
                <div className="flex items-end justify-end py-2 px-2">
                  <SaveButton pin={pin} />
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Column;

import { Link } from "react-router-dom";
import { Pin } from "@/types/pin.types";

import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { FavoriteBorderOutlined, MoreHoriz, Share } from "@material-ui/icons";
import SavePinButton from "../pin/Pin.SaveButton";

const Column: React.FC<{ pins: Array<Pin> }> = ({ pins }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="column flex-1 p-2">
      {pins.length > 0 ? (
        pins.map((pin) => (
          <div key={pin.id} className="relative group mb-4">
            <Link to={`/pins/${pin.id}`}>
              <img
                className="rounded-[24px] w-full h-auto relative hover:opacity-60 transition-opacity"
                src={pin.image_url}
                alt={pin.title}
              />
            </Link>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity ">
              <div className="absolute top-0 right-0 flex items-end py-3 px-3">
                <SavePinButton id={pin.id} />
              </div>
              <div className="flex items-center absolute right-0 bottom-10 justify-between">
                <div className="w-[130px]">
                  <div className="overflow-visible whitespace-normal py-3 truncate ... ">
                    {pin.link && (
                      <Link
                        className="px-2.5 py-1.5 bg-[#e4e6eb] rounded-full"
                        to={
                          pin.link.startsWith("http")
                            ? pin.link
                            : `http://${pin.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pin.link}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex py-3 px-3 gap-2">
                  <button className="cursor-pointer text-black rounded-[50%] bg-[#e4e6eb]">
                    <Share className="mx-1.5 my-1.5" />
                  </button>
                  <button className="cursor-pointer text-black rounded-[50%] bg-[#e4e6eb]">
                    <MoreHoriz className="mx-1.5 my-1.5" />
                  </button>
                </div>
              </div>
            </div>
            {/* </Link> */}
            {isLoaded && (
              <div className="flex justify-between mt-2 items-center">
                <div>
                  <Link
                    className="text-[13px] flex items-center gap-[5px]"
                    to={`/profile/${pin.user_id}`}
                  >
                    <img
                      className="w-[35px] h-[35px] rounded-[50%]"
                      src="https://s.pinimg.com/images/user/default_140.png"
                      alt=""
                    />
                    {pin.created_by}
                  </Link>
                </div>
                <div>
                  <button className="text-[15px] flex items-center text-gray-500">
                    <FavoriteBorderOutlined style={{ fontSize: "20px" }} />
                    <span className="text-[15px]">13.3k</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <Skeleton count={5} height={80} />
        </div>
      )}
    </div>
  );
};

export default Column;

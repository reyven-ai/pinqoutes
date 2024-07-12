import { useGetSavedPins } from "@/hooks/useSave";
import { Pin } from "@/types/pin.types";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SaveList: React.FC = () => {
  const { savedPins, fetchSavedPins } = useGetSavedPins();
  const { userId } = useParams();

  useEffect(() => {
    fetchSavedPins(userId || "");
  }, [userId, fetchSavedPins]);

  if (!savedPins || savedPins.length === 0) {
    return (
      <div className="text-center">
        <p className="placeholder mt-20 mb-[1.5rem]">
          You haven't saved any Pins yet
        </p>
        <Link
          className="px-5 py-3 bg-[#e4e6eb] rounded-[24px] font-semibold"
          to="/"
        >
          Find ideas
        </Link>
      </div>
    );
  }

  const renderFile = (pin: Pin) => {
    const fileType = pin.file_type;
    const fileUrl = pin.file_url;

    if (fileType.startsWith("image")) {
      return (
        <img
          className="rounded-[4px] w-full h-auto relative hover:opacity-60 transition-opacity"
          src={fileUrl}
          alt={pin.title}
          loading="lazy"
        />
      );
    } else if (fileType.startsWith("video")) {
      return (
        <video
          loop
          className="rounded-[4px] w-full h-auto relative hover:opacity-60 transition-opacity"
          // controls
        >
          <source src={pin.file_url} type="video/MP4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null; // Handle other file types as needed
    }
  };

  return (
    <div className="xs:mb-[6rem] 2xl:w-full m-[auto] flex justify-center">
      <div className="2xl:pl-0 xs:mt-2 xs:pl-0">
        <ul className="grid gap-[20px] xs-w-[80%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:w-[full] md:p-8 2xl:mx-[auto] 2xl:p-4">
          {savedPins.map((pin) => (
            <div key={pin.id} className="relative group mb-4">
              <Link to={`/pins/${pin.id}`}>{renderFile(pin)}</Link>
              <div className="absolute top-0 left-0 flex items-end py-3 px-3">
                <div className="flex justify-between mt-1 items-center">
                  <Link
                    className="text-[13px] text-[#fff] flex items-center gap-[5px]"
                    to={`/profile/${pin.user_id}`}
                  >
                    <img
                      className="w-[35px] h-[35px] rounded-[50%]"
                      src={pin?.profile_picture_url}
                      alt=""
                    />
                    {pin.created_by}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SaveList;

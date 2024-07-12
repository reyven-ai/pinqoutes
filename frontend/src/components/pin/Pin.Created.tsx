import { formatDate, useUsersPins } from "@/hooks/useUsersAction";
import { Link, useParams } from "react-router-dom";

interface Pin {
  id: string;
  userId: string;
  file_url: string;
  updated_at: string;
  file_type: string;
}

const PinProfile = () => {
  const { userId } = useParams();
  const { usersPins } = useUsersPins(userId || "");

  const sortedPins = usersPins
    ? [...usersPins].sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    : null;

  if (!usersPins || usersPins.length === 0) {
    return (
      <div className="text-center">
        <p className="placeholder mt-20 mb-[1.5rem]">
          Nothing to show...yet! Pins you create will live here.
        </p>
        <Link
          className="px-5 py-3 bg-[#000] text-[white] rounded-[24px] font-semibold"
          to="/pin/create"
        >
          Create Pin
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
          className="rounded-[0] w-full h-auto relative hover:opacity-60 transition-opacity"
          src={fileUrl}
          alt={`Pin by ${pin.userId}`}
        />
      );
    } else if (fileType.startsWith("video")) {
      return (
        <video
          loop
          className="rounded-[0] w-full h-[470px] object-cover relative hover:opacity-60 transition-opacity"
          // controls
        >
          <source src={fileUrl} type="video/MP4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-auto-fit-minmax gap-[5px] w-[100%] mx-[auto] pb-[50px] pt-[20px]">
          {sortedPins ? (
            sortedPins.map((pin: Pin) => (
              <div key={pin.id}>
                <p className="text-white ml-[13px] mt-[5px] mb-[-30px] relative">
                  {formatDate(pin.updated_at)}
                </p>
                <Link to={`/pins/${pin.id}`}>{renderFile(pin)}</Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PinProfile;

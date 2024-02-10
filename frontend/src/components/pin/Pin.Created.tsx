import { formatDate, useUsersPins } from "@/hooks/useUsersPins";
import { Link, useParams } from "react-router-dom";

interface Pin {
  id: string;
  userId: string;
  image_url: string;
  updated_at: string;
}

const PinProfile = () => {
  const { userId } = useParams();
  const { usersPins } = useUsersPins(userId || "");

  const sortedPins = usersPins
    ? [...usersPins].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : null;

  return (
    <>
      <div className="grid grid-cols-4 gap-[20px] w-[100%] mx-[auto] pb-[50px] pt-[20px]">
        {sortedPins !== null ? (
          sortedPins.length > 0 ? (
            sortedPins.map((pin: Pin) => (
              <div key={pin.userId}>
                <p className="text-white ml-[13px] mt-[5px] mb-[-30px] relative">
                  {formatDate(pin.updated_at)}
                </p>
                <Link to={`/pins/${pin.id}`}>
                  <img
                    className="rounded-[20px] w-[100%] h-[200px] mx-[auto] object-cover"
                    src={pin.image_url}
                    alt={`Pin by ${pin.userId}`}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="m-[auto]">No pins posted yet.</p>
              <Link to="/pin/create/">Create pin</Link>
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PinProfile;

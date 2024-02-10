import { useGetSavedPins } from "@/hooks/useUsersPins";
import { SavedDetails } from "@/types/pin.types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SaveList = () => {
  const { savedPins, fetchSavedPins } = useGetSavedPins();
  const { userId } = useParams();

  useEffect(() => {
    fetchSavedPins(userId || "");
  }, [userId, fetchSavedPins]);

  if (!savedPins || savedPins.length === 0) {
    return <p className="placeholder text-center mt-20">Got no save yet!</p>;
  }

  return (
    <div className="xs:mb-[6rem] 2xl:w-full m-[auto] flex justify-center">
      <div className="2xl:pl-8 xs:mt-2 xs:pl-0">
        <ul className="grid gap-[20px] xs-w-[80%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:w-[full] md:p-8 2xl:mx-[auto] 2xl:p-4">
          {savedPins.map((pin: SavedDetails) => (
            <div key={pin.id} className="items-center">
              <div>
                <img className="rounded-[24px]" src={pin.image_url} alt="" />
              </div>
              <div className="text-[13px] flex items-center mt-2 gap-[5px]">
                <img
                  className="w-[35px] h-[35px] rounded-[50%]"
                  src="https://s.pinimg.com/images/user/default_140.png"
                  alt=""
                />
                {pin.created_by}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SaveList;

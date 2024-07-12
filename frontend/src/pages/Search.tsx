import Input from "@/components/UI/Input";
import { useGetAlUserProfiles } from "@/hooks/useProfileAction";
import { UserProfileData } from "@/types/profile.types";
import { Link } from "react-router-dom";
import { useGetAllPins } from "@/hooks/useUsersAction";
import Column from "@/components/Layout/Pin.Column";
import close from "../assets/close.svg";
import { cn } from "@/types/util";

export default function SearchPage() {
  const { allUserProfiles, loading, error } = useGetAlUserProfiles();
  const { allPins } = useGetAllPins();

  const columns = 10;
  const pinsPerColumn = Math.ceil(allPins.length / columns);

  // Filter pins to only include videos
  const videoPins = allPins.filter((pin) => pin.file_type === "image");

  // Sort pins by created_at date
  const sortedPins = videoPins
    ? [...videoPins].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!allUserProfiles) {
    return <div>No user profiles found.</div>;
  }

  const currentUserId = Number(localStorage.getItem("user_id"));
  const filteredUserProfiles = allUserProfiles.filter(
    (userProfile) => userProfile.userId !== currentUserId
  );
  const sortedUserProfiles = filteredUserProfiles.sort(
    (a, b) => b.profileId - a.profileId
  );

  return (
    <>
      <div className="mt-[2.3rem] ml-[16.5rem]">
        <div className="w-[97%] m-[auto]">
          <div className="w-[50%]">
            <p className="my-[1rem] items-center relative">
              <Input
                className={cn(
                  "text-[16px]",
                  "placeholder-gray-50 text-[0.9rem] font-light",
                  "pl-4 pr-10" // Add padding to the input
                )}
                id="search-input"
                placeholder="Search"
                label=""
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={close} alt="Close" />
              </button>
            </p>
          </div>
          <div className="border-t">
            <p className="font-semibold p-[0.7rem]">Suggestions</p>
          </div>
        </div>
        <div className="grid grid-cols-auto-fit-minmax gap-[20px] h-[260px] overflow-scroll w-[97%] mx-[auto] pb-[50px] pt-[10px]">
          {sortedUserProfiles.map((user) => (
            <Link to={`/profile/${user.userId}`} key={user.profileId}>
              <div className="w-full h-auto border border-[#e2e8f0] rounded-[4px] items-center p-[20px]">
                <div className="m-[auto] h-[190px] text-center flex-col items-center justify-center">
                  <img
                    className="w-[75px] h-[75px] object-cover m-[auto] rounded-[50%]"
                    src={
                      user.profile_picture_url ||
                      "https://s.pinimg.com/images/user/default_140.png"
                    }
                    alt={user.username}
                  />
                  <h2 className="font-semibold text-18px mt-[5px]">
                    {user.username}
                  </h2>
                  <p className="text-[14px] text-[#6D6D6D]">
                    {user.description}
                  </p>
                  <div className="mt-[0.5rem]">
                    <button className="text-[13px] font-semibold rounded-24px text-[#fff] bg-[#000] w-90% py-[0.3rem] px-[1.5rem] rounded-[22px]">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="lg:flex mt-[0.5rem] justify-center lg:w-[100%] xs:w-[98%]">
          <div className="grid grid-cols-auto-fit-minmax justify-center w-[100%] p-[1rem]">
            {Array.from({ length: columns }, (_, i) => (
              <Column
                key={i}
                pins={(sortedPins ?? []).slice(
                  i * pinsPerColumn,
                  (i + 1) * pinsPerColumn
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

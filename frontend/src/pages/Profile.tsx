import UpdateProfileForm from "@/components/Profile/Profile.Update";
import { useGetProfileData } from "@/hooks/useProfileAction";

const ProfileView: React.FC = () => {
  const { userProfile } = useGetProfileData();

  if (!userProfile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="flex w-[full] mr-[auto] ml-[auto] mt-[1rem] mb-[1rem]pt-[2rem] justify-center gap-[1rem]">
      <div className="h-[550px] w-[60%]">
        <div className="h-[200px] bg-[#e4e6eb] rounded-[8px]"></div>
        <div className=" mt-[-2.7rem] mb-[2rem] relative flex items-end">
          <img
            className="w-[130px] h-[130px] object-cover rounded-[50%] border-2 border-whit ml-[2rem]"
            src="https://scontent-hel3-1.xx.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p74x74&_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=u5yxx_SBedYAX9Hl2AT&_nc_ht=scontent-hel3-1.xx&oh=00_AfCSqn2RmCb7PlerIJgFkMaPf8JmVrvQrQ3WS9Bx6-HtDg&oe=65A039B8"
          ></img>
          <div className="ml-[] flex justify-between gap-2 ml-2">
            <div>
              <h2 className="text-[22px] mb-[-3px]">{userProfile.username}</h2>
              <p className="mb-[-2px]">{userProfile.description}</p>
              <span className="text-[14px] text-[#6D6D6D] font-semibold">
                3k followers
              </span>
            </div>
            <UpdateProfileForm />
          </div>
        </div>
        <hr className="w-[95%] m-[auto] h-[2px]" />
      </div>
    </div>
  );
};

export default ProfileView;

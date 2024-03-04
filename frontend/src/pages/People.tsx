import { useGetAllUsers } from "@/hooks/useUsersPins";
import { Link } from "react-router-dom";

const People: React.FC = () => {
  const { allUsers } = useGetAllUsers();
  return (
    <div className=" flex-col w-[full] ml-[auto] mt-[1rem] mb-[1rem]pt-[2rem] justify-center mt-20">
      <div className=" w-[55%] grid grid-cols-4 gap-[10px] mx-[auto] pb-[50px] pt-[20px] bg-white text-center px-10 py-10 rounded-[8px]">
        {allUsers.map((users) => (
          <Link to={`/profile/${users.profile_id}`}>
            <div
              key={users.id}
              className="w-[full] h-[auto] border rounded-[8px] items-center"
            >
              <div className="h-[65px] bg-[#e4e6eb]"></div>
              <div className="m-[auto] flex-col items-center justify-center">
                <img
                  className="w-[50%] flex justify-center text-center h-[100px] mx-[auto] mt-[-3.5rem] rounded-[50%]"
                  src="https://s.pinimg.com/images/user/default_140.png"
                  alt=""
                />
                <h2 className="font-semibold text-[18px] mt-[5px]">
                  {users.username}
                </h2>
                <p className="text-[14px] text-[#6D6D6D]">
                  {users.description}
                </p>
                <div className="mt-[2.5rem]">
                  <span className="text-[13px] font-semibold text-[#6D6D6D]">
                    0 followers
                  </span>
                  <button className=" text-[15px] font-semibold rounded-[24px] text-[#3D91FD] border w-[90%] border-[#3D91FD] py-1 my-3">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default People;

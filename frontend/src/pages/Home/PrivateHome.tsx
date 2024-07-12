import Column from "@/components/Layout/Pin.Column";
import { useGetAllPins } from "@/hooks/useUsersAction";

const GetAllUsers: React.FC = () => {
  const { allPins } = useGetAllPins();

  const columns = 4;
  const pinsPerColumn = Math.ceil(allPins.length / columns);

  const sortedPins = allPins
    ? [...allPins].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : null;

  return (
    <div className="lg:flex mt-[1rem] justify-center lg:w-[80%] xs:w-[98%] ml-[16.5rem]">
      <div className="grid grid-cols-auto-fit-minmax justify-center w-[100%] p-[1rem] ">
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
  );
};

export default GetAllUsers;

import Column from "@/components/Layout/Pin.Column";
import { useGetAllPins } from "@/hooks/useUsersPins";

const GetAllUsers: React.FC = () => {
  const { allPins } = useGetAllPins();

  const columns = 6;
  const pinsPerColumn = Math.ceil(allPins.length / columns);

  const sortedPins = allPins
    ? [...allPins].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : null;
  return (
    <div className="flex mt-20 gap-[20px] w-[100%]">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap w-[90%] justify-center m-[auto]">
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
  );
};

export default GetAllUsers;

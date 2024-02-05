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
    <div>
      <div className="flex flex-wrap w-[88%] justify-center m-[auto] mt-20">
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

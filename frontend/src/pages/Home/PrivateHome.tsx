import Column from "@/components/Layout/Pin.Column";
import { useGetAllPins } from "@/hooks/useUsersPins";

const GetAllUsers: React.FC = () => {
  const { allPins } = useGetAllPins();

  const columns = 1;
  const pinsPerColumn = Math.ceil(allPins.length / columns);

  const sortedPins = allPins
    ? [...allPins].sort((a, b) => b.created_at.localeCompare(a.created_at))
    : null;

  return (
    <div className="lg:flex mt-[5.5rem] justify-center lg:w-[90%] xs:w-[98%] m-[auto]">
      <div className="grid lg:grid-cols-6 gap-0 xs:grid-cols-2">
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

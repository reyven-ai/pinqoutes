import { useSelector } from "react-redux";
import { RootState } from "../../types/pin.types"; // Adjust the import path

const SaveList = () => {
  const savePins = useSelector((state: RootState) => state.saves);

  let content = (
    <p className="placeholder text-center mt-20">Got no save yet!</p>
  );

  if (savePins.length > 0) {
    content = (
      <div className="xs:mb-[6rem] 2xl:w-full m-[auto] flex justify-center">
        <div className="2xl:pl-8 xs:mt-2 xs:pl-0">
          <ul className="grid gap-[20px] xs-w-[80%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:w-[full] md:p-8 2xl:mx-[auto] 2xl:p-4">
            {savePins.map((pin) => (
              <div key={pin.id} className="items-center">
                {/* <div>{pin.id}</div> */}
                {/* <div>{pin.title}</div> */}
                {/* <div>{pin.description}</div> */}
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
  }

  return content;
};

export default SaveList;

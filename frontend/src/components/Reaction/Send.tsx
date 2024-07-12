import send from "../../assets/sendWhite.svg";

interface CommentProps {
  pinId: string;
}

const Send: React.FC = ({}) => {
  return (
    <>
      <button>
        <img src={send} alt="" />
      </button>
    </>
  );
};

export default Send;

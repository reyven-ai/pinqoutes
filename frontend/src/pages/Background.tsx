import React from "react";

const EmbeddedVideo: React.FC = () => {
  return (
    <div className="flex-column">
      <h1 className="text-center">Dont have idea about you project?</h1>
      <div className="flex justify-start gap-4 w-full items-start">
        <video
          className="rounded-lg"
          width="25%"
          height="auto"
          title="Embedded Video"
          controls
          autoPlay
          loop
        >
          <source
            src="https://cdn.dribbble.com/userupload/11940061/file/small-38a524cf1ebaed12b79afbda7c31109e.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <video
          className="rounded-lg"
          width="25%"
          height="auto"
          title="Embedded Video"
          controls // Add controls for play/pause
          autoPlay // Add autoPlay attribute to start playing automatically
          loop
        >
          <source
            src="https://cdn.dribbble.com/users/2507495/screenshots/11302023/media/7131c05933a0723ead10af01b1fea2f2.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <video
          className="rounded-lg"
          width="25%"
          height="auto"
          title="Embedded Video"
          controls // Add controls for play/pause
          autoPlay // Add autoPlay attribute to start playing automatically
          loop
        >
          <source
            src="https://cdn.dribbble.com/users/3443194/screenshots/14530787/media/762bb06c172650d7dde96ef8354de94d.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <img
          className="rounded-lg"
          width="25%"
          src="https://cdn.dribbble.com/users/5777721/screenshots/19818785/media/1452580860a6aaf41b60ff219e58ba69.jpg?resize=1600x1200&vertical=center"
        ></img>
      </div>
    </div>
  );
};

export default EmbeddedVideo;

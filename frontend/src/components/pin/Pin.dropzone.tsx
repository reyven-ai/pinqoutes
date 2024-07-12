import { useDropzone } from "react-dropzone";
import { ArrowUpwardRounded } from "@material-ui/icons";
import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyDropzone: React.FC<{ form: any }> = ({ form }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setFieldValue("file_url", acceptedFiles[0]);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const isVideoFile = (file: File) => {
    const videoTypes = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
    ];
    return videoTypes.includes(file.type);
  };

  const renderFilePreview = () => {
    const file = form.values.file_url;
    if (file instanceof File) {
      const fileUrl = URL.createObjectURL(file);
      if (isVideoFile(file)) {
        return (
          <video
            controls
            autoPlay
            className="rounded-[30px] w-[370px] h-[450px] object-cover"
          >
            <source src={fileUrl} type="video/MP4" />
          </video>
        );
      } else {
        return (
          <img
            src={fileUrl}
            alt="Selected"
            className="rounded-[30px] w-[370px] h-[450px] object-cover"
          />
        );
      }
    } else {
      return (
        <img
          src={file}
          alt="Selected"
          className="rounded-[30px] w-[370px] h-[450px] object-cover"
        />
      );
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`bg-blue dropzone ${isDragActive ? "active" : ""}`}
    >
      <input className="w-[370px] h-[450px]" {...getInputProps()} />
      {isDragActive ? (
        <p></p>
      ) : (
        <>
          {form.values.file_url && (
            <div className="w-[370px]">{renderFilePreview()}</div>
          )}
        </>
      )}
      {!form.values.file_url && (
        <div className="bg-[#e2e2e2] w-[370px] h-[450px] rounded-[30px] text-center border-2 border-dashed border-[#cbc9c9] flex items-center cursor-pointer">
          <p className="mx-[auto] w-[60%] flex flex-col items-center gap-[8px]">
            <ArrowUpwardRounded />
            Choose a file or drag and drop it here
          </p>
        </div>
      )}
    </div>
  );
};

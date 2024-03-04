import { useDropzone } from "react-dropzone";
import { ArrowUpwardRounded } from "@material-ui/icons";

import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyDropzone: React.FC<{ form: any }> = ({ form }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setFieldValue("image_url", acceptedFiles[0]);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          {form.values.image_url ? (
            <div className="w-[370px]">
              <img
                src={
                  form.values.image_url instanceof File
                    ? URL.createObjectURL(form.values.image_url)
                    : form.values.image_url
                }
                alt="Selected"
                className="rounded-[30px]"
              />
            </div>
          ) : null}
        </>
      )}
      {form.values.image_url ? null : (
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

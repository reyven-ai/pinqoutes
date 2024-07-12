import { useDropzone } from "react-dropzone";

import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProfilePic: React.FC<{ form: any }> = ({ form }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      form.setFieldValue("profile_picture_url", acceptedFiles[0]);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`bg-blue dropzone ${isDragActive ? "active" : ""}`}
    >
      <input className="w-[140px] h-[140px]" {...getInputProps()} />
      {isDragActive ? (
        <p></p>
      ) : (
        <>
          {form.values.profile_picture_url ? (
            <div className="w-[120px] h-[120px] z-10 object-cover rounded-[50%]">
              <img
                src={
                  form.values.profile_picture_url instanceof File
                    ? URL.createObjectURL(form.values.profile_picture_url)
                    : form.values.profile_picture_url
                }
                alt="Selected"
                className="object-cover rounded-[50%]"
              />
            </div>
          ) : null}
        </>
      )}
      {form.values.profile_picture_url ? null : (
        <div>
          <img
            className="w-[120px] h-[120px] z-10 object-cover rounded-[50%] border-2 border-white"
            src="https://s.pinimg.com/images/user/default_140.png"
            alt="Profile Picture"
          />
        </div>
      )}
    </div>
  );
};

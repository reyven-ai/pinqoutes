import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ErrorOutline } from "@material-ui/icons";
import { CommentFormProps } from "@/types/comment.types";
import { cn } from "@/types/util";
import emoji from "../../../assets/emoji.svg";

const fontSize = "20px";

const CommentForm: React.FC<CommentFormProps> = ({
  loading,
  successful,
  onSubmit,
  initialValues,
  onClose: closeModal,
}) => {
  return (
    <div className="flex justify-between w-[480px] flex-col">
      <div className="flex justify-between items-center">
        {/* <button onClick={closeModal} className="bg-[#e4e6eb] rounded-[50%]">
          <Close className="font-bold mx-2 my-2" />
        </button> */}
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ dirty }) => (
          <Form className="flex justify-between items-center mt-[80px]">
            {!successful && (
              <div className="flex border-t border-t w-[480px] justify-between items-center">
                <div>
                  <button className="pointer ml-[5px] mt-[5px]">
                    <img src={emoji} alt="" />
                  </button>
                </div>
                <div className="p-0">
                  <Field
                    className={cn(`
                      "sm:bg-blue border-[1px] border-none bg-transparent block w-[390px]  p-4 py-3 my-1 rounded-xl text-sm h-[100px]",
                      "placeholder-gray-500 text-[0.9rem] font-light" ${"disabled:opacity-50 cursor-auto"}`)}
                    type="text"
                    id="comment"
                    placeholder="Add a comment..."
                    name="comment"
                  />
                  <ErrorMessage name="comment">
                    {(msg) => (
                      <div className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center flex gap-[8px]">
                        <ErrorOutline style={{ fontSize: fontSize }} />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={!dirty || loading}
                    className={`text-[#000] border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-normal ${"disabled:opacity-50 cursor-auto"}`}
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CommentForm;

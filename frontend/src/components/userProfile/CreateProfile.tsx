import { Formik, Field, Form, ErrorMessage } from "formik";
import { cn } from "../util/util";
import { validCountries } from "@/constants/country";
import { profileValidationSchema } from "./profile.validation";
import { countryCodes } from "@/constants/countryCodes";
import { useProfileAction } from "@/hooks/useProfileAction";
import { validMonths } from "@/constants/month";

const CreateProfileForm: React.FC = () => {
  const { successful, message, handleCreateProfile } = useProfileAction();
  const initialValues = {
    username: "",
    description: "",
    country_of_residence: "",
    birthdate: "2003-10-10",
    mobile_phone_number: "",
  };
  return (
    <div>
      <div className="bg-secondary flex items-center justify-center w-[550px] h-screen flex-col max-[500px]:w-full max-[500px]:p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={profileValidationSchema}
          onSubmit={handleCreateProfile}
        >
          <Form className="w-[470px] mt-8 ml-16 mr-16 max-[500px]:w-full">
            {!successful && (
              <div>
                {message && (
                  <div>
                    <div className="mt-[-1rem] bg-invalidCredentialBg text-center pt-6 pb-6 pl-4 pr-4 text-base font-light rounded-2xl mb-4">
                      {message}
                    </div>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="username"
                    className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                  >
                    Username
                    <span className="text-textError ml-[4px]">*</span>
                  </label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="reyven-ai"
                    type="text"
                    className={cn(
                      "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                      "placeholder-gray-500 text-[0.9rem] font-light"
                    )}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                  >
                    Description
                    <span className="text-textError ml-[4px]">*</span>
                  </label>
                  <Field
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Software Developer"
                    className={cn(
                      "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                      "placeholder-gray-500 text-[0.9rem] font-light"
                    )}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country_of_residence"
                    className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                  >
                    Country of Residence
                    <span className="text-textError ml-[4px]">*</span>
                  </label>
                  <Field
                    as="select"
                    id="country_of_residence"
                    name="country_of_residence"
                    className={cn(
                      "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                      "placeholder-gray-500 text-[0.9rem] font-light"
                    )}
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    {validCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="country_of_residence"
                    component="div"
                    className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                  />
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                  >
                    Date of Birth
                    <span className="text-textError ml-[4px]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Field
                      id="birthDay"
                      name="birthDay"
                      type="number"
                      placeholder="DD"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[50%] p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    />
                    <Field
                      id="birth_of_date"
                      as="select"
                      name="birth_of_date"
                      type="text"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    >
                      <option value="" disabled>
                        Month
                      </option>
                      {validMonths.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </Field>
                    <Field
                      id="birthYear"
                      name="birthYear"
                      type="number"
                      placeholder="YYYY"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[80%] p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="text-primaryTextColor block mb-[3px] text-[15px] font-light"
                  >
                    Mobile Phone Number
                    <span className="text-textError ml-[4px]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Field
                      as="select"
                      name="mobile_phone_number"
                      id="mobile_phone_number"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-[50%] p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    >
                      <option value="">Country Codes</option>
                      {countryCodes.map((countryCode, i) => (
                        <option
                          key={`${i}-${countryCode.code}`}
                          value={countryCode.code}
                        >
                          {countryCode.flag} {countryCode.name}{" "}
                          {countryCode.code}
                        </option>
                      ))}
                    </Field>
                    <Field
                      id="mobile_phone_number"
                      name="mobile_phone_number"
                      placeholder="+37253545033"
                      type="text"
                      className={cn(
                        "sm:bg-blue border-[1px] border-inputBorder bg-transparent block w-full p-4 py-3.5 rounded-xl text-sm mb-[1.9rem]",
                        "placeholder-gray-500 text-[0.9rem] font-light"
                      )}
                    />
                  </div>
                  <ErrorMessage
                    name="mobile_phone_number"
                    component="div"
                    className="text-rose-600 mt-[-20px] text-[15px] font-light mb-5 items-center"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-backgroundButtonColor text-white border-none cursor-pointer p-[0.8rem] w-full rounded-[30px] text-[15px] font-semibold mb-4"
                >
                  Save
                </button>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateProfileForm;

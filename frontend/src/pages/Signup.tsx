import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import sandSmall from "../assets/sand-small.jpg";
import sand from "../assets/sand.jpg";
import BlurImage from "../components/BlurImage";
import ShowAlert from "../components/ShowAlert";
import { signupUser } from "../helpers/api-communicator";
import { signupValidation } from "../helpers/validation";
import { isAlertAtom, showAlertAtom } from "../store/alert-atoms";
import { currentUserAtom, isLoggedInAtom } from "../store/user-info-atom";
import { SignupUserType, alertType, errorMessageType } from "../types";
export const Signup = () => {
  const [errors, setErrors] = useState<errorMessageType>([]);
  const [currentAlert, setCurrentAlert] = useRecoilState(showAlertAtom);
  const [isAlert, setIsAlert] = useRecoilState(isAlertAtom);
  const [credentials, setCredentials] = useState<SignupUserType>({
    email: "",
    password: "",
    name: "",
  });

  const { password, email, name } = credentials;
  const setCurrentUserAtom = useSetRecoilState(currentUserAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  useEffect(()=>{
    setIsAlert(false);
  },[setIsAlert])
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors([{}]);
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsAlert(false);
  };
  const submitSignupForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = signupValidation({ name, email, password });
    if (result.length != 0) {
      setErrors(result);
    } else {
      const data = await signupUser(email, password, name);
      if (data.status === 200) {
        setCurrentUserAtom({ name: data.name, email: data.email });
        setIsLoggedIn(true);
        navigate("/chat");
      } else {
        setIsAlert(true);
        const time = Date.now();
        setCurrentAlert({
          message: data.message,
          page: "signup",
          severity: data.status === 409 ? alertType.info : alertType.error,
          timestamp: time,
        });
      }
    }
  };
  return (
    <div>
      <div className="absolute w-full top-0 z-50">
        {isAlert && currentAlert.page === "signup" ? <ShowAlert /> : ""}
      </div>

      <div className="h-screen flex justify-center items-center">
        <div className="absolute bg-cover flex justify-center items-center h-[100%] w-[100%] bg-orange-200">
          <BlurImage src={sand} placeholder={sandSmall} />
        </div>
        <div className="md:flex parent-container drop-shadow-2xl rounded-xl items-center md:h-[75%] md:w-[800px] bg-white">
          <section className="hidden md:flex md:w-1/2 h-[100%] text-white rounded-tl-xl rounded-bl-xl bg-[#A4C5B5]">
            <div className="h-full mx-[1rem] text-center flex justify-center items-center">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold">
                  Welcome to{" "}
                  <span className="text-orange-600">Knowledge Pro!</span>
                </h2>
                <p>
                  Harness the power of AI with Knowledge Pro. Our platform,
                  powered by the{" "}
                  <span className="text-orange-600 font-semibold">
                    GPT-3.5 Turbo model
                  </span>{" "}
                  provides instant answers to your questions.
                </p>
                <p>
                  Sign in now and unlock a world of knowledge at your
                  fingertips!
                </p>
              </div>
            </div>
          </section>
          <section className="flex items-center h-[100%] text-black md:w-1/2">
            <div className="flex items-center w-full justify-center mx-auto">
              <div className="w-full bg-white rounded-xl sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                    Sign up to your account
                  </h1>
                  <form
                    onSubmit={submitSignupForm}
                    className="space-y-4 md:space-y-6"
                    action="#"
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Name
                      </label>
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="user name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    {errors[0] ? (
                      <span className="text-red-400">{errors[0].name}</span>
                    ) : (
                      ""
                    )}

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        onChange={(e) => onChange(e)}
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="abc@mail.com"
                      />
                    </div>
                    {errors[1] ? (
                      <span className="text-red-400">{errors[1].email}</span>
                    ) : (
                      ""
                    )}
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        onChange={(e) => onChange(e)}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                    </div>
                    {errors[2] ? (
                      <span className="text-red-400">{errors[2].password}</span>
                    ) : (
                      ""
                    )}
                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign Up
                    </button>

                    <p className="text-sm font-light text-gray-500">
                      Already have an account?{" "}
                      <a
                        onClick={() => navigate("/login")}
                        className="font-medium cursor-pointer text-primary-600 hover:underline"
                      >
                        Sign in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

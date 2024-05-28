import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import galaxySmall from '../assets/galaxy-small.jpg';
import galaxy from "../assets/galaxy.jpg";
import BlurImage from "../components/BlurImage";
import { loginUser } from "../helpers/api-communicator";
import { currentUserAtom, isLoggedInAtom } from "../store/atom";
import { LoginUserType } from "../types";
export const Login = () => {
  const [isGuest, setIsGuest] = useState(false);
  const [credentials, setCredentials] = useState<LoginUserType>({
    email: "",
    password: "",
  });
  const fillGuestCredentials = async () => {
    setIsGuest(true);
    setCredentials({
      email: "test123@gmail.com",
      password: "1231122",
    });
  };
  const { password, email } = credentials;
  const setCurrentUserAtom = useSetRecoilState(currentUserAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const navigate = useNavigate();

  const submitLoginForm = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (email && password && email.trim() !== "" && password.trim() !== "") {
      const data = await loginUser(email, password);
      if (data && data.message === "ok") {
        setCurrentUserAtom({ email: data.email, name: data.name });
        setIsLoggedIn(true);
        navigate("/chat");
      }
    }
  };
  useEffect(() => {
    if (
      isGuest &&
      credentials.email === "test123@gmail.com" &&
      credentials.password === "1231122"
    ) {
      submitLoginForm();
      setIsGuest(false);
      setCredentials({
        email: "",
        password: "",
      });
    }
  }, [credentials, isGuest]);

  return (
    <div className="relative h-screen flex justify-center items-center">
      <div
      className="absolute bg-cover flex justify-center items-center h-[100%] w-[100%] bg-orange-200">
      <BlurImage src={galaxy} placeholder={galaxySmall}/>
      </div>
      <div className="md:flex parent-container drop-shadow-2xl rounded-xl items-center md:h-[70%] md:w-[800px] bg-white">
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
                Sign in now and unlock a world of knowledge at your fingertips!
              </p>
            </div>
          </div>
        </section>
        <section className="flex items-center h-[100%] text-black md:w-1/2">
          <div className="flex items-center w-full justify-center mx-auto">
            <div className="w-full bg-white rounded-xl sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Sign in to your account
                </h1>
                <form
                  onSubmit={submitLoginForm}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) =>
                        setCredentials({ email: e.target.value, password })
                      }
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="abc@mail.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) =>
                        setCredentials({ email, password: e.target.value })
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-center text-gray-600">OR</p>
                  <button
                    onClick={fillGuestCredentials}
                    type="button"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Guest Sign in
                  </button>

                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?{" "}
                    <a
                      onClick={() => navigate("/signup")}
                      className="font-medium cursor-pointer text-primary-600 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

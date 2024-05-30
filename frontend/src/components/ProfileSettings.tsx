import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { updateProfileInfo } from "../helpers/api-communicator";
import { profileToggleAtom } from "../store/chat-atom";
import { currentUserAtom } from "../store/user-info-atom";
import { updateProfileInfoType } from "../types";

const ProfileSettings = () => {
  const [credentials, setCredentials] = useState<updateProfileInfoType>({
    name: "",
    currentPassword: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  useEffect(() => {
    setCredentials((prev) => ({
      ...prev,
      email: currentUser.email,
      name: currentUser.name,
    }));
  }, [currentUser.name, currentUser.email]);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateProfileInfo({ credentials: credentials });
    if (response.message === "ok") {
      const { email, name } = response;
      setCurrentUser({ name, email });
    }
  };
  const setIsProfileVisible = useSetRecoilState(profileToggleAtom);
  const { name, email, currentPassword, newPassword, confirmNewPassword } =
    credentials;
  return (
    <div>
      <form onSubmit={submitForm} className="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            onChange={(e) => onChange(e)}
            value={name ?? ""}
            type="text"
            name="name"
            id="name"
            placeholder="user name"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
            block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            onChange={(e) => onChange(e)}
            value={email ?? ""}
            type="text"
            name="email"
            id="email"
            className="bg-gray-200 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
            block w-full p-2.5"
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Current Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            value={currentPassword}
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
            block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            value={newPassword}
            type="newPassword"
            name="newPassword"
            id="newPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
            block w-full p-2.5"
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Confirm New Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            value={confirmNewPassword}
            type="confirmNewPassword"
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 
            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
            block w-full p-2.5"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 
          focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update
        </button>

        <button
          onClick={() => {
            setIsProfileVisible(false);
          }}
          type="button"
          className="w-full text-white bg-orange-400 hover:bg-orange-500 
          focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;

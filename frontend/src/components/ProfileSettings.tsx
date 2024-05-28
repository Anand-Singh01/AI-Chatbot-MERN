import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { updateProfileInfo } from "../helpers/api-communicator";
import { currentUserAtom, profileToggleAtom } from "../store/atom";
import { updateProfileInfoType } from "../types";

const ProfileSettings = () => {
  const [credentials, setCredentials] = useState<updateProfileInfoType>({
    name: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  useEffect(() => {
    setCredentials((prev) => ({ ...prev, name: currentUser.name }));
  }, [currentUser.name]);
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateProfileInfo({credentials:credentials});
    if(response.message === 'ok')
    {
      const {email, name} = response;
      setCurrentUser({name, email});
    }
  };
  const setIsProfileVisible = useSetRecoilState(profileToggleAtom);
  const { name, currentPassword, newPassword, confirmNewPassword } =
    credentials;
  return (
    <div>
      <form onSubmit={submitForm} className="space-y-4 md:space-y-6" action="#">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            onChange={(e) =>
              setCredentials({
                currentPassword,
                confirmNewPassword,
                newPassword,
                name: e.target.value,
              })
            }
            value={name}
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
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Current Password
          </label>
          <input
            onChange={(e) =>
              setCredentials({
                currentPassword: e.target.value,
                confirmNewPassword,
                newPassword,
                name,
              })
            }
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
            onChange={(e) =>
              setCredentials({
                currentPassword,
                confirmNewPassword,
                newPassword: e.target.value,
                name,
              })
            }
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
            onChange={(e) =>
              setCredentials({
                currentPassword,
                confirmNewPassword: e.target.value,
                newPassword,
                name,
              })
            }
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

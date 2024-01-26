import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { firstNameAtom, lastNameAtom, tokenAtom } from "./store/token";

export const SignInPage = () => {
  const [token, setToken] = useRecoilState(tokenAtom);
  const setLastName = useSetRecoilState(lastNameAtom);
  const setFirstName = useSetRecoilState(firstNameAtom);
  const firstName = useRecoilValue(firstNameAtom);
  const [showAlert, setShowAlert] = useState(false);
  const [resMess, setResMess] = useState("");
  const [signInValid, setSignInValid] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleSignUp = () => {
    axios
      .post("http://localhost:3000/api/v1/user/signin", {
        username: user.email,
        password: user.password,
      })
      .then(async (res) => {
        setToken(res.data.token);

        if (res.data.firstName) {
          await setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          console.log(firstName);
        }

        res.status === 200 ? setSignInValid(true) : setSignInValid(false);
        setResMess(res.data.mess);
        console.log(res.data);
      })
      .catch((err) => {
        setResMess(err.response.data.mess);
        console.log(err.response.data.mess);
      });
    setShowAlert(true);
    if (signInValid) navigate("/dashboard");
  };
  return (
    <div
      className="flex flex-2 items-center justify-center h-screen static 
    "
    >
      {showAlert &&
        (signInValid ? (
          <div className="absolute top-[230px] border-2 w-1/4 h-[55px] border-green-600 rounded-sm px-5 py-9 flex items-center gap-2 min-w-[460px]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="text-green-700">{resMess}</div>
          </div>
        ) : (
          <div className="absolute top-[230px] border-2 w-1/4 h-[55px] border-red-600 rounded-sm px-5 py-9 flex items-center gap-2 min-w-[460px]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="text-red-700">{resMess}</div>
          </div>
        ))}

      <div className="flex flex-col justify-center p-10 rounded-lg border-2 mt-10 gap-9 w-1/4 min-w-[460px]">
        <div
          className="flex flex-col items-center gap-6
        "
        >
          <div className="font-bold text-2xl">Sign In</div>
          <div className="text-gray-500">
            Enter your credentials to access your account
          </div>
        </div>

        <div className="flex gap-9 flex-col ">
          <div>
            <div className="text-gray-400">email</div>
            <input
              type="email"
              className="border-2 outline-black rounded w-full h-11 p-2"
              onKeyDown={(e) => {
                e.key === "Enter" ? handleSignUp() : null;
              }}
              onChange={(e) => {
                setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
                // console.log(user.lastname);
              }}
            />
          </div>
          <div>
            <div className="text-gray-400">password</div>
            <input
              type="password"
              className="border-2 outline-black rounded w-full h-11 p-2 "
              onKeyDown={(e) => {
                e.key === "Enter" ? handleSignUp() : null;
              }}
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }));
                // console.log(user.lastname);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center flex-col">
          <button
            className="bg-black text-white px-14 rounded-lg py-4 hover:bg-gray-700 transition duration-150 font-bold"
            onClick={() => {
              handleSignUp();
            }}
          >
            Sign Up
          </button>
          <div className="flex justify-between">
            <div>don't have an acoount?</div>{" "}
            <div
              onClick={() => {
                navigate("/signup");
              }}
              className="hover:underline cursor-pointer"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

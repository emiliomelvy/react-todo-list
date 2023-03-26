import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const LoggedIn = ({
  buttonLogin,
  setButtonLogin,
  isValidEmail,
  setValidEmail,
  isValidPassword,
  setIsValidPassword,
  setIsLoggedIn,
}) => {
  const validEmail = (e) => {
    if (e.target.value.includes("@")) return setValidEmail(true);
    setValidEmail(false);
  };

  const validPassword = (e) => {
    if (e.target.value.trim().length > 6) return setIsValidPassword(true);
    setIsValidPassword(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isValidEmail && isValidPassword) setButtonLogin(true);
    }, 500);

    return () => {
      console.log("cleared");
      clearTimeout();
    };
  }, [isValidEmail, isValidPassword]);

  return (
    <div className="w-screen h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white m-auto pt-10 pb-8 px-7 rounded w-[500px]">
        <h1 className="text-center text-3xl font-bold pb-8">Login</h1>
        <div className="flex flex-col pb-1 border-b-2 border-b-slate-400">
          <label htmlFor="username" className="text-sm text-slate-600 pb-1">
            Username
          </label>
          <span>
            <FontAwesomeIcon icon={faUser} className="text-xs text-slate-500" />
            <input
              onChange={(event) => validEmail(event)}
              id="username"
              type="text"
              placeholder="Type your username"
              className={`pl-2 focus:outline-none w-11/12 ${
                isValidEmail ? "" : "text-red-500"
              }`}
            />
          </span>
        </div>
        <div className="flex flex-col pt-5 pb-1 border-b-2 border-b-slate-400">
          <label htmlFor="password" className="text-sm text-slate-600 pb-1">
            Password
          </label>
          <span>
            <FontAwesomeIcon icon={faLock} className="text-xs text-slate-500" />
            <input
              onChange={(e) => validPassword(e)}
              id="password"
              type="password"
              placeholder="Type your password"
              className={`pl-2 focus:outline-none w-11/12 ${
                isValidPassword ? "" : "text-red-500"
              }`}
            />
          </span>
        </div>
        <div className="flex justify-center">
          <button
            disabled={!buttonLogin}
            onClick={() => setIsLoggedIn(true)}
            className={`py-2 px-10 mt-10 w-11/12 font-bold text-white rounded-full
              ${
                buttonLogin
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  : "bg-slate-600 text-white cursor-not-allowed"
              }
            `}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;

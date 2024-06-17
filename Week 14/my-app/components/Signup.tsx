"use client";
import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function registrationHandler() {
    try {
      const res = await axios.post("http://localhost:3000/api/user", {
        username,
        email,
        password,
      });

      setUsername("");
      setEmail("");
      setPassword("");

      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={registrationHandler}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <a
                    href="signin"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

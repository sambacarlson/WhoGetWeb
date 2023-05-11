import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useAppDispatch } from "@/redux_store/hooks";
import { setUser } from "@/services/redux_slices/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { asPath } = useRouter();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // dispatch(setUser(""));
      localStorage.clear();
      router.push("/authenticate");
    } catch (error) {
      setError(`${error}`);
    }
  };
  return (
    <div className="relative flex flex-row items-center justify-between px-[48px] py-2 h-[10vh] bg-primary">
      <div className="flex flex-row items-center justify-center">
        <Image
          src="/whoget_white.png"
          width={100}
          height={100}
          alt="whoget logo"
          className="h-auto w-auto"
        />
      </div>
      <div className="hidden md:flex flex-row items-center justify-center space-x-4 text-white">
        {/* <div onClick={()=>{setShowMenu(prevState=>!prevState)}} className="w-full flex items-end py-2 hover:underline duration-300 hover:cursor-pointer"><Link href="/dashboard">Dashboard</Link> </div> */}
        <div
          onClick={() => {
            setShowMenu((prevState) => !prevState);
          }}
          className={`${
            asPath === "/users" && "ring-1"
          } ring-white py-1 px-2 w-full flex items-end hover:underline duration-300 hover:cursor-pointer`}
        >
          <Link href="/users">Users</Link>{" "}
        </div>
        <div
          onClick={() => {
            setShowMenu((prevState) => !prevState);
          }}
          className={`${
            asPath === "/asks" && "ring-1"
          } ring-white py-1 px-2 w-full flex items-end hover:underline duration-300 hover:cursor-pointer`}
        >
          <Link href="/asks">Asks</Link>{" "}
        </div>
      </div>
      <div className="hidden md:flex">
        <div
          onClick={handleSignOut}
          className="px-3 bg-white py-1 text-primary self-center hover:opacity-70 duration-200 hover:cursor-pointer rounded-md"
        >
          <Link href="/authenticate">Log out</Link>
        </div>
      </div>
      <div
        onClick={() => {
          setShowMenu((prevState) => !prevState);
        }}
        className="md:hidden flex flex-row items-center justify-center text-white"
      >
        {!showMenu ? (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"
              />
            </svg>
          </div>
        ) : (
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
              />
            </svg>
          </div>
        )}
      </div>
      {showMenu && (
        <div className="absolute top-[15vh] left-0 w-3/4 h-[100vh] flex md:hidden flex-col items-start justify-start px-7 text-white bg-primary divide-y">
          <div
            onClick={() => {
              setShowMenu((prevState) => !prevState);
            }}
            className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"
          >
            <Link href="/users">Users</Link>{" "}
          </div>
          <div
            onClick={() => {
              setShowMenu((prevState) => !prevState);
            }}
            className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"
          >
            <Link href="/asks">Asks</Link>{" "}
          </div>
          <div
            onClick={() => {
              setShowMenu((prevState) => !prevState);
            }}
            className="w-full flex items-end py-2 hover:px-2 hover:bg-white hover:text-primary duration-200 hover:cursor-pointer"
          >
            <Link href="/authenticate">Log out</Link>{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

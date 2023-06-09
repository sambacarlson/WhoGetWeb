import Alerts from "@/components/Alerts";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BASE_URL } from "@/services/constants";
import { userType } from "@/services/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

///FIXME: these independent functions should be moved to their own file.
const fetchUsers = async () => {
  try {
    const users = await axios.get(`${BASE_URL}/users/all`);
    return users.data;
    // const response = await fetch(`${BASE_URL}/users/all`);
    // const users = await response.json();
    // return users;
  } catch (error) {
    throw error
  }
}

const Users = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector((state) => state.user);
  const [usersData, setUsersData] = React.useState<userType[]>(users);
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setBusy(true);
    const jwtToken = JSON.parse(localStorage.getItem("@jwtToken") as string);
    if (!jwtToken) {
      router.replace("/authenticate");
    }
    ///fetch data from db
    fetchUsers()
      .then((data) => { setUsersData(data); setBusy(false) })
      .catch((error) => { setError(`${error.message}`); setBusy(false) });
  }, [dispatch, router, usersData]);

  // FIXME: remove these log statements
  console.log('busy==>>', busy)
  console.log('askData==>>', usersData)
  console.log('error==>>', error)

  const handleBan = (id: string) => {
  };
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      {busy && <Loading />}
      {error && (
        <Alerts type="error" message={error} closeFn={() => setError("")} />
      )}
      <Navbar />
      <div className="flex-1 p-5 md:p-14 text-primary overflow-x-scroll">
        <table className="table-auto border-collapse w-full">
          <caption className="text-md font-bold text-start py-5">
            <span className="pr-10">
              Users: <span className="text-tertiary">{usersData.length}</span>
            </span>
            <span>
              Banned users:{" "}
              <span className="text-tertiary">
                {usersData.filter(user => user.status.banned === true).length}
              </span>
            </span>
          </caption>
          <thead>
            <tr className="text-lg md:text-xl border-b border-primary">
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Action
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Banned
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Profile
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Username
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                WhatsApp
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Telephone
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Email
              </td>
            </tr>
          </thead>
          <tbody>
            {usersData.length > 0 &&
              usersData.map((user) => (
                <tr
                  key={user._id}
                  className="h-12 hover:bg-tertiary hover:bg-opacity-10"
                >
                  <td
                    onClick={() => handleBan(user._id)}
                    className="pl-1 flex border-r-primary border-r md:border-0 pt-2 hover:cursor-pointer align-middle"
                  >
                    {user.status.banned ? (
                      <span className="text-white bg-primary ring-1 hover:ring-2 hover:ring-tertiary ring-primary px-3 py-1 w-16 flex justify-center rounded-md">
                        unban
                      </span>
                    ) : (
                      <span className="ring-1 hover:ring-2 hover:ring-primary ring-tertiary px-3 py-1 w-16 flex justify-center rounded-md">
                        ban
                      </span>
                    )}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.status.bannedDate ? user.status.bannedDate : "_"}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.photo ? (
                      <Image
                        src={user.photo}
                        alt="profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      "_"
                    )}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.username}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.whatsapp ? user.whatsapp : "_"}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.telephone}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {user.email ? user.email : "_"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Users;

import Alerts from "@/components/Alerts";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BASE_URL } from "@/services/constants";
import { askType } from "@/services/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

///FIXME: these independent functions should be moved to their own file.
const fetchAsks = async () => {
  try {
    const asks = await axios.get(`${BASE_URL}/asks/all`);
    // const response = await fetch(`${BASE_URL}/asks/all`);
    // const asks = await response.json();
    // return asks
    return asks.data;
  } catch (error) {
    throw error
  }
}

const Asks = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const asks = useAppSelector((state) => state.ask);
  const [asksData, setAsksData] = useState<askType[]>(asks);
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    setBusy(true);
    //get token from local storage
    const jwtToken = JSON.parse(localStorage.getItem("@jwtToken") as string);
    if (!jwtToken) {
      router.replace("/authenticate");
    }
    ///fetch data from db
    fetchAsks()
      .then((data) => { setAsksData(data); setBusy(false); })
      .catch((error) => { setError(`${error.message}`); setBusy(false); });
  }, [dispatch, router, asksData]);

  // FIXME: remove these log statements
  console.log('busy==>>', busy)
  console.log('askData==>>', asksData)
  console.log('error==>>', error)


  //methods
  const handleHide = (id: string) => { }

  //return
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      {busy && !error && <Loading />}
      {error && (
        <Alerts type="error" message={error} closeFn={() => setError("")} />
      )}
      <Navbar />
      <div className="flex-1 m-5 md:m-[48px] text-secondary overflow-x-scroll">
        <table className="border-collapse table-auto w-full">
          <caption className="text-md font-bold text-start py-5">
            <span className="pr-10">
              Asks: <span className="text-tertiary">{asksData.length}</span>
            </span>
            <span>
              Hidden asks: {" "}
              <span className="text-tertiary">
                {asksData.filter((ask) => ask.status.hidden === true).length}
              </span>
            </span>
          </caption>
          <thead>
            <tr className="text-lg md:text-xl border-primary border-b flex-row w-full h-10">
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Action
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Hidden
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Username
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Categories
              </td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">
                Message
              </td>
            </tr>
          </thead>
          <tbody>
            {asksData.length > 0 &&
              asksData.map((ask) => (
                <tr
                  key={ask._id}
                  className="align-top h-12 hover:bg-tertiary hover:bg-opacity-10"
                >
                  <td
                    onClick={() => handleHide(ask._id)}
                    className="pl-1 flex border-r-primary border-r md:border-0 pt-2 hover:cursor-pointer align-middle"
                  >
                    {ask.status.hidden ? (
                      <span className="text-white bg-primary ring-1 hover:ring-2 hover:ring-tertiary ring-primary px-3 py-1 w-16 flex justify-center rounded-md">
                        show
                      </span>
                    ) : (
                      <span className="ring-1 hover:ring-2 hover:ring-primary ring-tertiary px-3 py-1 w-16 flex justify-center rounded-md">
                        hide
                      </span>
                    )}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 text-primaryLight">
                    {ask.status.hiddenDate ? ask.status.hiddenDate : "_"}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">
                    {ask.user.username}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 hideOverflowText">
                    {ask.categories}
                  </td>
                  <td className="pt-1 pl-1 border-r-primary border-r md:border-0 hideOverflowText">
                    {ask.message}
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

export default Asks;

import Alerts from '@/components/Alerts';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useAppDispatch, useAppSelector } from '@/redux_store/hooks';
import { fetchAsks } from '@/services/redux_slices/askSlice';
import { askType } from '@/services/types';
import React, { useEffect, useState } from 'react'



// const askData: askType[] = [];

const Asks = () => {
  const dispatch = useAppDispatch()
  const asks = useAppSelector(state => state.ask)
  useEffect(() => {
    dispatch(fetchAsks())
  }, [dispatch])
  // console.log(asks)
  //states
  const [asksData, setAsksData] = useState<askType[]>(asks.asks)
  //methodes
  const handleHide = (id: string) => {
    for (let ask of asksData) {
      if (ask._id === id) {
        const _status = asksData[asksData.indexOf(ask)].status;
        const date = new Date();
        const formatedDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
        // setAsksData(prevData => {
        //   const newData: askType[] = Array.from(prevData);
        //   newData[prevData.indexOf(ask)].status = { hidden: !_status.hidden, hiddenDate: !_status.hidden ? formatedDate : '' }
        //   // console.log(newData[prevData.indexOf(ask)])
        //   return newData
        // })
      }
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      {asks.loading && <Alerts type='info' message='Loading...' />}
      {!asks.loading && asks.error && <Alerts type='error' message={asks.error} />}
      <Navbar />
      <div className="flex-1 m-5 md:m-[48px] text-secondary overflow-x-scroll">
        <table className="border-collapse table-auto w-full">
          <caption className="text-md font-bold text-start py-5"><span className="pr-10">Asks: <span className="text-tertiary">{asksData.length}</span></span><span>Hidden asks: <span className="text-tertiary">{asksData.filter(a => a.status.hidden === true).length}</span></span></caption>
          <thead>
            <tr className="text-lg md:text-xl border-primary border-b flex-row w-full h-10">
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">Action</td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">Hidden</td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">Username</td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">Categories</td>
              <td className="pr-5 pl-1 md:pr-10 border-r-primary border-r md:border-0">Message</td>
            </tr>
          </thead>
          <tbody>
            {asksData.map(ask => (
              <tr key={ask._id} className="align-top h-12 hover:bg-tertiary hover:bg-opacity-10">
                <td onClick={() => handleHide(ask._id)} className="pl-1 flex border-r-primary border-r md:border-0 pt-2 hover:cursor-pointer align-middle">{ask.status.hidden ? <span className="text-white bg-primary ring-1 hover:ring-2 hover:ring-tertiary ring-primary px-3 py-1 w-16 flex justify-center rounded-md">show</span> : <span className="ring-1 hover:ring-2 hover:ring-primary ring-tertiary px-3 py-1 w-16 flex justify-center rounded-md">hide</span>}</td>
                <td className="pt-1 pl-1 border-r-primary border-r md:border-0 text-primaryLight">{ask.status.hiddenDate ? ask.status.hiddenDate : '_'}</td>
                <td className="pt-1 pl-1 border-r-primary border-r md:border-0 ">{ask.userInfo.username}</td>
                <td className="pt-1 pl-1 border-r-primary border-r md:border-0 hideOverflowText">{ask.categories}</td>
                <td className="pt-1 pl-1 border-r-primary border-r md:border-0 hideOverflowText">{ask.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>

  )
}

export default Asks

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

interface askProp {
  _id: string;
  status: { hidden: boolean, hiddenDate: string };
  username: string;
  categories: string[];
  message: string;
}

// TODO: use useAppSelector to replace askData below with actual ask data
const tempAsksData: askProp[] = [
  {
    _id: 'ADKEET773D',
    status: { hidden: false, hiddenDate: '' },
    username: 'author o\'ask',
    categories: ['new, another cat, edu, economy'],
    message: 'Please who knows a good resource to learn coding on your own?'
  },
  {
    _id: 'NDK7DT76K',
    status: { hidden: false, hiddenDate: '' },
    username: 'author scholar',
    categories: ['education'],
    message: 'how to understand the art of effective studying'
  },
  {
    _id: 'J6K4G677L5',
    status: { hidden: false, hiddenDate: '' },
    username: 'user 34',
    categories: ['food'],
    message: 'Where is the nearest restaurant'
  }
]

const Asks = () => {
  const [asksData, setAsksData] = React.useState<askProp[]>(tempAsksData)
  const handleHide = (id: string) => {
    for (let ask of asksData) {
      if (ask._id === id) {
        const _status = asksData[asksData.indexOf(ask)].status;
        const date = new Date();
        const formatedDate = `${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}`;
        setAsksData(prevData => {
          const newData: askProp[] = Array.from(prevData);
          newData[prevData.indexOf(ask)].status = { hidden: !_status.hidden, hiddenDate: !_status.hidden ? formatedDate : '' }
          // console.log(newData[prevData.indexOf(ask)])
          return newData
        })
      }
    }
  }
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Navbar />
      <div className="flex-1 p-5 md:p-14 text-primary overflow-x-scroll">
        <table className="table-auto border-separate border-y border-primary border-spacing-7">
        <caption className="text-lg text-start pl-7">Asks</caption>
          <thead>
            <tr className="text-xl md:text-2xl">
              <td>Action</td>
              <td>Categories</td>
              <td>Message</td>
              <td>Hidden</td>
              <td>Username</td>
            </tr>
          </thead>
          <tbody>
            {asksData.map(ask => (
              <tr key={ask._id} className="align-top">
                <td onClick={() => handleHide(ask._id)} className="flex p-1 hover:cursor-pointer">{ask.status.hidden ? <span className="text-white bg-primary hover:text-primary hover:bg-transparent ring-1 ring-primary px-3 py-1 flex-1 flex justify-center">unhide</span> : <span className="hover:text-white hover:bg-primary ring-1 hover:ring-0 ring-primary px-3 py-1 flex-1 flex justify-center">hide</span>}</td>
                <td>{ask.categories ? ask.categories : '_'}</td>
                <td>{ask.message ? ask.message : '_'}</td>
                <td>{ask.status.hiddenDate ? ask.status.hiddenDate : '_'}</td>
                <td>{ask.username}</td>
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

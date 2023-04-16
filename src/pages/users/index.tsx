import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'
interface userProp {
  _id: string;
  status: { banned: boolean, bannedDate: string }
  username: string;
  whatsapp: number | undefined;
  telephone: number | undefined;
  email: string | undefined;
}

// TODO: remove usersData replace with data fromr redux store
const tempUsersData: userProp[] = [
  {
    _id: 'DDEI8386SS',
    status: { banned: false, bannedDate: '' },
    username: 'user one',
    whatsapp: 3344422,
    telephone: 0,
    email: 'user@email.ors',
  },
  {
    _id: 'EEKHE3880S',
    status: { banned: false, bannedDate: '' },
    username: 'user two',
    whatsapp: 334234422,
    telephone: 994447772,
    email: 'user23@email.ors',
  },
]

const Users = () => {
  const [usersData, setUsersData] = React.useState<userProp[]>(tempUsersData);
  const handleBan = (id: string) => {
    for (let user of usersData) {
      if (user._id === id) {
        const _status = usersData[usersData.indexOf(user)].status
        const date = new Date();
        const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setUsersData(prevData => {
          const newData: userProp[] = Array.from(prevData);
          newData[prevData.indexOf(user)].status = { banned: !_status.banned, bannedDate: !_status.banned ? formatedDate : '' }
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
          <caption className="text-lg text-start pl-7">Users</caption>
          <thead>
            <tr className="text-xl md:text-2xl">
              <td>Action</td>
              <td>Banned</td>
              <td>Username</td>
              <td>WhatsApp</td>
              <td>Telephone</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
              <tr key={user._id} className="">
                <td onClick={() => handleBan(user._id)} className="flex p-1 hover:cursor-pointer">{user.status.banned ? <span className="text-white bg-primary hover:text-primary hover:bg-transparent ring-1 ring-primary px-3 py-1 flex-1 flex justify-center">unban</span> : <span className="hover:text-white hover:bg-primary ring-1 hover:ring-0 ring-primary px-5 py-1 flex-1 flex justify-center">ban</span>}</td>
                <td>{user.status.bannedDate ? user.status.bannedDate : '_'}</td>
                <td>{user.username}</td>
                <td>{user.whatsapp ? user.whatsapp : '_'}</td>
                <td>{user.telephone ? user.telephone : '_'}</td>
                <td>{user.email ? user.email : '_'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>

  )
}

export default Users

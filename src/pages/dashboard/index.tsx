import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

interface statProps {
  users: number;
  asks: number;
  categories: number;
  banned: number;
  hidden: number;
}
const rawCategoryList = ["Category one", 'cat 2', 'cat4', 'cat8', 'fadfer', 'adfadfa', 'adfdre 34']
const allCategories = new Set<string>()
rawCategoryList.map(category => allCategories.add(category));
const categoryList: string[] = Array.from(allCategories); //convert to array to map.
const Dashboard = () => {
  const [statisticsData, setStatisticsData] = React.useState<statProps>({
    users: 0,
    asks: 0,
    categories: 0,
    banned: 0,
    hidden: 0
  });
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Navbar />
      <div className="flex flex-col md:flex-row md:space-x-40 space-y-8 md:space-y-0 text-primary h-full p-14">
        <div className="flex flex-col space-y-4 md:items-end border-primary border-l pl-1 pb-6">
          <h2 className="text-2xl pb-2 md:pb-10 md:self-center">Statistics</h2>
          <p>Users: <b>{statisticsData.users}</b></p>
          <p>Asks: <b>{statisticsData.asks}</b></p>
          <p>Categories: <b>{statisticsData.categories}</b></p>
          <p>Banned users: <b>{statisticsData.banned}</b></p>
          <p>Hidden messages: <b>{statisticsData.hidden}</b></p>
        </div>
        <div className="flex flex-col space-y-4 md:items-end border-primary border-l pl-1 pb-6">
          <h2 className="text-2xl pb-2 md:pb-10">Categories</h2>
          <ol className="flex flex-col space-y-4">
            {
              categoryList.map(category => {
                return <li key={category}>{category}</li>
              })
            }
          </ol>

        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Dashboard

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Axios from 'axios'
import { GetStaticProps } from 'next'
import { BiSearch } from 'react-icons/bi'
import GameCard from '../../components/Home/GameCard'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import SideBar from '../../components/SideBar'

const Page = ({ gameData }: any) => {
  const router = useRouter()
  const [pageGames, setPageGames] = useState([])
  const { page } = router.query
  console.log(page)

  const getNextPageGames = async () => {
    const res = await Axios.get(
      `https://api.rawg.io/api/games?key=a5c36a8abe0c4ddb9489dc567b3cf68d&page=${page}`
    )
    console.log(res)
    setPageGames(res.data.results)
  }

  useEffect(() => {
    getNextPageGames()
  }, [page])

  return (
    <div className="flex h-screen w-full flex-col bg-stone-800 py-2">
      <Navbar />
      <div className="flex h-full w-full">
        <SideBar />
        <div className="flex h-full w-full bg-stone-900 text-white xtab:p-6">
          <div className="flex h-[84vh] w-full flex-col overflow-auto overflow-x-hidden">
            <div
              className="tr sm:ml-0 mx-auto mt-4 flex w-1/2 items-center rounded-3xl bg-stone-800 px-3 py-2
             text-sm text-white tablet:text-lg"
            >
              <BiSearch className="mt-1 text-sm tablet:text-2xl" />
              <input
                maxLength={70}
                className="sm:w-full w-full bg-transparent px-2 text-[0.9em] outline-none tablet:text-lg"
                type="text"
                placeholder="Search Store "
              />
            </div>
            <div className="mx-auto mt-6 flex">
              <button
                className="flex items-center justify-center rounded-xl border-2
            border-stone-800 bg-stone-800 px-3 py-2 duration-200 hover:bg-stone-800"
              >
                All
              </button>
              <button
                className="ml-4 flex items-center justify-center rounded-xl
            border-2 border-stone-800 px-3 py-2 duration-200 hover:bg-stone-800"
              >
                Shooter
              </button>
              <button
                className="ml-4 flex items-center justify-center rounded-xl
            border-2 border-stone-800 px-3 py-2 duration-200 hover:bg-stone-800"
              >
                Racing
              </button>
              <button
                className="ml-4 flex items-center justify-center rounded-xl
            border-2 border-stone-800 px-3 py-2 duration-200 hover:bg-stone-800"
              >
                Sports
              </button>
              <button
                className="ml-4 flex items-center justify-center rounded-xl
            border-2 border-stone-800 px-3 py-2 duration-200 hover:bg-stone-800"
              >
                Strategy
              </button>
            </div>
            <h2 className="ml-2 mt-3 text-xl font-bold">All Games</h2>
            <div
              className="mx-auto mt-4 grid w-[230px] grid-cols-[50%] gap-4 px-2 tablet:grid-cols-3
            five:w-full  five:grid-cols-2 desktop:grid-cols-4"
            >
              {pageGames.map(
                (game: any, index: React.Key | null | undefined) => (
                  <GameCard item={game} key={index} />
                )
              )}
            </div>
            <Link href="/store/2">
              <button className="rounded-md bg-stone-700 px-3 py-2">Next</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async()=>{

//     const res = await Axios.get('https://api.rawg.io/api/games?key=a5c36a8abe0c4ddb9489dc567b3cf68d')
//     return {
//       props: {
//         gameData: res.data
//       },
//     };
//   };

export default Page
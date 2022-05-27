import type { NextPage } from 'next'
import Axios from 'axios'
import { GetServerSideProps } from "next";
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import StoreComp from '../../components/store/StoreComp';
import { useEffect, useState } from 'react';
import LinearIndeterminate from '../../components/Loaders/LinearLoad';

const Store: NextPage = ({gameData}: any) => {
  const [isLoading, SetIsLoading] = useState(true)
  const [isLinear, setLinear] = useState<boolean>(false)
  console.log(gameData);

  const delay = ()=>{
    setTimeout(()=>{
      SetIsLoading(false)
    }, 1000)
  }

  useEffect(()=>{
    delay();
  },[])
  
  return (
    <div className="flex w-full flex-col h-screen bg-stone-800">
      {isLinear&&<LinearIndeterminate />}
      <Navbar/>
      <div className="flex h-full w-full">
        <SideBar active='store'  setLinear={setLinear}  />
        <StoreComp gameData ={ gameData }
         setLoading={SetIsLoading} loading={isLoading} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async()=>{
  
  const res = await Axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`)
  return {
    props: {
      gameData: res.data
    },
  };
};


export default Store

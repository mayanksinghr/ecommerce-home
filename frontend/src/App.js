import logo from './logo.svg';
import './App.css';
import {Outlet} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import context from './context';
import {useDispatch} from 'react-redux'
import { setUserDeatails } from './store/userslice';


function App() {
const dispatch = useDispatch()
const [cartProductCount,setcartProductCount]= useState(0)

  const fetchUserDeatails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
    method:SummaryApi.current_user.method,
    credentials:"include"
    })
    const dataApi =await dataResponse.json()

    if(dataApi.success){
     dispatch(setUserDeatails(dataApi.data))
  }
  }

  const fetchUserAddTocart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
    method:SummaryApi.addToCartProductCount.method,
    credentials:"include"
    })
    
    const dataApi = await dataResponse.json()
    setcartProductCount(dataApi?.data?.count)
  }

    useEffect(()=>{
      fetchUserDeatails()
      fetchUserAddTocart()
    },[])

  

  return (
    <>
    <context.Provider value={{
    fetchUserDeatails, //user deatails fetch
    cartProductCount,//curent user add to cart product
    fetchUserAddTocart
    }}>
    <ToastContainer position="top-center"/>
    <Header/>
    <main className = "min-h-[calc(100vh-60px)] pt-16">
    <Outlet/>
    </main>
    <Footer/>
    </context.Provider>
    </>
  );
}

export default App;


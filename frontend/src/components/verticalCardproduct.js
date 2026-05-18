import React, { useContext } from "react"
import { useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { useEffect } from 'react'
import "../App.css"
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useRef } from "react"
import {Link} from "react-router-dom";
import addToCart from "../helpers/addToCart";
import context from "../context"

const VerticalCardProduct = ({ category, heading }) =>{
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [sroll, setscroll] = useState(0)
    const scrollElement = useRef()

    const {fetchUserAddTocart} = useContext(context)

    const handleAddToCart =async(e,id)=>{
          await addToCart(e,id)
          fetchUserAddTocart()
    }

    const fetchData = async () => {
        setloading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setloading(false)
        setdata(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }


    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    /*const nextImage = () =>{
        if(desktopImages.length-1>currentImage){
        setcurrentImage(preve => preve + 1)
        }
    }
 
    const preveImage = () =>{
        if(currentImage!=0){
        setcurrentImage(preve => preve - 1)
        }
    }*/



    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                {
                    loading?(
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px] bg-white  rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px]  md:min-w-[145px]   flex justify-center items-center animate-pulse'>
                                       
                                    </div>
                                    <div className='p-2 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 bg-slate-200 rounded-full animated-pluse'></h2>
                                        <p className='capitalize text-slate-500 p-1 bg-slate-200 rounded-full animated'></p>
                                        <div className='flex gap-2 w-full'>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                            <p className='text-slate-500 line-through p-1 w-full animate-pulse rounded-full bg-slate-200'></p>
                                        </div>
                                        <button className=' text-white px-3 py-0.5 rounded-full p-1 bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ):(
                        data.map((product, index) => {
                            return (
                               <Link to={"product/"+product._id}className='w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px] bg-white  rounded-sm shadow'>
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px]  md:min-w-[145px]   flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='h-full object-scale-down  hover:scale-110  transition-all cursor-pointer mix-blend-multiply' />
                                    </div>
                                    <div className='p-2 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingprice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        <button className='bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to card</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                    
                }
            </div>


        </div>
    )
}



export default VerticalCardProduct;
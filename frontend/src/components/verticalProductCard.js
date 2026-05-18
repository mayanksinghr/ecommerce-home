import React, { useContext } from "react";
import ScrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import AddToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import context from "../context";

const VerticalProductCard =({loading,data})=>{
    const loadingList = new Array(13).fill(null)
    const {fetchUserAddTocart} = useContext(context)

    const handleAddToCart =async(e,id)=>{
          await AddToCart(e,id)
          fetchUserAddTocart()
    }
   

  return(
    <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,300px))] md:justify-between justify-center md:gap-6 overflow-x-scroll scrollbar-none transition-all'>

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
                               <Link to ={`/product/${product._id}`} className='w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px] bg-white  rounded-sm shadow cursor-pointer'  onClick={()=>{ScrollTop()}}>
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

  )

}

export default VerticalProductCard
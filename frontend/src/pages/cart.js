import React, { useContext, useState } from "react"
import SummaryApi from "../common"
import { useEffect } from "react"
import context from "../context"
import displayINRCurrency from "../helpers/displayCurrency"
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {loadStripe} from '@stripe/stripe-js'
const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
console.log("Stripe key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const Cart =()=>{
   const [data,setdata] = useState([])
   const [loading,setloading] = useState(false)
   const Context = useContext(context)
   const loadingCart = new Array(Context.cartProductCount).fill(null)
   
    const navigate = useNavigate();
  
        const fetchData =async()=>{
       // setloading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url,{
        method:SummaryApi.addToCartProductView.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
     })
   // setloading(false);
   
     const responseData = await response.json()


     

     if(responseData.success){
        setdata(responseData.data)
     }

     if(responseData.error){
        toast.error(responseData.message);
      }

   }
   
   const handleLoading = async()=>{
   await fetchData()
   }



   useEffect(()=>{
     setloading(true)
     handleLoading()
     setloading(false)
   },[])


   console.log("data",data);

   const increaseQty =async(id,qty)=>{
      const response=await fetch(SummaryApi.updateCardProduct.url,{
        method:SummaryApi.updateCardProduct.method,
        credentials:"include",
        headers:{
            "Content-type":'application/json'
        },
        body:JSON.stringify({
            _id:id,
            quantity:qty + 1
            
        })
      })
   

  
   const responseData = await response.json()
    if(responseData.success){
        fetchData()
    }
    }

    const decrementQty =async(id,qty)=>{
        if(qty>=2){
        const response=await fetch(SummaryApi.updateCardProduct.url,{
          method:SummaryApi.updateCardProduct.method,
          credentials:"include",
          headers:{
              "Content-type":'application/json'
          },
          body:JSON.stringify({
              _id:id,
              quantity:qty - 1
          })
        })
     
  
    
     const responseData = await response.json()
      if(responseData.success){
          fetchData()
      }   
      }
    }

    
    const deleteCartProduct = async(id,qty)=>{
        
        const response=await fetch(SummaryApi.deleteCardProduct.url,{
            method:SummaryApi.deleteCardProduct.method,
            credentials:"include",
            headers:{
                "Content-type":'application/json'
            },
            body:JSON.stringify({
                _id:id,               
            })
          })
       
    
      
       const responseData = await response.json()
        if(responseData.success){
            fetchData()
            Context. fetchUserAddTocart();
            toast.success(responseData.message);
        }
        
        if(responseData.error){
            toast.error(response.error);      
        }
        }


        const handlePayment =  async()=>{
        const stripe = await stripePromise
        const response = await fetch(SummaryApi.payment.url,{
                method:SummaryApi.payment.method,
                credentials:"include",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({cartItems:data})
            })

            const responseData = await response.json()
          //  console.log("responseData",responseData)

           /* if(responseData?.id){
                stripePromise.redirectToCheckout({sessionId:responseData.id})

            }*/

          if (responseData?.url) {
             window.location.href = responseData.url; //  New way to redirect to Stripe Checkout
           } else {
           console.error("Stripe session creation failed:", responseData);
              }   

            console.log("payment response",responseData)
        }

     const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity,0)
     const totalprice = data.reduce((previousValue,currentValue)=>previousValue + (currentValue.quantity * currentValue?.productId?.sellingprice),0);
    
     const opendetail = (id)=>{
        console.log("id",id);
        navigate(`/product/${id}` )
     }


    return(
        <div className="container mx-auto">
       <div className="text-center text-lg my-3">
 { 
            data.length===0 && !loading &&(
            <p className="bg-white py-5">No Data</p>
        )
    }
        </div>

    <div className="flex flex-col lg:flex-row gap-10 lg:justify-between px-4">
       {/*view product*/}
        <div className="w-full max-w-3xl">
     {
            false?(
             
               <div>
                {
             loadingCart.map(el=>{
                return(
                    <div key={el+"add TO card Loading"} className="w-full bg-slate-200 h-32 my-2 border boder-slate-300 animated-pluse rounded"> 
                      </div>  
                )
            }
         )
        }
         </div>
         ):( 
            data.map((product,index)=>{
                return(
                    <div to={"product/"+product?.productId?._id} key={product._id+"add TO card Loading"} className="w-full bg-white h-32 my-2 border boder-slate-300 animated-pluse rounded grid grid-cols-[120px,1fr] cursor-pointer" > 
                    <div className="w-full h-32 bg-slate-200"> 
                        <img src={product?.productId.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply "  onClick={(e)=>opendetail(product?.productId?._id)}  />
                    </div>
                     
                    <div className="px-4 py-2 relative">
                { /**    delete product */}
                    <div className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white transition-all cursor-pointer" onClick={()=>deleteCartProduct(product?._id)}>
                    <MdDelete />
                    </div>

                    <h2 className="text-lg  text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                    <p className="capitalize text-slate-500 ">{product?.productId.category}</p>
                    <div className="flex items-center justify-between relative">
                    <p className="text-red-600 font-medium text-lg">{displayINRCurrency(product?.productId?.sellingprice)}</p>
                    <div  className="absolute -top-6 right-0 text-slate-600 font-semibold text-lg">amount pay</div>
                    <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product?.productId?.sellingprice * product?.quantity)}</p> 
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2">
                        <button className="border border-red-600 text-red-600 w-6 h-6 flex justify-center hover:bg-red-600 pb-1 hover:text-white text-2xl items-center rounded" onClick={()=>decrementQty(product?._id,product.quantity)}>-</button>
                        <span>{product?.quantity}</span>
                        <button className=" border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center pb-1 rounded text-2xl  hover:bg-red-600 hover:text-white" onClick={()=>increaseQty(product?._id,product.quantity)}>+</button>
                    </div>   
                    </div>
                 </div> 
                )
            }  
            )
     )
    }
         
        </div>

        {/**summary product */}

        {
            data[0] && (
<div className="mt-5 lg:mt-0 w-full max-w-sm">
        {
            loading?(
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pluse">
             Total
             </div> 
            ):(
                <div className="h-36 bg-white">
                 
                
                 <div className="px-3">
                <div className="flex items-center justify-between ">
                <p>Quantity</p>
                <p className="text-slate-600 font-medium p-4">{totalQty}</p>
                </div>
                <div className="text-slate-600 font-medium flex items-center justify-between">
                <p>Total amount</p>
                <p>{displayINRCurrency(totalprice)}</p>

                </div>
                </div>
                <button className="bg-red-600 p-2 mt-5 rounded-full text-white min-w-72 flex justify-center mx-auto" onClick={handlePayment}>Payment</button>
                </div>
            )
        }
        </div>
            )
        }

        
        </div>
       
        </div>
        )
}

export default Cart

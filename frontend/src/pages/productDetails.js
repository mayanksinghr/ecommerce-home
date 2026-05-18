import React, { useCallback, useContext, useEffect } from "react"
import { useState } from "react"
import {useNavigate, useParams} from "react-router-dom"
import SummaryApi from "../common"
import { toast } from "react-toastify"
import "../App.css"
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import AddToCart from "../helpers/addToCart"
import context from "../context"
//const categoryWiseProduct = React.lazy(()=>import("../components/categoryWiseProductDisplay"));
const CategroyWiseProductDisplay = React.lazy(()=>import('../components/categoryWiseProductDisplay'));



const ProductDetails=()=>{
  const [data,setdata] = useState({
    productName :"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingprice:""
  })

  const params = useParams()
  const[loading,setloading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const[activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate,setzoomImageCoordinate] = useState({
    x:0,
    y:0,
  })

  const [zoomImage,setZoomImage] = useState(false);

   
  const fetchproductDetails = async()=>{
    setloading(true)
    const response = await fetch(SummaryApi.ProductDetails.url,{
       method:SummaryApi.ProductDetails.method,
       headers:{
        "content-type":"application/json"
       },
       body:JSON.stringify({
        productId:params?.id       
    })
    })
   setloading(false)
    const dataResponse = await response.json()

    if(dataResponse.success){
        setdata(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }

  useEffect(()=>{
    fetchproductDetails()
  },[params.id])



const handleMouseEnterProduct =(imgURL)=>{
    setActiveImage(imgURL)
}


 const handleZoomImage =useCallback((e)=>{
    setZoomImage(true)
    const {left,top,width,height} = e.target.getBoundingClientRect()
    console.log("coordination",left ,top,width,height)

    const x= (e.clientX - left) / width
    const y=(e.clientY-top)/height

    setzoomImageCoordinate({
        x,
        y,
    })
    },[zoomImageCoordinate])

    const {fetchUserAddTocart} = useContext(context)
    const navigate = useNavigate()


    const handleLeaveImageZoom =()=>{
        setZoomImage(false);
    }

  const handleAddToCart = async(e,id)=>{
        await AddToCart(e,id);
        fetchUserAddTocart()
  }


  const handleBuyProduct =async(e,id)=>{
     await AddToCart(e,id)
     fetchUserAddTocart()
     navigate("/cart")
  }


    return (
        
        <div className="container mx-auto p-4">
         <div className= "min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/*product image*/}
           <div className="h-96 flex flex-col lg:flex-row-reverse gap-2">

             <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 relative p-2">
             <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"  onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />
             
              {/**product zomm */}
              {
                   zoomImage && (
                     <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1  -right-[510px]  top-0"> 
               <div className="w-full h-full min-h-[400px] min-w-[400px]  mix-blend-multiply scale-125"
                style={{
                    backgroundImage:`url(${activeImage})`,
                    backgroundRepeat:`no-repeat`,
                    backgroundPosition:`${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                }}>
               </div>

              </div>
                 )  
              }
              



             </div>
               <div className="h-full">
                {
                 loading?(
                     <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                     {
                     productImageListLoading.map((el,index)=>{
                        return(
                         <div className="h-20 w-20 bg-slate-200 rounded animate-pulse" key={"loadingImage"+index}>
                         
                         </div>
                        ) 
                     })
                 }
                    </div>
                 ):(
                    <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                     {
                     data.productImage.map((imgURL,index)=>{
                      return(
                     <div className="h-20 w-20 bg-slate-200 rounded p-1" key={imgURL}>
                      <img src={imgURL} className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer" onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                     </div>
                        ) 
                     })
                 }
                    </div>
                    
                 )
                     }
                     </div>
               </div>
              {/**product deatails */}
         {
             loading?(
         <div className="gap-1 w-full grid">
          <p className="bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block lg:h-8"></p>
          <h2 className="text-2xl lg:text-4xl font-medium h-4 bg-slate-200 animate-pulse my-1 lg:h-8 w-full"></h2>
          <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 my-1 w-full lg:h-8"></p>

            <div className="flex text-yellow-600 bg-slate-200 h-6 animate-pulse items-center gap-1 lg:h-8 w-full">
            
            </div>

            <div className="flex items-center gap-2 text-2xl font-medium text-red-600 my-2 h-6 animate-pulse w-full">
             <p className="text-red-600  bg-slate-200 "></p>
             <p className="text-slate-400  line-through bg-slate-200 "></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
             <button className="h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8"></button>
             <button className="h-6 bg-slate-200 rounded animate-pulse w-full lg:h-8"></button>
            </div>
             
             <div>
                 <p className="text-slate-600 font-medium my-1  h-6 bg-slate-200 rounded animated-pluse w-full"></p>
                 <p className="bg-slate-200 h-6 rounded animated-pluse w-full"></p>
             </div>




         </div> 
             ):(
                 <div className="flex flex-col gap-1">
                 <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">{data?.brandName}</p>
                 <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h2>
                 <p className="capitalize text-slate-400">{data?.category}</p>

                   <div className="flex text-yellow-600 items-center gap-1">
                   <FaStar/>  
                   <FaStar/>
                   <FaStar/>
                   <FaStar/>
                   <FaStarHalf/>
                   </div>

                   <div className="flex items-center gap-2 text-2xl font-medium text-red-600 my-2">
                    <p className="text-red-600">{displayINRCurrency(data.sellingprice)}</p>
                    <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
                   </div>

                   <div className="flex items-center gap-3 my-2">
                    <button className="border-2 border-red-600 rounded-full font-medium px-3 py-1 min-w-[100px] text-red-600 hover:bg-red-600 hover:text-white" onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                    <button className="border-2 border-red-600 rounded-full px-3 py-1 min-w-[100px] font-medium bg-red-600 text-white hover:bg-white hover:text-red-600" onClick ={(e)=>handleAddToCart(e,data?._id)} >Add to card</button>
                   </div>
                    
                    <div>
                        <p className="text-slate-600 font-medium my-1">Description:</p>
                        <p>{data?.description}</p>
                    </div>

                </div>   
             )
             } 
         </div> 
          


          {
            data.category && (
         <CategroyWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>   
            )
          }

     </div>
         
         

 
)
}

export default ProductDetails

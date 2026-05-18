import React, { useEffect } from "react"
import Uploadproduct from "../components/UploadProduct"
import { useState } from "react"
import SummaryApi from "../common"
import AdminProductCard from "../components/AdminProductCard"


const Allproduct = ()=>{
    const [openuploadproduct,setopenuploadproduct] = useState(false);
    const [allProduct,setallProduct] = useState([])

    const fetchallProduct = async()=>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
       
    console.log("data response",dataResponse)


    setallProduct(dataResponse?.data||[])
    console.log("allproduct",allProduct)
    }
     
    useEffect(()=>{
     fetchallProduct()
    },[])
    


    return(
        <div>
        <div className="bg-white py-2 px-4 flex justify-between items-center">
       <h2 className="front-bold text-lg ">All Product</h2>
      <button className="border-2 border-red-600 text-red-600 hover:bg-red-600  hover:text-white transition-all py-1 px-3 rounded-full" onClick={()=>setopenuploadproduct(true)}>Upload Product</button>
        </div>

       {/**all product */}
        <div className="flex items-center flex-wrap gap-14 py-4 h-[calc(100vh-190px)]  overflow-y-scroll ">
         {
            allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchallProduct}/>              
            )  
            })
        }
        </div>


        {/*upload product component */}
        {
            openuploadproduct && (
                <Uploadproduct onClose={()=>setopenuploadproduct(false)} fetchdata={fetchallProduct}/>
            )
        }
        </div>
    )

}

export default Allproduct
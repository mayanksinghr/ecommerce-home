import React from "react";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import productCategory from "../helpers/productCategary";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./Displayimage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import {toast} from "react-toastify"

const AdminEditProduct = ({onClose,productdata,fetchdata})=>{

    const [data,setdata] = useState({
        ...productdata,
        productName :productdata?.productName,
        brandName:productdata?.brandName,
        category:productdata?.category,
        productImage:productdata?.productImage||[],
        description:productdata?.description,
        price:productdata?.price,
        sellingprice:productdata?.sellingprice,

    })
 
    console.log("productImage",productdata?.productImage);

 const [openfullscreenimage,setopenfullscreenimage] = useState(false);
 const [fullscreenimage,setfullscreenimage] = useState("")


   

    const handleOnChange = (e)=>{
      const {name,value}= e.target
      setdata((preve)=>{
        return{
            ...preve,
            [name]:value
        }
      })

    }

    const handleuploadonchange = async(e)=>{
        const file = e.target.files[0]
       
        const uploadImageCloudinary = await uploadImage(file)
        
        setdata((preve)=>{
            return{
                ...preve,
                productImage:[...preve.productImage,uploadImageCloudinary.url]
            }
        }) 

    }


    const handledeleteproductimage = async(index)=>{
        console.log("image index",index)


        const newproductimage =[...data.productImage]
        newproductimage.splice(index,1)

        setdata((preve)=>{
            return{
                ...preve,
                productImage:[...newproductimage]
            }
        })
    }

    {/**upload product */}
    const handlesubmit = async(e) => {
     e.preventDefault()

     const response = await fetch(SummaryApi.updateProduct.url,{
     method:SummaryApi.updateProduct.method,
     credentials:'include',
     headers:{
       "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    
    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
        onClose()
        fetchdata();
    }


    if(responseData.error){
        toast.success(responseData.message)
    }}

    return(
        <div className="fixed bg-slate-200 bg-opacity-35 w-full h-full bg-red -600 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg"> Upload product</h2>
            <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick ={onClose}>
            <IoClose/>  
            </div>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handlesubmit}>
            <label htmlFor="productName">Product Name:</label>
            <input type="text" id="productName" name='productName' placeholder="enter product name" value={data.productName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded"/>

            <label htmlFor="brandName" className="mt-3">brand Name:</label>
            <input type="text" id="brandName" name='brandName' placeholder="enter brand name" value={data.brandName} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" required/>

            
            <label htmlFor="category" className="mt-3">category:</label>
            <select value={data.category} onChange={handleOnChange} name="category" className="p-2 bg-slate-100 border rounded" required>
            <option value ={""} >Select category</option>   
             {
                productCategory.map((el,index)=>{
                    return(
                        <option value ={el.value} key={el.value+index}>{el.label}</option>
                    )
                })
             }
            </select>


            <label htmlFor="productImage" className="mt-3">Product Image:</label>
            <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 rounded h-32 w-full flex justify-center items-center cursor-pointer">
            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
            <span className="text-3xl"><FaCloudUploadAlt/></span>
            <p className="text-sm">upload product image</p>
            <input type="file" id="uploadImageInput"  className="hidden" onChange={handleuploadonchange} />
            </div>
            </div>
            </label>
           <div>
            {
                            data?.productImage[0]?(
                                <div className="flex items-center gap-2">
                             {
                              data.productImage.map((el,index)=>{
                                return(
                                    <div className="relative group">
                                    <img src={el} alt={el} width={80} height={80} className="bg-slate-100 border cursor-pointer" onClick ={()=>{
                                     setopenfullscreenimage(true)
                                     setfullscreenimage(el)
                                    }}/>
                                    <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block" onClick ={()=>{
                                        handledeleteproductimage(index)
                                    }}>
                                        <MdDelete/>
                                    </div>
                                    </div>
                                )
                              })
                            }
                              </div>
                            ):(
            
                                <p className="text-red-600 text-xs">*please Upload product image</p>
                            )
                        }
           </div>

           <label htmlFor="price" className="mt-3">price:</label>
           <input type="number" id="price" name='price' placeholder="enter price" value={data.price} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded" required/>
           
           <label htmlFor="sellingprice" className="mt-3">Selling price:</label>
           <input type="number" id="sellingprice" name='sellingprice' placeholder="enter sellingprice" value={data.sellingprice} onChange={handleOnChange} className="p-2 bg-slate-100 border rounded " required/>
           
           <label  className="mt-3">Description</label>
           <textarea  className="h-28 bg-slate-100 border rounded   resize-non" name="description" row={3} placeholder="enter product description" value={data.description} onChange={handleOnChange} required></textarea>
           

           <button className="px-3 py-2 bg-red-600 mt-3 text-white mb-10 rounded-full w-full max-w-sm justify-center items-center flex mx-auto text-center hover:bg-red-700" required>Edit Product</button>

        </form>
        </div>
          
        {/*display image full */}
        {
            openfullscreenimage && (
                <DisplayImage onClose={()=>setopenfullscreenimage(false)} imgUrl={fullscreenimage} />
            )
        }
        </div>
    )
}

export default AdminEditProduct


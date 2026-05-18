import React, { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import productCategory from "../helpers/productCategary"
import "../App.css";
import CategroyWiseProductDisplay from "../components/categoryWiseProductDisplay";
import { useEffect } from "react";
import SummaryApi from "../common";
import VerticalProductCard from "../components/verticalProductCard";
import HorizontalCarProduct from "../components/HorizontalCardProduct";


    const CategoryProduct = () => {
    const params = useParams()
    const [data,setdata] = useState([])
    const navigate = useNavigate()
    const [loading,setloading] = useState(false)
    
    const [filterCategoryList,setFilterCategoryList] =useState({})
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")
     
   const urlCategoryListObject = {}
   urlCategoryListinArray.forEach(el=>{
    urlCategoryListObject[el] = true
   })

     const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
     const [sortBy,setSortBy] = useState("")

     console.log(sortBy)

     
    console.log("urlCategoryListinArray",urlCategoryListinArray);
    console.log("urlCategoryListObject",urlCategoryListObject);


    const fetchdata =async()=>{
      console.log("filterCategoryListindata",filterCategoryList)
        const response = await fetch(SummaryApi.filterProduct.url,{
          method:SummaryApi.filterProduct.method,
          headers:{
            "content-type":"application/json"
          },
          body: JSON.stringify({
            category:filterCategoryList
        })
        })

        const dataResponse = await response.json()
         
        setdata(dataResponse?.data||[])
        console.log(dataResponse);
    }


 const HandleSelectCategory =(e)=>{
   const {name,value,checked} = e.target
   setSelectCategory((preve)=>{
   return{
      ...preve,
     [value] : checked
    }
   })
 }

 useEffect(()=>{
  fetchdata()
 },[filterCategoryList])

 useEffect(() =>{
    const arrayOfCategory = Object.keys(selectCategory).map(categorykeyName=>{
    if(selectCategory[categorykeyName]){
      return categorykeyName
    }
    return null
    }).filter((el)=>el)


    /*simple method to write upper code
const arrayOfCategory = Object.keys(selectCategory)
  .filter(key => selectCategory[key]);
    */
   
  setFilterCategoryList(arrayOfCategory)

  //format for url change when change on the checkbox
  const urlFormat = arrayOfCategory.map((el,index)=>{
    if((arrayOfCategory.length-1)===index){
      return `category=${el}`
    }
    return `category=${el}&&`
  }) 



  navigate("/product-category?"+urlFormat.join(""))
  }, [selectCategory]);


  const handleOnChangeSortBy =(e)=>{
    const {value} = e.target

    setSortBy(value)
    

    if(value==="asc"){
      setdata(preve=>preve.sort((a,b)=> a.sellingprice-b.sellingprice))
    }


    if(value === "dsc"){
      setdata(preve=>preve.sort((a,b)=>b.sellingprice-a.sellingprice))
    }
  }

    
 useEffect(()=>{
     
  },[sortBy])

  



    //{params?.categoryName}
    return (
        <div className="container mx-auto p-2">
            {/**desktop version */}
            <div className="hidden lg:grid  lg:grid-cols-[200px,1fr] ">

                {/**left side */}
               
                <div className="bg-white  p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none">

                    {/**sort by */}
                   <div className="">
                     <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">SORT By</h3>
                     <form className="text-sm flex flex-col gap-2 py-2">
                        <div className="flex items-center gap-3">
                            <input type="radio" name="sortby"   checked={sortBy==="asc"}    value={"asc"} onChange={handleOnChangeSortBy}/>
                            <label>price- Low to High</label>   
                        </div>

                        <div className="flex items-center gap-3">
                           <input type="radio" name="sortby" checked ={sortBy==="dsc"}   value={"dsc"} onChange={handleOnChangeSortBy} />
                            <lable>price- High to Low</lable>  
                        </div>
                     </form>
                   </div>

                     {/**filter by */}
                   <div className="">
                     <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">Category</h3>
                     <form className="text-sm flex flex-col gap-2 py-2">
                       {
                         
                         productCategory.map((categoryName,index)=>{
                         return (
                            <div className="flex">
                                <input type ="checkbox" name={"category"} checked={selectCategory[categoryName?.value]} value= {categoryName?.value} id={categoryName?.value} onChange={HandleSelectCategory}/>
                                <lable htmlFor = {categoryName?.value}>{categoryName?.label}</lable>
                            </div>
                         )
                         })
                        
                       }
                     </form>
</div>
                </div>

                {/**right version (product)*/}
                <div className="hidden lg:flex flex-col ">
                  <p className="font-medium  text-slate-800 text-lg my-2">Search Result:{data.length}</p>
                    <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] p-1 scrollbar-none">
                    {
                    <VerticalProductCard  data = {data} loading={loading}/>
                  } 
                </div>  
                </div>

              
            </div>
        </div>
    )
}

export default CategoryProduct
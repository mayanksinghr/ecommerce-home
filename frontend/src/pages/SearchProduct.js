import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalProductCard from "../components/verticalProductCard";

const SearchProduct = () => {
    const query = useLocation()
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false);


    console.log("query", query.search)

    const fetchProduct = async () => {
        setloading(true);
        const response = await fetch(SummaryApi.searchProduct.url + query.search, {
            method: SummaryApi.searchProduct.method,
            headers: {
                "content-type": "application/json"
            },
        })
        const dataResponse = await response.json()
        setloading(false);
        setdata(dataResponse.data);

    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    //return
    return (
        <div className="container mx-auto p-4">
            {
                loading && (
                    <p className="text-lg text-center">Loading....</p>
                )
            }

            {
                data.length === 0 && !loading && (
                <p className="bg-white text-lg text-center p-4">No data Found...</p>
                )
            }

               <verticalProductCard/>

            {
                data.length !==0 && !loading && (
                <VerticalProductCard loading={loading} data={data}/> 
                )
            }

        </div>
    )
}

export default SearchProduct;
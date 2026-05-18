import React from "react"
import CategoryList from "../components/categoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCarProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/verticalCardproduct";

function home(){
    return(
        <>
        <CategoryList/>
        <BannerProduct/>
        <HorizontalCarProduct category={"airpodes"} heading={"Top's Airpodes"}/>
        <HorizontalCarProduct category={"watches"} heading={"Top's watchs"}/>
        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
        <VerticalCardProduct category={"mouse"} heading={"Mouses"}/>
        <VerticalCardProduct category={"televisions"} heading={"televisions"}/>
        <VerticalCardProduct category={"camera"} heading={"camera"}/>
        <VerticalCardProduct category={"earphones"} heading={"wired earphones"}/>
        <VerticalCardProduct category={"speakers"} heading={"speakers"}/>
        <VerticalCardProduct category={"refrigerator"} heading={"refrigerator"}/>
        <VerticalCardProduct category={"Trimmers"} heading={"Trimmers"}/>
        <VerticalCardProduct category={"processor"}/>
        </>
    )
}

export default home;
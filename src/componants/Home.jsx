import React from "react";
import { Carousel } from "flowbite-react";
import Beauty from "../HomePage/Beauty";
import Mobiles from "../HomePage/Mobiles";

const Home = () => {
  const temp = [
    {
      Title: "LOYALIST ONLY",
      Body: "GLOBAL FREE SHIPPING",
      footer: "Become a loyalist with many benefits",
    },
    {
      Title: "NEW MEMBER",
      Body: "10% OFF ON ALL ORDERS",
      footer: "For first purchase only",
    },
    {
      Title: "URBANMART",
      Body: "JOIN US",
      footer: "BREAST CANCER AWARENESS",
    },
    {
      Title: "DOMESTIC ONLY",
      Body: "WE ARE HIRING NOW",
      footer: "Apply today at UrbanMart.com/Career",
    },
  ];

  return (
    <div className="bg-gray-100">
     
      <div className="relative w-full h-[80vh]">
        <Carousel slideInterval={3000} indicators={true} navigation={true}>
          
          <div className="relative">
            <img
              className="w-full h-[80vh] object-cover"
              src="https://img.freepik.com/premium-photo/elegant-selfassured-young-lady-dressed-simple-fashionable-ensemble-generative-ai_1219269-2824.jpg?w=1060"
              alt="Carousel Image 1"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl font-bold drop-shadow-lg">
              <h2>Shop Your Style</h2>
              <p className="mt-4 text-lg font-light">
                If you're showcasing a collection of outfits, this name invites
                customers to find their style.
              </p>
            </div>
          </div>

        
          <div className="relative">
            <img
              className="w-full h-[80vh] object-cover"
              src="https://img.freepik.com/premium-photo/darkhaired-woman-sunglasses-bright-blue-background_402815-2099.jpg?w=1060"
              alt="Carousel Image 2"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl font-bold drop-shadow-lg">
              <h2>Summer Essentials</h2>
              <p className="mt-4 text-lg font-light">
                Perfect for seasonal items like swimwear, sunglasses, and beach
                accessories.
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              className="w-full h-[80vh] object-cover"
              src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Carousel Image 2"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl font-bold drop-shadow-lg">
              <h2>Upgrade Your Wardrobe</h2>
              <p className="mt-4 text-lg font-light">
                A name for fashion-related products to encourage customers to
                refresh their closet
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              className="w-full h-[80vh] object-cover"
              src="https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-2/banner-jewelry_1920x.gif"
              alt="Carousel Image 2"
            />
            
          </div>

          <div className="relative">
            <img
              className="w-full h-[80vh] object-cover"
              src="https://images.pexels.com/photos/7552326/pexels-photo-7552326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Carousel Image 2"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-4xl font-bold drop-shadow-lg">
              <h2>Handpicked for You</h2>
              <p className="mt-4 text-lg font-light">
                This creates a personal connection, especially for curated or
                personalized items.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="relative mx-auto">
        <p className="p-4 text-center uppercase bg-pink-200 text-red-500">
          First purchase offer: take 30% OFF shopwide. Code applied at checkout*
        </p>
      </div>
      <div className="relative mx-auto  ">
        <img
          src="https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-3/background-banner-2.jpg"
          className=" inset-0 w-full h-full object-cover z-0"
          alt="Background Image"
        />
        <div className="relative z-10">
          {/* Beauty Componant is there */}
          <Beauty/>
        </div>
      </div>

      {/* Cards Section */}
      <div className=" mx-auto px-8 py-6 animate-slideLeftToRight bg-purple-300  ">
        <h1 className="text-4xl text-black  text-center mb-3 ">URBAN NEWS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full  ">
          {temp.map((item, index) => (
            <div
              key={index}
              className=" rounded-lg shadow-md hover:shadow-lg  overflow-hidden bg-purple-500 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="p-6 text-white">
                <h2 className="text-3xl font-semibold  mb-3">{item.Title}</h2>
                <p className="text-2xl mb-4 mx-10">{item.Body}</p>
                <footer className="  text-xl">{item.footer}</footer>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto  ">
        <img
          src="https://themes.halothemes.com/html/ella-html-demo/assets/images/banners/home/home-3/background-banner-6.jpg"
          className=" inset-0 w-full h-full object-cover z-0"
          alt="Background Image"
        />
        <div className="relative z-10">
          {/* Mobiles Componant*/}
          <Mobiles/>
        </div>
      </div>
    </div>
  );
};

export default Home;

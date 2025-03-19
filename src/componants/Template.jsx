import React from 'react';

const Template = () => {
  const temp = [
    {
      Title: "LOYALIST ONLY",
      Body: "GLOBAL FREE SHIPPING",
      footer: "Became a loyalist with many benefits"
    },
    {
      Title: "NEW MEMBER",
      Body: "10% OFF ON ALL ORDERS",
      footer: "For first purchase only"
    },
    {
      Title: "URBANMART",
      Body: "JOIN US",
      footer: "BREAST CANCER AWARENESS"
    },
    {
      Title: "DOMESTIC ONLY",
      Body: "WE ARE HIRING NOW",
      footer: "Apply today at UrbanMart.com/Career"
    }
  ];

  return (
    <div className='w-full max-h-7xl justify-center container mx-auto px-4 py-8'>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
      {temp.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{item.Title}</h2>
            <p className="text-lg text-gray-600 mb-4">{item.Body}</p>
            <footer className="text-sm text-gray-500">{item.footer}</footer>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Template;

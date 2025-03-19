import React from 'react';

const Middle = () => {
  const image = "https://hips.hearstapps.com/hmg-prod/images/hbz-carines-first-looks-00-index-1517501085.jpg?crop=0.889xw:1.00xh;0.0561xw,0&resize=2048:*";
  
  return (
    <div 
      className="h-screen w-screen flex items-center justify-center" 
      style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
    >
       <div className="absolute text-black text-center p-3">
            <p className="text-5xl text-red-600">2024</p>
            <br />
            <h1 className="text-8xl">FASHION TRENDS</h1>
            <br />
            <button className="bg-transparent border-2 border-cyan-800 rounded-2xl h-10 w-36 cursor-pointer hover:bg-cyan-800">
              Discover More
            </button>
          </div>
    </div>
  );
}

export default Middle;

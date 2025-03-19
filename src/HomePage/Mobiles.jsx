import React from 'react'
import { useProduct } from '../Contaxt/ProductProvider'
import { Link } from 'react-router-dom';

const Mobiles = () => {
    const {products} =  useProduct();
    const items = products.filter((item)=> item.type==="Mobiles");
  return (
    <div>
          <div>
            <p className="text-center p-4 w-full text-4xl font-bold bg-violet-300 text-red-500">
            Explore Our Mobile Collection
            </p>
    
            <div className="flex justify-center items-center content-center  ">
              <div className="grid text-center bg-green-300 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full py-5 animate-slideRightToLeft">
                {items && items.length > 0 ? (
                  items.map((item) => (
                    <Link
                      to={`/Product/${item._id}`}
                      key={item._id}
                      className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={item.imageUrl}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black opacity-20"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-lg font-semibold">{item?.name}</h2>
                        <p className="text-sm">{item?.type}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No Product Available</div>
                )}
              </div>
            </div>
          </div>
        </div>
  )
}

export default Mobiles
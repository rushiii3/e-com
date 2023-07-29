import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { productData } from "../../static/data";
export const Header = () => {
    const [searchTerm, setsearchTerm] = useState("");
    const [searchData, setsearchData] = useState(null);
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setsearchTerm(term); 
        const filterProducts = productData && productData.filter((product) => 
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setsearchData(filterProducts);
    }
  return (
    <div className='w-11/12 mx-auto'>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
            <div>
                <Link to="/home">
                    <img src="https://cdn.dribbble.com/users/2077073/screenshots/16078827/datamilk_dri_4x.gif?resize=400x300&vertical=center" className='h-24 mix-blend-multiply contrast-100 scale-125' alt=""  />
                </Link>
            </div>
            <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 pr-9 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {
                searchData && searchData.length !== 0 ? (
                    <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                        {searchData && searchData.map((i,index) => {
                            const d = i.name;
                            const product_name = d.replace(/\s+/g, "-");
                            return(
                                <Link to={`/products/${product_name}`}>
                                    <div className="w-full flex items-start-py-3">
                                        <img src={i.image_Url[0].url} alt=""  className='w-[40px] h-[40px] mr-[10px]' />
                                        <h1>{i.name}</h1>
                                    </div>

                                </Link>
                            )
                        })}
                    </div>
                ) : (null)
            }
            </div>
        </div>
        

    </div>
  )

}

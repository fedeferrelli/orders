import React, {useState} from 'react';
import {Link} from 'react-scroll';

function NavBar() {

    const navs = [{name:'Platos', link:'plates'}, {name:'Mesas', link:'tables'}, {name:'Comensales', link: 'people'}]


    return (
        <div className="w-full bg-white h-[80px] shadow-lg fixed z-50" >
           <div  className="max-w-[1100px] m-auto flex flex-col justify-center sm:justify-end h-full">
            <div className="flex flex-row gap-0 text-gray-800  sm:mb-2 justify-center sm:justify-start">
                {navs.map(e=>(
                    <Link key={e.name} activeClass="active" to={e.link} spy={true} smooth={true} offset={-80} duration={1000} className="text-lg cursor-pointer font-semibold px-3 py-1 hover:bg-gray-200 rounded-md duration-75">{e.name}</Link>
                ))}
               
                </div>
                
                </div>
        </div>
    )
}

export default NavBar

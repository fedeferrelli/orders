import React, {useEffect, useState} from 'react';
import ShowPeople from '../utils/ShowPeople';

function People({orders}) {

   
    
    const [platos, setPlatos] = useState();  
    


  useEffect(() => {
    if (typeof orders !== "undefined") {
      let primiArray = [];
      let secondiArray = [];
      let dolciArray = [];
      let platos = [];

      orders.map((e) => {
        for (let j in e.aOrdenar.slice(2)) {
          if (e.aOrdenar.slice(2)[j].categoria === "Primi Piatti") {
            let miarray = new Array(e.aOrdenar.slice(2)[j].cantidad);
            miarray.fill(e.aOrdenar.slice(2)[j].plato, 0, miarray.length);
            primiArray.push(...miarray);
          }
          if (e.aOrdenar.slice(2)[j].categoria === "Secondi Piatti") {
            let miarray = new Array(e.aOrdenar.slice(2)[j].cantidad);
            miarray.fill(e.aOrdenar.slice(2)[j].plato, 0, miarray.length);
            secondiArray.push(...miarray);
          }
          if (e.aOrdenar.slice(2)[j].categoria === "il Dolce") {
            let miarray = new Array(e.aOrdenar.slice(2)[j].cantidad);
            miarray.fill(e.aOrdenar.slice(2)[j].plato, 0, miarray.length);
            dolciArray.push(...miarray);
          }
        }
      });

      platos = [...primiArray, ...secondiArray, ...dolciArray];
      setPlatos(platos);
     
    }
  }, [orders]);    




    return (
        <div className="min-h-screen text-white max-w-[1100px] m-auto">
          {orders && (
        <div className="flex gap-4 gap-y-6 flex-wrap justify-center py-6 ">
            <h1 className="capitalize text-gray-200 text-center mb-6 text-3xl font-bold w-full ">
              Comensales
            </h1>

          {orders.map((order, index) => (
<div className="w-11/12 sm:w-auto"  key={index}>
              <ShowPeople order={order} index={index}  />
              </div>
          ))}
        </div>
      )}  
        </div>
    )
}

export default People

import React, {useState, useEffect} from 'react'

function Plates({orders}) {

    const [platosArray, setPlatosArray] = useState();
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
          setPlatosArray([...new Set(platos)]);
        }
      }, [orders]);


    return (

      
        <div id="plates" className="m-auto max-w-[1100px]">
            {platos && 
             <section className="flex flex-wrap justify-center  gap-3 pt-10">
            <h1 className="capitalize text-gray-800 text-center mb-6 text-3xl font-bold w-full  mt-[80px] ">
              Platos: <span className="font-normal">{platos.length}</span>
            </h1>

            {platosArray.map((e) => (
              <div
                key={Math.random()}
                className="w-11/12 sm:w-1/3 p-4 shadow-lg shadow-gray-400 bg-gray-100 border-[1px] border-gray-300 text-gray-800  text-center rounded-lg text-xl"
              >
                <h1 className="capitalize">{e} </h1>
                <h1 className="text-3xl font-bold mt-1">
                  {platos.filter((plato) => plato === e).length}
                </h1>
              </div>
            ))}
          </section> 

          }
        </div>
        
      )
}

export default Plates

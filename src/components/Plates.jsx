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

      
        <div>
            {platos && 
             <section className="w-full flex flex-wrap p-2 justify-center  gap-3 border-t-2 border-gray-900 mt-6 pt-12">
            <h1 className="capitalize text-gray-200 text-center mb-6 text-3xl font-bold w-full">
              Platos
            </h1>

            {platosArray.map((e) => (
              <div
                key={Math.random()}
                className="w-11/12 sm:w-1/3 p-4 bg-blue-400 text-gray-800  text-center rounded-lg text-xl"
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

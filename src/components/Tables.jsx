import React, {useState, useEffect} from 'react';
import ShowTables from '../ShowTables';

function Tables({orders}) {

    const [tables, setTables] = useState();
    const [infoReady, setInfoReady] = useState(false)

    useEffect(() => {
        if (typeof orders !== "undefined") {
          let mesas = [...new Set(orders.map((e) => e.aOrdenar[0].mesa))];
          let mesasInfo = [];
    
             
          mesas.sort().map((e) => {
            let mesasFiltradas = orders.filter(
              (order) => order.aOrdenar[0].mesa === e
            );

                      
            let mesasObject = { mesa: e };
    
            mesasObject.montoTotal=[]
        
            mesasObject.platos = [];
    
            mesasFiltradas.map((e) => {
             
              let platosPedidos = e.aOrdenar.slice(2);
              
              platosPedidos.map((plato) => {
                
                let platoArray = new Array(plato.cantidad);
                platoArray.fill(plato.plato, 0, platoArray.length);
                mesasObject.platos.push(...platoArray);
                mesasObject.montoTotal.push(plato.cantidad * +plato.precio) 
    
              });
            });
           
            mesasInfo.push(mesasObject);
           
          });
          setTables(mesasInfo);
          setInfoReady(true)
        }
      }, [orders]);

    return (
        <div className="mt-10 max-w-[1100px] m-auto " id='tables'>
           <div className="w-11/12 sm:w-full m-auto border-[0.5px] border-t border-gray-300"></div>
            {infoReady && 
            <section className="w-full flex flex-wrap justify-center  gap-3 mt-4">
            <h1 className="capitalize text-gray-800 text-center mb-6 text-3xl font-bold w-full">
              Mesas: <span className="font-normal">{tables.length}</span>
            </h1>

            {tables.map((e) => (
              <div
                key={Math.random()}
                className="w-11/12 sm:w-1/3 p-4 shadow-lg shadow-gray-400 bg-gray-100 border-[1px] border-gray-300 text-gray-800  text-center rounded-lg"
              >
                <h1 className="capitalize font-bold text-3xl">{e.mesa} </h1>
                <h1 className="text-xl mt-1 font-light">
                  <ShowTables plates={e.platos} />

                
                </h1>
                <div className='text-2xl mt-4 font-semibold'>
                  
                  Precio Total $ 
                  {e.montoTotal.reduce(
  (a, b) => a + b,
  0
).toLocaleString('de-DE')}
                </div>
              </div>
            ))}
          </section>}
        </div>
    )
}

export default Tables;

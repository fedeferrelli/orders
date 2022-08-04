import React, {useState, useEffect} from 'react';


import firebase from '../src/utils/Firebase/firebaseConfig'



function OrderView() {

    const [orders, setOrders] = useState()
    const [platosArray, setPlatosArray] = useState()
    const [platos, setPlatos] = useState()

   
    const handleSnapshot = (snapshot) => {
        const  orders_list = snapshot.docs.map((doc) => {
           return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setOrders(orders_list)        
      };

    useEffect(() => {
        const obtenerOrders = async () => {
         await firebase.db.collection("pedidos").onSnapshot(handleSnapshot);
        };
        obtenerOrders();
      }, []);


      useEffect(()=>{

        if(typeof(orders)!=='undefined'){
      
let primiArray = [];
let secondiArray = [];
let dolciArray = [];
let platos = []

        orders.map(e=>{
          /* secondiArray.push(e.aOrdenar.slice(2)[1].plato)   */

          /* if (typeof(e.aOrdenar.slice(2)[0]) !== undefined){
          primiArray.push(e.aOrdenar.slice(2)[0].plato)} */

         /*  if (typeof(e.aOrdenar.slice(2)[1]) !== undefined){
            secondiArray.push(e.aOrdenar.slice(2)[1].plato)} */

                console.log(e.aOrdenar.slice(2)) 

            for (let j in e.aOrdenar.slice(2)){
              if(e.aOrdenar.slice(2)[j].categoria === "Primi Piatti"){
                primiArray.push(e.aOrdenar.slice(2)[j].plato)}
              if (e.aOrdenar.slice(2)[j].categoria === "Secondi Piatti"){
                  secondiArray.push(e.aOrdenar.slice(2)[j].plato)}
                  if (e.aOrdenar.slice(2)[j].categoria === "il Dolce"){
                    dolciArray.push(e.aOrdenar.slice(2)[j].plato)}
            }

          });

      platos = [...primiArray, ...secondiArray, ...dolciArray]
      setPlatos(platos)
      setPlatosArray([...new Set(platos)])
       }

      }, [orders])


      const printPlato = (e)=>{

        if(typeof(e.plato) !== undefined){
          return e.plato
        }

      }



    return (
        <div className="min-h-screen text-white max-w-[1100px] m-auto">
            {orders && 
                <div className="flex gap-4 gap-y-6 flex-wrap justify-center py-6">
                  {orders.map((order, index)=>(
                   <div key={index} className='p-3 rounded-lg bg-yellow-500 text-gray-800 text-center text-lg w-11/12 sm:w-auto'>
                     <h1 className="font-bold"> {index+1}. {order.aOrdenar[1].nombre} </h1>
                     {/* <h1> mesa: {order.aOrdenar[0].mesa} </h1> */}
                     <h1 className="mt-2 text-gray-800 capitalize"> {order.aOrdenar.slice(2).map(e=> ( <div> {/* {printPlato(e)} */} {e.categoria}: {e.plato} x {e.cantidad} </div> ))} </h1>
                    
                     </div> 
                  ))}
                </div>
            }

            { platos &&

            <section className="w-full flex flex-wrap p-2 justify-center  gap-3 border-t-2 border-gray-900 mt-6 pt-12">

            
            
            {platosArray.map(e=>(
              <div key={Math.random()} className="w-11/12 sm:w-1/3 p-4 bg-yellow-500 text-gray-800  text-center rounded-lg text-xl">
              <h1 className="capitalize">{e} </h1>
              <h1 className="text-3xl font-bold mt-1">{
              platos.filter(plato => plato===e).length}
              </h1>
              </div>
              
            ))}
            </section>

            }


        </div>
    )
}

export default OrderView

import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import firebase from "../utils/Firebase/firebaseConfig"

function ShowPeople({ order, index }) {
  const [showDelete, setShowDelete] = useState(false);

  // función para eliminar orden
  const eliminarPlato=(id)=>{
console.log('in')
            
      { try {
          
        setShowDelete(false);
          firebase.db.collection('pedidos').doc(id).delete().then(function() {
            
console.log('File deleted successfully')

              });
      } catch (error) {
          console.log(error)    
      }}       
    }

    

  return (
    <div className="h-full">
      <section className="relative m-auto h-full">
        {showDelete && (
          <div className="absolute bg-red-100 h-full w-full  rounded-lg flex flex-col justify-between p-3 px-5">
            <h1 className="font-semibold capitalize text-gray-800 text-center text-lg ">
              {" "}
              <span className="font-normal">{index + 1}.</span> {order.aOrdenar[1].nombre}{" "}
            </h1>
            

            <h1 className="text-lg text-gray-800 text-center font-light">
              ¿Estás seguro que queres{" "}
              <span className="font-semibold">eliminar</span> esta orden?
            </h1>

            <section className="w-full flex flex-row justify-center gap-3">
              <button className="rounded-lg m-auto bg-red-500 font-semibold py-2 w-1/2 text-gray-800"
              onClick={()=>eliminarPlato(order.id)} >
                Eliminar
              </button>
              <button
                className="rounded-lg m-auto text-gray-800 font-semibold bg-gray-200 border border-gray-400 py-2 w-1/2"
                onClick={(e) => setShowDelete(false)}
              >
                Cancelar
              </button>
            </section>
          </div>
        )}

        <div className="p-3 px-5 rounded-lg h-full  text-gray-800 text-center text-lg w-full sm:w-auto flex flex-col justify-between">
          <div className="">
            <h1 className="font-semibold capitalize">
              {" "}
              <span className="font-normal">{index + 1}.</span> {order.aOrdenar[1].nombre}{" "}
            </h1>

                        

            <h1 className="mt-4 text-gray-800 capitalize text-md">
              {" "}
              {order.aOrdenar.slice(2).map((e) => (
                <div key={Math.random()} className="mt-1">
                  {" "}
                  <span>{e.categoria}:</span> <span className="font-light"> {e.plato} x {e.cantidad} </span>{" "}
                </div>
              ))}{" "}
            </h1>

            <h1 className="font-normal mt-4">
              {" "}
              Mesa: {order.aOrdenar[0].mesa}
            </h1>
          </div>

          <div className=" mt-2 text-right">
            <button
              className=" text-xl bg-gray-200 rounded-full p-2 border-[1px] border-gray-300 w-auto"
              onClick={(e) => setShowDelete(true)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShowPeople;

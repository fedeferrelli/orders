import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

function ShowPeople({ order, index }) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="h-full">
      <section className="relative m-auto h-full">
        {showDelete && (
          <div className="absolute bg-blue-300 h-full w-full  rounded-lg flex flex-col justify-between p-3">
            <h1 className="font-bold capitalize text-gray-800 text-center text-lg ">
              {" "}
              {index + 1}. {order.aOrdenar[1].nombre}{" "}
            </h1>

            <h1 className="text-lg text-gray-800 text-center">
              ¿Estás seguro que queres{" "}
              <spna className="font-semibold">eliminar</spna> esta orden ?
            </h1>

            <section className="w-full flex flex-row justify-center gap-3">
              <button className="rounded-lg m-auto bg-green-500 py-2 w-1/2 text-gray-800">
                Eliminar
              </button>
              <button
                className="rounded-lg m-auto text-gray-800 font-semibold bg-red-500 py-2 w-1/2"
                onClick={(e) => setShowDelete(false)}
              >
                Cancelar
              </button>
            </section>
          </div>
        )}

        <div className="p-3 rounded-lg h-full bg-blue-400 text-gray-800 text-center text-lg w-full sm:w-auto flex flex-col justify-between">
          <div className="">
            <h1 className="font-bold capitalize">
              {" "}
              {index + 1}. {order.aOrdenar[1].nombre}{" "}
            </h1>

            <h1 className="mt-2 text-gray-800 capitalize">
              {" "}
              {order.aOrdenar.slice(2).map((e) => (
                <div key={Math.random()}>
                  {" "}
                  {e.categoria}: {e.plato} x {e.cantidad}{" "}
                </div>
              ))}{" "}
            </h1>
          </div>

          <div className=" mt-6 text-right">
            <button
              className=" text-xl bg-blue-300 rounded-full p-2 border-gray-800 w-auto"
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

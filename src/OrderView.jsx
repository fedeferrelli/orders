import React, { useState, useEffect } from "react";
import Tables from "./Tables";

import firebase from "../src/utils/Firebase/firebaseConfig";

function OrderView() {
  const [orders, setOrders] = useState();
  const [platosArray, setPlatosArray] = useState();
  const [platos, setPlatos] = useState();
  const [tables, setTables] = useState();

  const handleSnapshot = (snapshot) => {
    const orders_list = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setOrders(orders_list);
  };

  useEffect(() => {
    const obtenerOrders = async () => {
      await firebase.db.collection("pedidos").onSnapshot(handleSnapshot);
    };
    obtenerOrders();
  }, []);

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

  useEffect(() => {
    if (typeof orders !== "undefined") {
      let mesas = [...new Set(orders.map((e) => e.aOrdenar[0].mesa))];
      let mesasInfo = [];

      console.log(mesas);

      mesas.sort().map((e) => {
        let mesasFiltradas = orders.filter(
          (order) => order.aOrdenar[0].mesa === e
        );
        console.log(mesasFiltradas);
        let mesasObject = { mesa: e };

       /*  mesasObject.montoTotal = mesasFiltradas.reduce((e) => e.cantidad * e.precio,
          0
        ); */

        mesasObject.montoTotal=[]
    

        mesasObject.platos = [];

        mesasFiltradas.map((e) => {
         
          console.log(e)
          let platosPedidos = e.aOrdenar.slice(2);
          console.log(platosPedidos)
          console.log("platos pedidos", platosPedidos);
          platosPedidos.map((plato) => {
            console.log(plato.cantidad*plato.precio)
            let platoArray = new Array(plato.cantidad);
            platoArray.fill(plato.plato, 0, platoArray.length);
            mesasObject.platos.push(...platoArray);
            mesasObject.montoTotal.push(plato.cantidad * plato.precio) 

          });
        });
       
        mesasInfo.push(mesasObject);
       
      });
      setTables(mesasInfo);
    }
  }, [orders]);

  console.log(tables);

  return (
    <div className="min-h-screen text-white max-w-[1100px] m-auto">
      {orders && (
        <div className="flex gap-4 gap-y-6 flex-wrap justify-center py-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-yellow-500 text-gray-800 text-center text-lg w-11/12 sm:w-auto"
            >
              <h1 className="font-bold">
                {" "}
                {index + 1}. {order.aOrdenar[1].nombre}{" "}
              </h1>
              {/* <h1> mesa: {order.aOrdenar[0].mesa} </h1> */}
              <h1 className="mt-2 text-gray-800 capitalize">
                {" "}
                {order.aOrdenar.slice(2).map((e) => (
                  <div>
                    {" "}
                    {/* {printPlato(e)} */} {e.categoria}: {e.plato} x{" "}
                    {e.cantidad}{" "}
                  </div>
                ))}{" "}
              </h1>
            </div>
          ))}
        </div>
      )}

      {platos && (
        <div>
          <section className="w-full flex flex-wrap p-2 justify-center  gap-3 border-t-2 border-gray-900 mt-6 pt-12">
            <h1 className="capitalize text-gray-900 text-center mb-6 text-3xl font-bold w-full">
              Platos
            </h1>

            {platosArray.map((e) => (
              <div
                key={Math.random()}
                className="w-11/12 sm:w-1/3 p-4 bg-yellow-500 text-gray-800  text-center rounded-lg text-xl"
              >
                <h1 className="capitalize">{e} </h1>
                <h1 className="text-3xl font-bold mt-1">
                  {platos.filter((plato) => plato === e).length}
                </h1>
              </div>
            ))}
          </section>
          <section className="w-full flex flex-wrap p-2 justify-center  gap-3 border-t-2 border-gray-900 mt-6 pt-12">
            <h1 className="capitalize text-gray-900 text-center mb-6 text-3xl font-bold w-full">
              Mesas
            </h1>

            {tables.map((e) => (
              <div
                key={Math.random()}
                className="w-11/12 sm:w-1/3 p-4 bg-yellow-500 text-gray-800  text-center rounded-lg"
              >
                <h1 className="capitalize font-bold text-3xl">{e.mesa} </h1>
                <h1 className="text-xl mt-1">
                  <Tables plates={e.platos} />

                  {/*  let platosMesa = [... new Set (e.platos)] */
                  /*  e.platos.sort().map(plato=>(
                  
                  <div>{plato}</div>
                )) */
                  /* platos.filter(plato => plato===e).length */}
                </h1>
                <div className='text-2xl mt-4 font-semibold'>
                  Precio Total $ 
                  {e.montoTotal.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  0
).toLocaleString('de-DE')}
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}

export default OrderView;

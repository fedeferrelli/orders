import { useState, useEffect } from 'react';
import firebase from "../src/utils/Firebase/firebaseConfig";

import People from './components/People';
import Plates from './components/Plates';
import Tables from './components/Tables';
import NavBar from './components/NavBar';



function App() {
  
  const [orders, setOrders] = useState();
  

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

  return (
    <div className="bg-gray-200">

   <NavBar/>

      <Plates orders={orders}/>
 
      <Tables orders = {orders}/>

      <People orders={orders}/>

    

    </div>
  )
}

export default App;

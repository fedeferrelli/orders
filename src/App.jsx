import { useState } from 'react';
import OrderView from './OrderView';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-700">

      <OrderView/>

    </div>
  )
}

export default App;

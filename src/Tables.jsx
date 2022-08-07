import React, {useSate, useEffect} from 'react'

function Tables({plates}) {

    let tipoPlatos = [... new Set(plates)]
  

useEffect(() => {


    
}, [plates])





    return (
        <div>
            {
                tipoPlatos.map(e=>(
                    <div className='capitalize'>
                    {e} x {plates.filter(plate => plate === e).length} 
                    </div>
                ))



            }
        </div>
    )
}

export default Tables

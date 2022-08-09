import React, {useSate, useEffect} from 'react'

function ShowTables({plates}) {

    let tipoPlatos = [... new Set(plates)]
  

useEffect(() => {


    
}, [plates])





    return (
        <div>
            {
                tipoPlatos.map(e=>(
                    <div key={e} className='capitalize'>
                    {e} x {plates.filter(plate => plate === e).length} 
                    </div>
                ))



            }
        </div>
    )
}

export default ShowTables

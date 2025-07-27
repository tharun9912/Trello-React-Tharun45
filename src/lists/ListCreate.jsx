import Card from '@mui/material/Card'
import {TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';

import React, { useState } from 'react'
import { createList } from '../ApiHelpers';

const ListCreate = ({id} ) => {
  const [listname,setName]=useState('')
    const[showInput,setShow]=useState(false)
    const[listBtn,setBtn]=useState(true)
    const [isCreating, setIsCreating] = useState(false)

    function handleInput(e){
        setName(e.target.value)
        console.log(e.target.value)
    }

    async function AddListName()
    {

        setIsCreating(true)
        await createList(listname,id)
        setBtn(prev=>!prev)
        setShow(prev=>!prev)
        setIsCreating(false)
    }

    function handleCancel(){
        setName('')
        setBtn(prev=>!prev)
        setShow(prev=>!prev)
    }
    function handleClick(){
        setShow(prev=>!prev)
        setBtn(prev=>!prev)
    }
  return (
    <div>
         {listBtn && <Box
        sx={{
          borderRadius: 1,
          backgroundColor: 'skyblue',
          color:"black",
          textAlign:"center",
          display: 'flex',             
        alignItems: 'center',         
            justifyContent: 'center',   
          padding:"5px 10px",
          py:2  
        }} onClick={handleClick}> + Add another list</Box>}

        {showInput && <Box sx={{backgroundColor:"#F5F5F5",pt: 4, px: 2,borderRadius:1,display:"flex",flexDirection:"column",width: 230}}>
        
        <TextField id="outlined-multiline-flexible"
          label="Add board title *"
          multiline
          maxRows={4} sx={{}} value={listname} onChange={handleInput}>
        </TextField>
        <Box sx={{display:"flex",flexDirection:"row", marginTop:"10px", justifyContent:"space-between"}}>
        <Button variant="contained" onClick={AddListName}>Add</Button>
        <Button variant="text" onClick={handleCancel}>Cancel</Button>
        </Box>
        
        
    </Box>}
    </div>
  )
}

export default ListCreate
import React, { useState } from 'react'
import Card from '@mui/material/Card'
import {TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';

import { cardcreation } from '../ApiHelpers';

const CreateCard = ({id,onCardCreated}) => {
     const [showInput,setShowInput] = useState(false);
     const [input,setInput] = useState("");
     const [cardBtn,setCardBtn] = useState(true);
     const [isCreating,setIsCreating] = useState(false);
function handleClick()
{
  setCardBtn(prev =>!prev)
  setShowInput(prev=>!prev)
}

function handleInput(e)
{
  setInput(e.target.value);
  console.log(e.target.value);
}
async function AddCardName()
{
    setIsCreating(true)
    await cardcreation(input,id)
    if(onCardCreated)
    {
      await onCardCreated();
    }
    setInput("")
    setIsCreating(false)
    setCardBtn(prev=> !prev)
    setShowInput(prev=>!prev)
}

function handleCancel()
{
    setInput("")
   setShowInput(prev=>!prev)
   setCardBtn(prev=>!prev)
}
  return (
    <div>
            { cardBtn && <Box sx={{ borderRadius: 1,bgcolor: '#CACBCF',color:"black",textAlign:"center",display: 'flex',alignItems: 'center',         
            justifyContent: 'center',padding:"5px 10px",py:2}} onClick={handleClick}> + Add Card</Box>}
            
            {showInput && <Box sx={{backgroundColor:"#F5F5F5",pt: 4, px: 2,borderRadius:1,display:"flex",flexDirection:"column",width: 230}}>
            <TextField id="outlined-multiline-flexible" label=" Add a card *" multiline maxRows={4} sx={{}} value={input} onChange={handleInput}></TextField>
              <Box sx={{display:"flex",flexDirection:"row", marginTop:"10px", justifyContent:"space-between"}}>
                  <Button variant="contained" onClick={AddCardName}>Add Card</Button>
                  <Button variant="text" onClick={handleCancel}>Cancel</Button>
              </Box>
            </Box>}
    </div>
  )
}

export default CreateCard
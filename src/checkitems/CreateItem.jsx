import Card from '@mui/material/Card'
import {TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';

import React, { useState } from 'react'
import { cardcreation,CreateCheckListItemAPI } from '../ApiHelpers';

const CreateItem = ({id,onItemCreated}) => {
    
    const [itemName,setName]=useState('')
    const[showInput,setShow]=useState(false)
    const[listBtn,setBtn]=useState(true)


    function handleInput(e){
        setName(e.target.value)
        console.log(e.target.value)
    }
    async function AddListName(){
        let finalName = itemName;
        if (itemName.length > 10) {
          finalName = itemName.slice(0, 10); 
          
        }
        await CreateCheckListItemAPI(id,finalName)
        setName('')
        if(onItemCreated){
          await onItemCreated()
        }
        setBtn(prev=>!prev)
        setShow(prev=>!prev)
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
    <Box sx={{ width: '100%', marginTop: 2 }}>
    {!showInput ? (
      <Box
        onClick={handleClick}
        sx={{
          borderRadius: 1,
          color: "black",
          // padding: "8px 12px",
          paddingX:"4px",
          cursor: "pointer",
          textAlign: "left",
          fontWeight: 500,
          fontSize: "14px",
        }}
      >
        + Add Item
      </Box>
    ) : (
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          padding: 1,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: '80%',
       
        }}
      >
        <TextField
          label="CheckList Item"
          multiline
          maxRows={4}
          value={itemName}
          onChange={handleInput}
          size="small"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={AddListName}>
            Add
          </Button>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    )}
  </Box>
  )
}

export default CreateItem
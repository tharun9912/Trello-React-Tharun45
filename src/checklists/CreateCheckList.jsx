import React, { useState } from 'react'
import {TextField,Button} from '@mui/material'
import Box from '@mui/material/Box';
import { addchecklist } from '../ApiHelpers';
const CreateCheckList = ({id,onChecklistCreated}) =>
 {
    const [showInput,setShowInput]= useState(false);
    const [checkName,setCheckName] = useState("");
    const handleClick = () => {
      setShowInput(true);
    }
    const handleInput = (e) => {
        setCheckName(e.target.value);
    }
    function handleCancel(){
        setCheckName('')
        setShowInput(prev=>!prev)
    }
    const AddCheckListName = async () => {
        await addchecklist(id,checkName);
        if(onChecklistCreated)
        {
          onChecklistCreated();
        }
        setCheckName("");
        setShowInput(false);
    }
  return (
    <div>
          <Box sx={{ borderRadius: 1,bgcolor: '#CACBCF',color:"black",textAlign:"center",display: 'flex',alignItems: 'center',         
            justifyContent: 'center',padding:"5px 10px",py:2}} onClick={handleClick}> + Add checklist</Box>
         {
          showInput && <Box sx={{backgroundColor:"#F5F5F5",pt: 4, px: 2,borderRadius:1,display:"flex",flexDirection:"column",width: 230}}>
            <TextField id="outlined-multiline-flexible" label="Add checklist title *" multiline maxRows={4} sx={{}} value={checkName} onChange={handleInput}>
            </TextField>
              <Box sx={{display:"flex",flexDirection:"row", marginTop:"10px", justifyContent:"space-between"}}>
                     <Button variant="contained" onClick={AddCheckListName}> Add Checklist </Button>
                     <Button variant="text" onClick={handleCancel}>Cancel</Button>
               </Box> 
        </Box>}
    </div>
  )
 }

export default CreateCheckList
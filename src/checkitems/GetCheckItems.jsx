import React, { useEffect, useState } from 'react'
import { DeleteCheckItemAPI, GetCheckItemsAPI, UpdateCheckItemAPI } from '../ApiHelpers'
import { Box,Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateItem from './CreateItem';


const GetCheckItems = ({id,cardId,onItemsChange}) => {
    console.log(`checklistid ${id}`)
    const [checkItems,setItems]=useState([])

    async function fetchItems(){
        const data=await GetCheckItemsAPI(id)
        setItems(data)
    }
    useEffect(()=>{
        fetchItems()
    },[id])

    async function handleToggle(itemId, currentState) {
      try {
          const newState = currentState === 'complete' ? 'incomplete' : 'complete';
          await UpdateCheckItemAPI(itemId, id, cardId, newState); 
          
          setItems(prevItems => 
              prevItems.map(item => 
                  item.id === itemId ? {...item, state: newState} : item
              )
          );
          
          if (onItemsChange) {
              onItemsChange();
          }
      } catch (error) {
          console.error('Failed to toggle item:', error);
      }
  }
    async function handleItemDelete(itemid){
      await DeleteCheckItemAPI(itemid,id)
      await fetchItems()
      if(onItemsChange){
        onItemsChange()
      }
    }
    async function handleItemCreated(){
      await fetchItems()
      if(onItemsChange){
        onItemsChange()
      }
    }
  return (
    <div>
        {checkItems && checkItems.map((each) => (
    <Box key={each.id} display="flex" alignItems="center" gap={1} mt={2}  sx={{justifyContent:"space-between"}}>
      <div>
      <input
        type="checkbox"
        checked={each.state === 'complete'}
        onChange={() => handleToggle(each.id,each.state)}
        style={{cursor:"pointer"}}
        
      />
      <span>{each.name}</span>
      </div>
      <DeleteIcon sx={{ cursor: 'pointer' }}  onClick={()=>handleItemDelete(each.id)}/>
      
    </Box>
    
  ))}
  <Box mt={2}>
              <CreateItem id={id} onItemCreated={handleItemCreated}/>
    </Box>
    </div>
  )
}

export default GetCheckItems
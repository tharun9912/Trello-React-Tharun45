import React, { useEffect, useState } from 'react'
import { DeleteCheckList, getChecklist,GetCheckItemsAPI } from '../ApiHelpers'
import { Card, CardContent, Checkbox, Typography, Button, LinearProgress, Box } from '@mui/material';
import CreateCheckList from './createCheckList';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import GetCheckItems from '../checkitems/GetCheckItems';
import CreateItem from '../checkitems/CreateItem';


const GetAllCheckLists = ({name,id}) => {
    const [checkLists,setLists]=useState([]) 
    const [checklistProgress, setChecklistProgress] = useState({}); 

    async function fetchChecklistProgress(checklistId) {
      const items = await GetCheckItemsAPI(checklistId);
      const total = items.length;
      const completed = items.filter(item => item.state === 'complete').length;
    
      setChecklistProgress(prev => ({
        ...prev,
        [checklistId]: { completed, total }
      }));
    }
    async function fetchCheckLists(){
        const data=await getChecklist(id) 
        setLists(data)
        for(const checklist of data){
          await fetchChecklistProgress(checklist.id)
        }
    }
    useEffect(()=>{
        fetchCheckLists()
    },[])
    async function handleDeleteCheckList(id){

      await DeleteCheckList(id)
      await fetchCheckLists()
    }
  return (
    <>
    
    <Card sx={{ width:"50vw" ,height: "50vh",margin: '10px 10px', display:'flex', alignItems:"flex-start" ,flexDirection:"column",overflowY: 'auto',fontSize:'20px'}}>
        
        <Box sx={{width:"100%" ,padding:"20px"}}>
        <span>{name}</span>
        
        <CreateCheckList id={id} onChecklistCreated={fetchCheckLists}/>
        </Box>

        {checkLists.map((each) => {
         
         const progress = checklistProgress[each.id] || { completed: 0, total: 0 };
         const progressPercentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
         return (
          <div key={each.id} style={{ width: "100%",padding:"2px"}}>
          <CardContent>
            
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <CheckBoxOutlinedIcon size="small" />
                <Typography variant="subtitle1" fontWeight="bold">{each.name}</Typography>
              </Box>
              <Button variant="text" size="small" sx={{ color: 'gray' ,cursor:"pointer"}} onClick={()=>handleDeleteCheckList(each.id)}>Delete</Button>
            </Box>
    
          
            <Box mt={1} display="flex" alignItems="center" gap={1} paddingX={"2px"}>
            <Typography variant="caption">{progressPercentage}%</Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                flexGrow: 1,          
                borderRadius: 3,
                height:"8px",
                backgroundColor: '#e0e0e0', 
                '& .MuiLinearProgress-bar': {
                  backgroundColor: progressPercentage === 100 ? 'green' : 'gray',
                },
              }}
            />
          </Box>
            <GetCheckItems id={each.id} cardId={id} onItemsChange={()=>fetchChecklistProgress(each.id)}/> 
          </CardContent>
        </div>
         )
       })}
      </Card>
    </>
  )
}

export default GetAllCheckLists
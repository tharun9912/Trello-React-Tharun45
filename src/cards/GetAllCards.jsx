import React,{useState,useEffect} from 'react'
import { Card,CardContent} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetCards,DeleteCard } from '../ApiHelpers';
import CreateCard from './CreateCard';
import GetAllCheckLists from '../checklists/GetAllCheckLists';

const GetAllCards = ({id:cardId}) => {
    const [cards,setCards] = useState();
    const [activeCard,setActiveCard] = useState(null);
    async function fetchCards(){
        const data=await GetCards(cardId)
        setCards(data)
    }
    useEffect(()=>{ 
        fetchCards()
    },[])
    async function handleDeleteCard(cardid){
        await DeleteCard(cardid)
        await fetchCards()
    }
  async function handleCardClick({name,id})
  {
    setActiveCard({name,id}) 
  }
  function handleBackdropClick(e)
  {
    if(e.target === e.currentTarget)
    {
      setActiveCard(null)
    }
  }
  return (
    <div>
        {activeCard && (
          <div
             style={{
               position: 'fixed',
               top:0,
              left: 0,
              right:0,
              zIndex: 1,
              height: '100vh',
              padding: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',   
           }}
           onClick = {handleBackdropClick} 
          >
          <GetAllCheckLists name={activeCard.name} id={activeCard.id} />
          </div>
          )} 
      
         <div style={{display:"flex", flexDirection:"column" ,gap:10 ,width:"100%",margin:"10px"}}>
           {cards && cards.map((card)=>{
          return <Card key={card.id}sx={{width:"100%"}} onClick={()=>handleCardClick({name:card.name,id:card.id})}>
                 <CardContent sx={{alignItems:"space-between",display: "flex",
                     justifyContent: "space-between",
                     py:1}}>
                     <span>{card.name}</span>
                     <DeleteIcon sx={{ cursor: 'pointer' }} onClick={(e)=>{e.stopPropagation()
                     handleDeleteCard(card.id)}}/>
                 </CardContent>
           </Card>
                   })}
            <CreateCard id={cardId} onCardCreated={fetchCards}/>   
          </div>
      </div>
  )
}

export default GetAllCards
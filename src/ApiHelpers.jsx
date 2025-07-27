import axios from 'axios'

const key = import.meta.env.VITE_TRELLO_KEY;
const token = import.meta.env.VITE_TRELLO_TOKEN;

import React from 'react';

export const GetAllBoards = async () => {
    try {
         const url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
         const response = await axios.get(url);
         console.log(response.data);
         return response.data;
    } catch (error) {
        console.log("failed to fetch trello boards:",error);
        throw error;
    }

}

export const GetBoardDetails = async (boardId) => {
  const url = `https://api.trello.com/1/boards/${boardId}?key=${key}&token=${token}&fields=name`;
  try {
    const response = await axios.get(url);  
    return response.data;
  } catch (err) {
    console.error("Failed to fetch board details", err);
    return null;
  }
};



export const Getlists = async (id) =>
 {
 try{
    const url = `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`
    const response = await axios.get(url);
    return response.data;
 }
 catch(error)
 {
    console.log("failed to get all lists");
    throw error;
 }
    
}

export const createList = async (listName,boardId) => {
  try 
  {
    const url=`https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${key}&token=${token}`;
    const response = await axios.post(url);
    console.log(response);
    return response.data;
  } 
  catch (error)
   {
     console.log("error while creating new list");
     throw error;
   }
}

export const DeleteList =  async (id) => {
    try
     {
      const url= `https://api.trello.com/1/lists/${id}/closed?key=${key}&token=${token}`;
       const response =  await axios.put(url,{value:true});
       return response.data;
     } 
    catch (error)
     {
       console.log("Failed to delete a list",error);
       throw error;
     }
}

export const GetCards = async (id) => 
{
  try 
  {
    const url = `https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`;
    const response = await axios.get(url);
    return response.data; 
 }
 catch (error)
  {
    console.log("Failed to load cards",error);
    throw error;
  }
}

export const DeleteCard = async (cardId) =>
{
  try
   {
     const url = `https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`;
     const response = await axios.delete(url)
     console.log(response.data)
     return response.data
   } 
  catch (error)
   {
    console.error("Failed to get cards:", error);
    throw error;
   }

}

export const cardcreation = async (cardName,id) =>
{
  try
   {
        const url= `https://api.trello.com/1/cards?name=${cardName}&idList=${id}&key=${key}&token=${token}`;
        const response = await axios.post(url)
        return response.data
   } 
   catch (error) 
   {
     console.log("Error while creating new Card",error);
     throw error;
   }
}
export const getChecklist = async (id) =>
{
   try 
   {
     const url = `https://api.trello.com/1/cards/${id}/checklists?key=${key}&token=${token}`;
        const response = await axios.get(url)
        return response.data;
   }
    catch (error) 
    {
       console.log("Error while getting checklist in a card")
       throw error;
   }
}

export const addchecklist = async (cardid,checkName) =>
 {
  try
  {
     const url = `https://api.trello.com/1/checklists?name=${checkName}&idCard=${cardid}&key=${key}&token=${token}`;
     const response = await axios.post(url);
     return response.data;
  } 
  catch (error)
   {
      console.log("Error while adding checklist");
      throw error;
   }
}

export const DeleteCheckList = async (checklistid) => 
{
  try
   {
      const url = `https://api.trello.com/1/checklists/${checklistid}?key=${key}&token=${token}`;
      const response = await axios.delete(url)
      return response.data
   } 
  catch (error)
  {
    console.error("Failed to delete checklist",error)
    throw error;
  }
}

export const GetCheckItemsAPI=async (checklistid)=>{

  try{
    const url= `https://api.trello.com/1/checklists/${checklistid}/checkItems?key=${key}&token=${token}`
    const response = await axios.get(url)
      return response.data
  
    }
    catch (error) {
      console.error("Failed to get cards:", error);
      throw error;
    }


}

export const CreateCheckListItemAPI=async(checklistid,name)=>{
  try{
  const url= `https://api.trello.com/1/checklists/${checklistid}/checkItems?name=${name}&key=${key}&token=${token}`
  const response = await axios.post(url)
    return response.data

  }
  catch (error) {
    console.error("Failed to get cards:", error);
    throw error;
  }
}

export const DeleteCheckItemAPI=async(itemid,checklistid)=>{
  try {
    const url = `https://api.trello.com/1/checklists/${checklistid}/checkItems/${itemid}?key=${key}&token=${token}`;
    const res = await axios.delete(url);
    return res.data;
  } catch (e) {
    console.error("Failed to delete check item:", e?.response?.data || e.message);
    throw e;
  }
  
}

export const UpdateCheckItemAPI = async (itemId, checklistId, cardId, state) => {
  try {
    console.log("=== DEBUG INFO ===");
    console.log("itemId:", itemId);
    console.log("checklistId:", checklistId);
    console.log("cardId:", cardId);
    console.log("state:", state);
    console.log("==================");
      const url = `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?key=${key}&token=${token}&state=${state}`;
      console.log("Update URL:", url);
      
      const res = await axios.put(url);
      return res.data;
  } catch (e) {
      console.error("Failed to update check item:", e?.response?.data || e.message);
      throw e;
  }
}
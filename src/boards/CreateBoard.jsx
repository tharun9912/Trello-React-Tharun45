import Button from '@mui/material/Button'
import React, { useState } from 'react'
import axios from 'axios'

const key = import.meta.env.VITE_TRELLO_KEY;
const token = import.meta.env.VITE_TRELLO_TOKEN;

const CreateBoard = () => {
  const [msg,setMsg] = useState("");
  const [board,setBoard] = useState("");
  async function handleClick()
  {
    const url = `https://api.trello.com/1/boards?name=${board}&key=${key}&token=${token}`;
    if(!board.trim())
    {
      setMsg("Board name cant be empty");
      return;
    }
    try 
    {
      const resposne = await axios.post(url);
      setMsg(`Board "${resposne.data.name}" created successfully!`);
      setBoard("");
    } catch (error)
    {
      console.log("Error in creating Board",error);
      throw error;
      setMsg("Failed to create board.");
    }
  }
  function handleCancel()
  {
    setBoard("")
  }
  return (
    <div>
        <div className=' flex flex-col w-60 h-50 bg-gray-400 gap-5 '>
            <input type="text" name="board" placeholder="Add Board title" className='p-5 h-10 w-40 text-black m-5 border-1' value={board} onChange={(e) => {setBoard(e.target.value)}}/>
            <div className='flex flex-row gap-10 m-5'>
                  <button className='bg-blue-700 w-20 h-10 text-white' onClick={handleClick}>ADD</button>
                  <button className='text-black' onClick={handleCancel}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default CreateBoard
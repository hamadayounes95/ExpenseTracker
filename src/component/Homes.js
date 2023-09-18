import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Homes = () => {
  const[transaction,setTransaction]=useState([])
  const getdata =async()=>{
    const app = await axios.get('http://localhost:3007/trans/')
    setTransaction(app.data)

  }
  const[name,setName]=useState('')
  const[type,setType]=useState('')
  const[amout,setAmount]=useState(0)
  const[date,setDate]=useState(0)
  useEffect(()=>{
    getdata()
  },[])
  const add =async ()=>{
    await axios.post('http://localhost:3007/trans/', {name:name , type :type , amout: Number(amout) ,date:date})
    setTransaction([...transaction,{name:name , type :type , amout: Number(amout) ,date:date}])
  }
  return (
    <div>
        <h1 className='text-center text-4xl bg-slate-700 py-8 my-2 text-white shadow-sm font-bold'>Expense Tracker</h1>
        <div className='flex flex-row'>
        <div className='flex-[0.5] flex flex-col items-center justify-center'>
          <p className='font-bold'>Total</p>
          <p className='font-bold text-green-600'>
            {
            transaction.reduce((acc, curr) => {
              return acc + curr.amout
            }, 0)
            } DHS
          </p>
        </div>
        <div className='flex-[0.5] flex flex-col items-center justify-center gap-4 my-8'>
          <h1 className='font-bold'>Transaction</h1>
          <input type="text" placeholder="Sallary,House Rend," className="input input-bordered w-full max-w-xs" onChange={event=>setName(event.target.value)} />
          <select className="select select-bordered w-full max-w-xs" onChange={event=>setType(event.target.value)}>
  <option value={"Investment"} >Investment</option>
  <option value={'Expense'}>Expense</option>
  <option value={"saving"}>saving</option>
  </select>
<input type="text" placeholder="Amount" className="input input-bordered w-full max-w-xs" onChange={event=>setAmount(event.target.value)}></input>
<button className="btn btn-primary w-full max-w-xs font-bold" onClick={add}>Make Transaction</button>
<h1 className='font-bold my-4'>History</h1>
{
  transaction.map(a=>(
   <div>
    <p>{a.name} </p>
    <p>{a.type} </p>
    <p>{a.amout} </p>
    </div>
  ))
}
        </div>
        </div>
    </div>
  )
}

export default Homes
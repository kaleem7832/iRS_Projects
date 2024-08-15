"use client"

import { useState } from "react";


export default function AddNew() {
   const [receieved, setReceived] = useState("")
   const [client, setClient] = useState("");
   const [title, setTitle] = useState("");
   const [confirmit, setConfirmit] = useState("");
   const [programmer1, setProgrammer1] = useState("");
   const [programmer2, setProgrammer2] = useState("");
   const [tester, setTester] = useState("");
   const [scriptqc, setScriptqc] = useState("");
   const [status, setStatus] = useState("");
   const [manager, setManger] = useState("");
   const [launch, setLaunch] = useState("");
   const [size, setSize] = useState(null);
   const [delviery, setDelivery] = useState(null);
   
  function handleSubmit(e){
    e.preventDefault();
    console.log({receieved, client, title, confirmit, programmer1, programmer2, tester, scriptqc, status, manager, launch, size, delviery})
  }
  
  return (<div>
    
    <form onSubmit={handleSubmit} className="">
        <div className="flex  gap-3 mx-auto mt-5 justify-center">
            <div>
                <div className="flex flex-col gap-1 mb-2">
          <label >Recieved date</label>
          <input
            onChange={(e) => setReceived(e.target.value)}
            type="date"
            />
            
        </div>
        <div className="flex flex-col gap-1 mb-2">
         <label >Client</label>
          <input
            onChange={(e) => setClient(e.target.value)}
            type="text"
          />
           
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label >Project title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            
          />
          
        </div>

        <div className="flex flex-col gap-1 mb-2">
         <label >ConfirmIT ID</label>
          <input
            onChange={(e) => setConfirmit(e.target.value)}
            type="text"
           
          />
           
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label >Primary programmer</label>
          <input
            onChange={(e) => setProgrammer1(e.target.value)}
            type="text"
            
          />
          
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label >Secondary programmer</label>
          <input
            onChange={(e) => setProgrammer2(e.target.value)}
            type="text"
            
          />
          
        </div>
        <div className="flex flex-col gap-1 mb-2">
         <label >Delivery date</label>
          <input
            onChange={(e) => setDelivery(e.target.value)}
            type="date"
            
          />
           
        </div>
        </div>
            <div><div className="flex flex-col gap-1 mb-2">
          <label >Tested by</label>
          <input
            onChange={(e) => setTester(e.target.value)}
            type="text"
            
          />
          
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label >Script QC</label>
          <input
            onChange={(e) => setScriptqc(e.target.value)}
            type="text"
            
          />
          
        </div>       
        <div className="flex flex-col gap-1 mb-2">
          <label >Launch date</label>
          <input
            onChange={(e) => setLaunch(e.target.value)}
            type="date"
            
          />
          
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label >Manager</label>
          <input
            onChange={(e) => setManger(e.target.value)}
            type="text"
           
          />
          
        </div>
        <div className="flex flex-col gap-1 mb-2">
         <label >Sample size</label>
          <input
            onChange={(e) => setSize(e.target.value)}
            type="text"
           
          />
           
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label >Status</label>
          <input
            onChange={(e) => setStatus(e.target.value)}
            type="text"
           
          />
          
        </div>
        <div className="flex flex-col gap-1 mb-2">
            <label>&nbsp;</label>
        <button type="submit" className="p-2 rounded-sm bg-slate-800 text-white w-full">Add Project</button>
        </div>
        </div>
        
        </div>
        

        
    </form>
  </div>);
}
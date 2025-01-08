import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const  localData=()=>{
  let list = localStorage.getItem("data");
  if(list){
    return JSON.parse(localStorage.getItem("data"))
  }
  else{
    return [];
  }
}

const App = () => {
  const [input, setInput] = useState(" ");
  const [item, setItem] = useState(localData());

  const deleteData =(id)=>{
    const updateItem = item.filter((val,index)=>{
      return index !== id
    })
    setItem(updateItem)
  }

  const itemsAdded=()=>{
    if(!input){
      alert('pls filled something into input box')
    }
    else{
      setItem([...item,input]);
      setInput("");
    }
  }

  useEffect(()=>{
    localStorage.setItem("data",JSON.stringify(item))
  },[item])
  return (
    <div className="bg-[#061525] w-[100%] h-[100vh] flex flex-col justify-center items-center">
      <div className="w-[400px] h-[60px] flex">
        <input type="text" onChange={(e)=>setInput(e.target.value)} className="w-[300px] h[60px] rounded-lg" />
        <GrAdd onClick={itemsAdded} className="bg-white mt-4 ml-[-2rem] text-[1.3rem]"></GrAdd>
      </div>
      <div>
        {
          item.map((val,index)=>(
            <div key={val.index} className="text-white font-semibold bg-[#101298] w-[300px] h-[60px] mt-[2rem] ml-[-6rem] rounded-lg p-4 flex justify-between">
              <h1>{val}</h1>
              <AiFillDelete onClick={()=>deleteData(index)}></AiFillDelete>
              <AiFillEdit className="ml-[-10rem]"></AiFillEdit>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default App;

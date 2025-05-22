import React, {useState, useEffect} from 'react'
import './todo.css'

function Todo() {

  const [lists, setList] = useState(() => {
  const savedList = localStorage.getItem('todoList');
  return savedList ? JSON.parse(savedList) : [];
});

    const [ item, setItem] = useState("")



    function handleInput(event) {
        setItem(event.target.value)
    }
    function AddItem(){

        const newElement = item

        if(newElement.trim() !== ''){
             setList(c => ([...c, newElement ]))
        setItem('')
        }

       
    }

    function removeItem(index){
  if (window.confirm('Delete this item?')) {
  setList(lists.filter((_, i) => i !== index));
    }
}

function moveTaskUp(index) {
  if (index === 0) return; 

  const updatedTask = [...lists];
  [updatedTask[index], updatedTask[index - 1]] = [
    updatedTask[index - 1],
    updatedTask[index],
  ];

  setList(updatedTask);
}

function moveTaskDown(index) {
  if (index === lists.length - 1) return; 

  const updatedTask = [...lists];
  [updatedTask[index], updatedTask[index + 1]] = [
    updatedTask[index + 1],
    updatedTask[index],
  ];

  setList(updatedTask);
}

useEffect(() => {
  localStorage.setItem('todoList', JSON.stringify(lists));
}, [lists]);

useEffect(() => {
  const savedList = localStorage.getItem('todoList');
  if (savedList) {
    setList(JSON.parse(savedList));
  }
}, []);

    


  return (
    <div className='list-parent'>

        <h1>TO-DO LIST APP</h1>
        <div className='input-field'>
            <input type="text" value={item} onChange={handleInput} placeholder='Add an Item'  />
            <button onClick={AddItem}>ADD</button>
        </div>
        <ul>
            {lists.map((list, index) => (
                <li key={index} >
                      <button onClick={() => removeItem(index)} className='delete'>
                        Delete
                    </button>
                   <span className='item-list'> {list} </span> 
                  
                    <button onClick={() => moveTaskUp(index)} className='move-btn'>
                        ☝️
                    </button>
                    <button onClick={() => moveTaskDown(index)} className='move-btn'>
                        👇
                    </button>
                </li>
            ))}
        </ul>
      
    </div>
  )
}

export default Todo

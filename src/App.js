import React from 'react'
// import logo from './logo.svg'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash, faPen, faInfoCircle, faEdit, faAdd } from '@fortawesome/free-solid-svg-icons'



function App() {

  const [todo, setTodo] = React.useState([
    {
      id: Math.random(),
      value: 'testk',
      status: true,
      date: '2023-03-10'
    },
    {
      id: Math.random(),
      value: 'yow',
      status: true,
      date: '2023-03-11'
    },
  ])

  const [newTask, setNewTask] = React.useState('')
  const [toggleAdd, setToggleAdd] = React.useState(true)

  const [isEditItem, setIsEditItem] = React.useState(null)

  const addTask = () => {
    if(newTask && toggleAdd === false) {
      return setTodo(
        todo.map(val => {
          if(isEditItem && val.id === isEditItem) {
            return {...val, value: newTask, date: dateValue}
          }
          setNewTask('')
          setDateValue('')
          setToggleAdd(true)
          return val
        })
      )
    }
    let num = Math.random()
    if(dateValue === '') return
    let newTodo = {id: num.toString(), value: newTask, status: true, date: dateValue}
    setTodo([...todo, newTodo])
    setNewTask('')
    setDateValue('')
  }

  const checkState = (id, index) => {
    let newState = todo.map((x, i) => {
      if(x.status === id && i === index) {
        return ({...x, status: !x.status})
      }
      return x
    })
    setTodo(newState)
  }

  const updateTask = (e) => {
    setNewTask(e.target.value)
  }

  const [dateValue, setDateValue] = React.useState('')

  const [filter, setFilter] = React.useState('All');

  const getSort = (e) => {
    const filteredTodos = todo.filter(x => x.status === true)
    if (e.target.value === '-- Sort By --') return
    let sortedTodos
    if (e.target.value === 'Ascending') {
      sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.date < b.date) return -1
        if (a.date > b.date) return 1
        return 0
      })
    } else if (e.target.value === 'Descending') {
      sortedTodos = [...filteredTodos].sort((a, b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })
    }
    if (sortedTodos) return setTodo(sortedTodos.concat(todo.filter(x => x.status === false)))
  }

  const deleteTodos = (id) => {
    const deletedTodo = [...todo].filter(val => {
      return val.id !== id
    })
    setTodo(deletedTodo)
  }

  const editTodos = (id) => {
    let newEdit = todo.find(el => {
      return el.id === id
    })
    setNewTask(newEdit.value)
    setIsEditItem(id)
    setDateValue(newEdit.date)
    setToggleAdd(false)
  }
  

  return (
    <div className='xl:max-w-5xl container mx-auto'>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='flex justify-center gap-5 pt-10'>
          <FontAwesomeIcon icon={faCheckCircle} className="text-cyan-500 text-5xl my-auto" />
          <h1 className="text-cyan-500 text-5xl">My Todo-s</h1>
        </div>

        <div className='border-b max-w-6xl mx-auto pb-10'>
          <div className='pt-14 flex justify-center gap-5'>
            <input onChange={e => { updateTask(e) }} value={newTask} type="text" placeholder='Add New ..' className='border border-pink-500 rounded h-14 px-6' />
            <input onClick={e => { setDateValue(e.target.value) }} onChange={e => setDateValue(e.target.value)} value={dateValue} type="date" min="2023-03-10" className='rounded border border-pink-500 px-2'/>
            {
              toggleAdd 
              ? 
              <FontAwesomeIcon onClick={addTask} icon={faAdd} className="cursor-pointer text-cyan-500 text-2xl my-auto" /> 
              : 
              <FontAwesomeIcon onClick={addTask} icon={faEdit} className="cursor-pointer text-cyan-500 text-2xl my-auto" />
            }
          </div>
        </div>

        <section>
          <div className='max-w-6xl mx-auto pt-10 flex justify-end gap-7'>
            <div className='flex justify-end gap-2'>
              <label htmlFor="filter">
                Filter
              </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} name="filter" id="filter" className='border rounded px-3'>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Has Due Date">Has Due Date</option>
              </select>
            </div>
            <div className='flex justify-end gap-2'>
              <label htmlFor="sort">
                Sort
              </label>
              <select onChange={(e) => getSort(e)} name="sort" id="sort" className='border rounded px-3'>
                <option value="default">-- Sort By --</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
          </div>

          { todo
           .filter(x => {
            if (filter === 'All') return true
            else if (filter === 'Completed') return x.status === false
            else if (filter === 'Has Due Date') return x.status === true
          })
          .map((x, index) => {
            return (
              <React.Fragment key={x.id}>
                <div className='flex pt-5 gap-1 justify-between group'>
                  <div className='flex gap-3'>
                    <input checked={!x.status} onChange={() => true} onClick={() => checkState(x.status, index)} type="checkbox" className='accent-cyan-400 focus:accent-cyan-500 w-6 h-6 mt-3' />
                    <p className={x.status ? 'text-4xl' : 'text-4xl line-through'}>
                      {x.value}
                    </p>
                  </div>
                  <div className=''>
                  {/* {x.status ? 'hidden group-hover:block' : 'hidden'} */}
                    <div className='flex gap-4 justify-end'>
                      <FontAwesomeIcon onClick={() => editTodos(x.id)} icon={faPen} className="text-cyan-500 text-xl my-auto cursor-pointer" />
                      <FontAwesomeIcon onClick={() => deleteTodos(x.id)} icon={faTrash} className="text-cyan-500 text-xl my-auto cursor-pointer" />
                    </div>
                    <div className='flex gap-4 pt-3'>
                    <FontAwesomeIcon icon={faInfoCircle} className="text-slate-500 text-xl my-auto" />
                    <p className='my-auto'>
                      {x.date.toString()}
                    </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })
          }
        </section>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;

import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



function App() {

  const [todo, setTodo] = React.useState([
    {
      id: '1',
      value: 'testk',
      status: true,
      date: '2023-03-10'
    },
    {
      id: '2',
      value: 'yow',
      status: true,
      date: '2023-03-11'
    },
  ])

  const [newTask, setNewTask] = React.useState('')

  const addTask = () => {
    let num = todo.length + 1
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
            <button onClick={addTask} className='text-white bg-cyan-500 py-2.5 px-3 rounded'>Add</button>
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
            else if (filter === 'Completed') return !x.status
            else if (filter === 'Has Due Date') return x.status
          })
          .map((x, index) => {
            return (
              <React.Fragment key={x.id}>
                <div className='flex gap-1 justify-between group'>
                  <div className='flex gap-3'>
                    <input checked={!x.status} onChange={() => true} onClick={() => checkState(x.status, index)} type="checkbox" className='accent-cyan-400 focus:accent-cyan-500 w-6 h-6 mt-3' />
                    <p className={x.status ? 'text-4xl' : 'text-4xl line-through'}>
                      {x.value}
                    </p>
                  </div>
                  <p className={x.status ? 'hidden group-hover:block' : 'hidden'}>
                    {x.date.toString()}
                  </p>
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

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

const zadanie = [
  {
    nazwaZadania: "Zrobić zakupy",
  },
  {
    nazwaZadania: "Kupic mleko",
  }
];

function App() {
  const [tasks, setTasks] = useState(zadanie);

  return (
    <div className='Main'>

      <div className='NavBar'>
        <h1>Lista rzeczy do zrobienia!</h1>
      </div>

      <div className='MainContent'>

        <div className='ContentLeft'>
          <WypisanieZadan taskk={tasks} onSetTask={setTasks} />
        </div>

        <div className='ContentRight'>
          <DodawanieZadan onSetTaskk={setTasks} />
        </div>

      </div>

    </div>
  );
}

function WypisanieZadan({ taskk, onSetTask }) {
  const toggleTask = (index) => {
    const updatedTasks = [...taskk];
    updatedTasks[index].done = !updatedTasks[index].done;
    onSetTask(updatedTasks);
  };

  return (
    <div>
      <h2>Twoje zadania:</h2>

      <ul className='zadanLista'>
        {taskk.map((task, index) => (
          <li key={index} style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.nazwaZadania}{' '}
            
            <button className='btn btn-dark btn-sm' onClick={() => toggleTask(index)}>{task.done ? 'Niezrobione' : 'Zrobione'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DodawanieZadan({ onSetTaskk }) {
  const [newTask, setNewTask] = useState('');

  const DodajZadanie = () => {

    if (newTask.trim() !== '') {
      onSetTaskk((prevTasks) => [ // Aktualizacja listy zadań o nowe zadanie
        ...prevTasks, //operator rozpraszania(...) służy do skopiowania poprzedniej listy zadań
        {
          nazwaZadania: newTask.trim(), // Dodawanie nowego zadania
          done: false, // Ustawienie statusu nowego zadania na niezrobione
        },
      ]);

      setNewTask(''); // Resetowanie pola nowego zadania
    }

  };

  return (
    <div>
      <form className='form1'>
        <div className='form-group'>

          <label htmlFor='InputName'>Nazwa zadania:</label>
          <input
            type='text'
            className='form-control'
            id='InputName'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Wpisz nazwę zadania: '
          />

        </div>

        <button type='button' className='btn btn-dark' onClick={DodajZadanie}>Dodaj</button>
      </form>
    </div>
  );
}

export default App;
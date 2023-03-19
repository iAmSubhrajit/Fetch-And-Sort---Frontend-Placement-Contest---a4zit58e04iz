import React, { useState } from 'react'
import '../styles/App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const handleFetchUser = () => {
    setIsLoading(true)
    fetch('https://content.newtonschool.co/v1/pr/main/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }
  const handleSorting = async () => {

    if (sortAscending) {
      setUsers([...users].sort((a, b) => a.name.length - b.name.length));
    } else {
      setUsers([...users].sort((a, b) => b.name.length - a.name.length));
    }
    setSortAscending(!sortAscending);

  }
  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={handleFetchUser}>Fetch User Data</button>
      <button className="sort-btn" onClick={handleSorting}>
        {sortAscending ? "Sort by name length (ascending)" :
          "Sort by name length (descending)"}
      </button>
      <p>{isLoading && "Loading..."}</p>
      <div className='users-section'>
        {users && users.map(ele => (
          <li key={ele.id}>
            <section className='id-section'>{ele.id}</section>
            <section className='name-email-section'>
              <p className='name'>{`Name: ${ele.name}`}</p>
              <p className='email'>{`Email: ${ele.email}`}</p>
            </section>
          </li>
        ))}
      </div>
    </div>
  )
}


export default App;

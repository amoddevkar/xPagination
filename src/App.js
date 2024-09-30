import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [employees, setEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!response.ok) {
          throw new Error("error");

        }
        const jsonData = await response.json();
        //console.log(jsonData)
        setEmployees(jsonData);
      } catch (error) {
        alert("failed to fetch data");
      }
    }

    fetchData()
  }, [])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(employees.length / recordsPerPage)
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>

          </tr>
        </thead>
        <tbody>
          {currentRecords.map(employee => (
            <tr>
              <td>{employee.id} </td>
              <td>{employee.name} </td>
              <td>{employee.email} </td>
              <td>{employee.role} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><button onClick={goToPrevPage}>Previous</button><span>{currentPage}</span><button onClick={goToNextPage}>Next</button></div>
    </div>
  );
}

export default App;

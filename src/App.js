import './App.css';
import { useState } from 'react';
import CompanyView from './company/Company';
import ButtonCard from './forms/ButtonCard.jsx';

function App() {

  const [mainview, setMainView] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Company Management</h1>
      </header>
      <div className="main-menu">
        <ButtonCard 
            id='mainmenu-manage-companies'
            value='Manage Companies'
            onclick={() => {
              setMainView(< CompanyView />)
            }}
        />
        <ButtonCard 
            id='mainmenu-manage-employees'
            value='Manage Employees'
            onclick={() => {
              // Code here
            }}
        />
        <ButtonCard 
            id='mainmenu-manage-loans'
            value='Manage Loans'
            onclick={() => {
              // Code here
            }}
        />
      </div>
      <div className="MainView">
        { mainview }
      </div>
    </div>
  );
}

export default App;
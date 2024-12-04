import React from 'react';
import SearchBar from './Components/SearchBar/SearchBar'; // Adjust the path if your file structure is different

const App = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Weather Search</h1>
      <p>Search for cities and get location suggestions instantly!</p>
      <SearchBar />
    </div>
  );
};

export default App;

import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Note from './Note';
import EditNote from './EditNote';
import ErrorDisplay from './ErrorDisplay';

function App() {
  return (
    // Header section
    <div className="app">
      <Header />
      <ErrorDisplay />
      <div className="noteBody">
        <Note />

      </div>
      <EditNote />
    </div>

  );
}

export default App;

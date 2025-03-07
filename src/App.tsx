import './App.css'
import Calendar from './components/calendar'

function App() {

  // Establish local storage to store calendar data
  const existingValue = localStorage.getItem("calendar_data");
  if (existingValue === null) {
    localStorage.setItem("calendar_data", JSON.stringify([]));
  } else {
    localStorage.setItem("calendar_data", existingValue);
  }

  return (
    <>
      <Calendar/>
    </>
  )
}

export default App

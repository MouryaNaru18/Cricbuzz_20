import logo from './logo.svg';
import './App.css';
import FocusInput from './components/FocusInput';
import FRParent from './components/FRParent';
import ClickCounter from './components/ClickCounter';
import HoverCounter from './components/HoverCounter';
function App() {
  return (
    <div className="App">
     <ClickCounter name="Shasmith"></ClickCounter>
     <HoverCounter> </HoverCounter>
    </div>
  );
}

export default App;

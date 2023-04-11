// App.js
import './App.css';
import { FolderPicker } from './Components/FolderPicker';

function App() {
  const handleFoldersChange = (folders) => {
    console.log('Selected folders:', folders);
  };

  return (
    <div>
      <h1>Folder Picker</h1>
      <FolderPicker onFoldersChange={handleFoldersChange} />
    </div>
  );
};

export default App;

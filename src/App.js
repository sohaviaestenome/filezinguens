import './App.css';
import { FolderPicker } from './Components/FolderPicker';

function App() {
  const handleFoldersChange = (folders) => {
    window.electron.send('move-files-to-parent', folders);
  };

  return (
    <div>
      <h1>Folder Picker</h1>
      <FolderPicker onFoldersChange={handleFoldersChange} />
    </div>
  );
};

export default App;

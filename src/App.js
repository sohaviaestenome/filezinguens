import { useState } from 'react';
import { FolderPicker } from './Components/FolderPicker';
import Button from '@mui/material/Button';

function App() {
  const [selectedFolders, setSelectedFolders] = useState([]);

  const handleFoldersChange = (folders) => {
    console.log('Selected folders:', folders);
    setSelectedFolders(folders);
  };

  const handleExecute = () => {
    window.electron.moveFilesToParentFolder(selectedFolders);
  };

  return (
    <div>
      <h1>Folder Picker</h1>
      <FolderPicker onFoldersChange={handleFoldersChange} />
      <Button onClick={handleExecute} variant="contained">
        Execute
      </Button>
    </div>
  );
}

export default App;

//App.js
import { useState } from 'react';
import { FolderPicker } from './Components/FolderPicker';
import { DestinationFolderPicker } from './Components/DestinationFolderPicker';
import Button from '@mui/material/Button';


function App() {
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [destinationFolder, setDestinationFolder] = useState([]);

  const handleFoldersChange = (folders) => {
    setSelectedFolders(folders);
  };

  const handleDestinationFolderChange = (folder) => {
    setDestinationFolder([folder]);
  };

  const handleExecute = () => {
    window.electron.moveFilesToParentFolder({ folders: selectedFolders, destinationFolder });
  };
  
  return (
    <div>
      <h1>Folder Picker</h1>
      <FolderPicker onFoldersChange={handleFoldersChange} />
      <DestinationFolderPicker onDestinationFolderChange={handleDestinationFolderChange} />
      <Button onClick={handleExecute} variant="contained">
        Execute
      </Button>
    </div>
  );
}

export default App;

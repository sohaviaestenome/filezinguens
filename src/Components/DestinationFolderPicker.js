// Components/DestinationFolderPicker.js
import React from 'react';
import Button from '@mui/material/Button';

export const DestinationFolderPicker = ({ onDestinationFolderChange }) => {
  const handleFolderSelect = async () => {
    const [folderPath] = await window.electron.invoke('select-folder');
    if (onDestinationFolderChange) {
      onDestinationFolderChange(folderPath);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFolderSelect}>
        Select Destination Folder
      </Button>
    </div>
  );
};

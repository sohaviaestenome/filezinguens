//DestinationFolderPicker.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const DestinationFolderPicker = ({ onDestinationFolderChange }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderSelect = async () => {
    const [folderPath] = await window.electron.invoke('select-folder');
    setSelectedFolder(folderPath);

    if (onDestinationFolderChange) {
      onDestinationFolderChange(folderPath);
    }
  };

  const handleFolderDelete = () => {
    setSelectedFolder(null);

    if (onDestinationFolderChange) {
      onDestinationFolderChange(null);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFolderSelect}>
        Select Destination Folder
      </Button>
      {selectedFolder && (
        <List>
          <ListItem>
            <ListItemText primary={selectedFolder} />
            <ListItemIcon>
              <IconButton edge="end" aria-label="delete" onClick={handleFolderDelete}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      )}
    </div>
  );
};

// FolderPicker.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export const FolderPicker = ({ onFoldersChange }) => {
  const [selectedFolders, setSelectedFolders] = useState([]);

  const handleFolderSelect = async () => {
    const result = await window.electron.showDialog({
      properties: ['openDirectory', 'multiSelections'],
    });

    if (result.filePaths) {
      setSelectedFolders([...selectedFolders, ...result.filePaths]);

      if (onFoldersChange) {
        onFoldersChange([...selectedFolders, ...result.filePaths]);
      }
    }
  };

  const handleFolderDelete = (index) => {
    const updatedFolders = selectedFolders.filter((_, i) => i !== index);
    setSelectedFolders(updatedFolders);

    if (onFoldersChange) {
      onFoldersChange(updatedFolders);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleFolderSelect}>
        Select Folders
      </Button>
      <List>
        {selectedFolders.map((folder, index) => (
          <ListItem key={index}>
            <ListItemText primary={folder} />
            <ListItemIcon>
              <IconButton edge="end" aria-label="delete" onClick={() => handleFolderDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

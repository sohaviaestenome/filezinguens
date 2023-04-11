// FolderPicker.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import DeleteIcon from '@mui/icons-material/Delete';

export const FolderPicker = ({ onFoldersChange }) => {
  const [selectedFolders, setSelectedFolders] = useState([]);

  const handleFolderChange = async (e) => {
    const { files } = e.target;
    const folders = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === '') {
        folders.push(files[i].path);
      }
    }

    setSelectedFolders([...selectedFolders, ...folders]);

    if (onFoldersChange) {
      onFoldersChange([...selectedFolders, ...folders]);
    }
  };

  const removeFolder = (index) => {
    const newFolders = [...selectedFolders];
    newFolders.splice(index, 1);
    setSelectedFolders(newFolders);

    if (onFoldersChange) {
      onFoldersChange(newFolders);
    }
  };

  return (
    <div>
      <input
        webkitdirectory="true"
        mozdirectory="true"
        msdirectory="true"
        odirectory="true"
        directory=""
        style={{ display: 'none' }}
        id="folder-picker"
        multiple
        type="file"
        onChange={handleFolderChange}
      />
      <label htmlFor="folder-picker">
        <Button variant="contained" component="span">
          Select Folders
        </Button>
      </label>
      <List>
        {selectedFolders.map((folder, index) => (
          <ListItem key={index}>
            <ListItemText primary={folder} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFolder(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

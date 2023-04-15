// FolderPicker.test.js
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FolderPicker } from './FolderPicker';

test('FolderPicker sends the correct folder data to the Electron backend', async () => {
  const onFoldersChange = jest.fn();
  const { getByText } = render(<FolderPicker onFoldersChange={onFoldersChange} />);

  const selectFoldersBtn = getByText(/Select Folders/i);
  const mockFolders = ['folder1', 'folder2'];

  window.electron = {
    invoke: jest.fn(() => Promise.resolve(mockFolders)),
  };

  fireEvent.click(selectFoldersBtn);

  await waitFor(() => {
    expect(window.electron.invoke).toHaveBeenCalledWith('select-folders');
    expect(onFoldersChange).toHaveBeenCalledWith(mockFolders);
  });
});

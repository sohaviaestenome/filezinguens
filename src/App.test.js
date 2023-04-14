// app.test.js

import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.electron = {
    invoke: jest.fn(),
  };
});

test('sends the correct folder data to the Electron backend', async () => {
  const { getByText } = render(<App />);
  const selectFoldersBtn = getByText(/Select Folders/i);
  const selectDestinationFolderBtn = getByText(/Select Destination Folder/i);

  const mockFolders = ['folder1', 'folder2'];
  const mockDestinationFolder = 'destination-folder';

  jest.spyOn(window.electron, 'invoke').mockImplementation((action) => {
    if (action === 'select-folders') {
      return Promise.resolve(mockFolders);
    } else if (action === 'select-folder') {
      return Promise.resolve(mockDestinationFolder);
    }
    return Promise.reject(new Error('Unknown action'));
  });

  fireEvent.click(selectFoldersBtn);

  await waitFor(() => {
  const expectedAction = 'select-folders';
  const actualAction = window.electron.invoke.mock.calls[0][0];
  expect(actualAction).toBe(expectedAction);
});

fireEvent.click(selectDestinationFolderBtn);

await waitFor(() => {
  const expectedAction = 'select-folder';
  const actualAction = window.electron.invoke.mock.calls[1][0];
  expect(actualAction).toBe(expectedAction);
});

});

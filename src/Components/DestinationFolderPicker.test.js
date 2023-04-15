// DestinationFolderPicker.test.js
import { render, fireEvent, waitFor } from '@testing-library/react';
import { DestinationFolderPicker } from './DestinationFolderPicker';

test('DestinationFolderPicker sends the correct folder data to the Electron backend', async () => {
  const onDestinationFolderChange = jest.fn();
  const { getByText } = render(<DestinationFolderPicker onDestinationFolderChange={onDestinationFolderChange} />);

  const selectDestinationFolderBtn = getByText(/Select Destination Folder/i);
  const mockDestinationFolder = 'destination-folder';

  window.electron = {
    invoke: jest.fn(() => Promise.resolve([mockDestinationFolder])),
  };

  fireEvent.click(selectDestinationFolderBtn);

  await waitFor(() => {
    expect(window.electron.invoke).toHaveBeenCalledWith('select-folder');
    expect(onDestinationFolderChange).toHaveBeenCalledWith(mockDestinationFolder);
  });
});
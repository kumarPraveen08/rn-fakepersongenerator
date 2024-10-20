import RNFS from 'react-native-fs';
import Share from 'react-native-share';

import crown from '../assets/images/crown.webp';
import darkCrown from '../assets/images/crown-dark.webp';
import shield from '../assets/images/shield.webp';
import darkShield from '../assets/images/shield-dark.webp';
import female from '../assets/images/female.webp';
import male from '../assets/images/male.webp';

const getRandomItem = arr =>
  arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;

const jsonToCSV = jsonData => {
  const headers = Object.keys(jsonData[0]);
  const csvRows = [
    headers.join(','), // header row
    ...jsonData.map(row =>
      headers
        .map(fieldName =>
          JSON.stringify(row[fieldName], (key, value) =>
            value === null ? '' : value,
          ),
        )
        .join(','),
    ), // data rows
  ];
  return csvRows.join('\n');
};

const flattenData = data => {
  return data.map(item => {
    const flattened = {
      id: item.id,
      seed: item.seed,
      avatar: item.avatar,
    };

    item.personal.forEach(p => {
      flattened[p.key] = p.value;
    });

    item.phone.forEach(c => {
      flattened[c.key] = c.value;
    });

    item.internet.forEach(c => {
      flattened[c.key] = c.value;
    });

    item.card.forEach(c => {
      flattened[c.key] = c.value;
    });

    item.others.forEach(c => {
      flattened[c.key] = c.value;
    });

    return flattened;
  });
};

const writeCSVFile = async csvData => {
  const d = new Date().getTime();
  const path = `${RNFS.ExternalDirectoryPath}/${d}.csv`;

  try {
    await RNFS.writeFile(path, csvData, 'utf8');
    console.log('CSV file created at: ', path);
    return path;
  } catch (error) {
    console.error('Error writing CSV file:', error);
  }
};

const listFiles = async setFiles => {
  try {
    const files = await RNFS.readDir(RNFS.ExternalDirectoryPath);
    const csvFiles = files
      .filter(file => file.name.endsWith('.csv'))
      .sort((a, b) => b.mtime - a.mtime);
    setFiles(csvFiles);
  } catch (error) {
    console.error('Error reading directory:', error);
  }
};

const openFile = async filePath => {
  try {
    const options = {
      url: 'file://' + filePath,
      type: 'text/csv', // Adjust the MIME type if needed
    };
    await Share.open(options);
  } catch (error) {
    if (error.message !== 'User did not share') {
      console.error('Error opening file:', error);
    }
  }
};

const deleteFile = async filePath => {
  try {
    await RNFS.unlink(filePath);
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

const formatFileSize = sizeInBytes => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < 1048576) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
  }
};

export {
  crown,
  shield,
  darkShield,
  darkCrown,
  female,
  male,
  getRandomItem,
  jsonToCSV,
  flattenData,
  writeCSVFile,
  listFiles,
  openFile,
  deleteFile,
  formatFileSize,
};

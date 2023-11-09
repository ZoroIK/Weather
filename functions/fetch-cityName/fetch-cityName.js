const fs = require('fs');
const csv = require('csv-parser');
const results = [];
const handler = async (event) => {
  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream('outputCity.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log('CSV data loaded.');
          resolve();
        })
        .on('error', (error) => {
          console.error('Error loading CSV data:', error);
          reject(error);
        });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response || {};
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
}

module.exports = { handler }
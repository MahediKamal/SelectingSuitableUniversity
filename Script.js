// URL of the Google Apps Script web app
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxjc0APQiUy8SuoR7OJiQG7INt_NW-D-4CDsvgBvvRxLg5SLpN0Ne8cZF832ciBkV2xPw/exec';



// Specify the row you want to display (1-based index)
let allData = [];

// Fetch all data from Google Sheets
async function fetchSheetData() {
    try {
      const response = await fetch(WEB_APP_URL);
      allData = await response.json();  // Store data in a global variable
  
      if (allData.error) {
        console.error(allData.error);
      } else {
        console.log("Data fetched successfully. Click the button to display a specific row.");
        document.getElementById('loading-message').style.display = 'none';  // Hide loading message
        document.getElementById('show-row-button').disabled = false;  // Enable the button
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('loading-message').textContent = 'Error loading data. Please try again later.';
    }
  }


  function showMatchingRows() {
    // 1. Collect input values from the 8 parameter input fields
    const params = [
      document.getElementById('state').value,
      document.getElementById('program').value,
      document.getElementById('cgpa').value,
      document.getElementById('grev').value,
      document.getElementById('grea').value,
      document.getElementById('greq').value,
      document.getElementById('ielts').value,
      document.getElementById('toefl').value,
    ];
  
    // 2. Use `allData.filter()` to apply your custom filtering logic
    const matchingRows = allData.filter(row => {
      // Your custom filtering conditions here
      // Example structure:
      //  return row[0] === params[0] && row[1] === params[1] && ... ;
      console.log(params);
      return row[2] === params[0]
      // Sample placeholder for filtering logic:
      return params.every((param, index) => {
        // For each parameter:
        //  - If `param` is empty, ignore it (wildcard)
        //  - If `param` is not empty, check if it matches the corresponding cell in `row`
        return param === '' || row[index] === param;
      });
    });
  
    // 3. Display the filtered data in the table
    displayRows(matchingRows);
  }

// Display only the specified row
// Display the matched rows in the table
function displayRows(rows) {
    const headerRow = document.getElementById('table-header');
    const body = document.getElementById('table-body');
  
    // Clear any existing content
    headerRow.innerHTML = '';
    body.innerHTML = '';
  
    if (rows.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.textContent = 'No matching rows found';
      td.colSpan = 8;  // Assuming there are 8 columns
      tr.appendChild(td);
      body.appendChild(tr);
      return;
    }
  
    // Display table headers (assuming first row contains headers)
    rows[0].forEach((header, index) => {
      const th = document.createElement('th');
      th.textContent = `Column ${index + 1}`;
      headerRow.appendChild(th);
    });
  
    // Display matching rows
    rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  }
  

// Show the specified row on button click
function showRow() {
  showMatchingRows()
}

// Fetch data on page load but don’t display it yet
document.addEventListener('DOMContentLoaded', fetchSheetData);

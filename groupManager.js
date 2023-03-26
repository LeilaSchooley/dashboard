function insertGroupRow(tableId, columns) {
  // Get the table id of the Accounts table

  // Create an object to hold the data for the new row
  var row = {};

  try {
    // Populate the object with the data for the new row
    row[columns.find((column) => column.name === "name").id] = data.name;
    row[columns.find((column) => column.name === "description").id] =
    data.description;
    row[columns.find((column) => column.name === "accounts").id] =
    data.accounts.join(",");
  } catch (error) {
    console.log(error.message);
  }
  // Insert the new row into the table
  Api.DatabaseInsert([], row, tableId)
    .then(() => {
      console.log(`Row inserted successfully {tableId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}

function fetchGroups(tableId, columns) {
  try {

    var data = [];

    // Loop through each record in the table
    Api.DatabaseSelect({}, tableId).then(function (records) {
      records.forEach(function (record) {
        // Create an object to hold the record data
        var obj = {};

        // Loop through each column and get the value for the current record
        columns.forEach(function (column) {
          obj[column.name] = record.data[column.id];
        });

        // Add the object to the data array
        data.push(obj);
      });

        renderGroups(data)
        
      // Print the data array to the log
    });
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

// Render all groups in the group list on the page

function renderGroups(groupList) {
  let tableRows = "";
  groupList.forEach((group) => {
    tableRows += `
    <tr>
      <td>${group.name}</td>
      <td>1</td>
      <td>${group.description}</td>
      <td>
        <a href="#">Edit</a> |
        <a href="#">Delete</a>
      </td>
    </tr>
    `;
  });
  $("#groups-table tbody").html(tableRows);
}
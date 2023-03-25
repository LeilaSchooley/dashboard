function insertGroupRow(data) {
  // Get the table id of the Accounts table
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "groups";
  }).id;

  // Get the columns for the Accounts table
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "groups";
  }).columns;

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

function fetchGroups() {
  try {
    // Get the table id of the Accounts table
    var tableId = Api.GetDatabaseStructure().find(function (table) {
      return table.name === "groups";
    }).id;

    // Get the columns for the Accounts table
    var columns = Api.GetDatabaseStructure().find(function (table) {
      return table.name === "groups";
    }).columns;

    // Create an array to hold the data
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
        return data;
      // Print the data array to the log
    });
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

// Render all groups in the group list on the page
function renderGroups(groupList) {
  const table = document.querySelector("tbody");
  table.innerHTML = "";

  groupList.forEach((group) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${group.id}</td>
        <td>${group.name}</td>
        <td>${group.description}</td>
        <td>${group.accounts.length}</td>
        <td>
          <button class="ui small basic button edit-group" data-id="${group.id}">Edit</button>
          <button class="ui small basic button delete-group" data-id="${group.id}">Delete</button>
        </td>
      `;
    table.appendChild(row);
  });
}

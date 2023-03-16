function getAllAccounts() {
  return new Promise((resolve, reject) => {
    try {
      // Get the table id of the Accounts table
      var tableId = Api.GetDatabaseStructure().find(function (table) {
        return table.name === "Accounts";
      }).id;

      // Get the columns for the Accounts table
      var columns = Api.GetDatabaseStructure().find(function (table) {
        return table.name === "Accounts";
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

        // Resolve the Promise with the data array
        resolve(JSON.stringify(data));
      });
    } catch (e) {
      reject(e);
    }
  });
}

function loadAccountData(accountData) {
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");

  const groupColumn = document.createElement("td");
  groupColumn.textContent = "Group";
  row.appendChild(groupColumn);

  const usernameColumn = document.createElement("td");
  usernameColumn.textContent = accountData.username;
  row.appendChild(usernameColumn);

  const proxyColumn = document.createElement("td");
  proxyColumn.textContent = accountData.proxy;
  row.appendChild(proxyColumn);

  const postsColumn = document.createElement("td");
  postsColumn.textContent = "100";
  row.appendChild(postsColumn);

  const followingColumn = document.createElement("td");
  followingColumn.textContent = "200";
  row.appendChild(followingColumn);

  const followersColumn = document.createElement("td");
  followersColumn.textContent = "300";
  row.appendChild(followersColumn);

  const statusColumn = document.createElement("td");
  statusColumn.textContent = "Active";
  row.appendChild(statusColumn);

  ` const settingsColumn = document.createElement("td");
  settingsColumn.textContent = "Settings";
  row.appendChild(settingsColumn);
  const actionsColumn = document.createElement("td");
  actionsColumn.textContent = "Actions";
  row.appendChild(actionsColumn);;`;

  tbody.appendChild(row);
  return row;
}

function saveAccountData() {
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const proxy = document.querySelector('input[name="proxy"]').value;
  // do something with the values

  // Do something with the account data object
  // Get the ID for the "accounts" table
  const accountsTableId = Api.GetDatabaseStructure().find(
    (table) => table.name === "accounts"
  ).id;

  // Create an object representing the account data
  const accountData = {
    Group: "test",
    Username: username,
    Password: password,
    Proxy: proxy,
    RecoveryEmail: "",
    RecoveryPass: "",
    Phone: "",
    Cookies:
      "eyJjb29NGY2ODA2NDgyNmEyZjAxYzI1OTU2NDliNWZlNzk0YyJ9LHsiZG9t3aXR0ZXIuY29tIiFjRDQifV19",
    NumberOfPosts: "44",
    Fingerprint: "",
    NumberOfFollowing: "3",
    NumberOfFollowers: "2",
    Status: "",
  };

  // Insert the account data into the "accounts" table
  Api.DatabaseInsert([], accountData, accountsTableId)
    .then((insertedRecordId) =>
      console.log(`Inserted record with ID ${insertedRecordId}`)
    )
    .catch((error) => console.error(`Error inserting record: ${error}`));

  loadAccountData(accountData);
}

function loadAllAccountsData(data) {
  for (var i = 0; i < data.length; i++) {
    loadAccountData(data[i]);
  }
}

export {
  loadAllAccountsData,
  saveAccountData,
  getAllAccounts,
  loadAccountData,
};

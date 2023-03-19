function loadAccountData(accountData) {
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");

  const groupColumn = document.createElement("td");
  groupColumn.textContent = accountData["Group"];
  row.appendChild(groupColumn);

  const usernameColumn = document.createElement("td");
  usernameColumn.textContent = accountData["Username"];
  row.appendChild(usernameColumn);

  const proxyColumn = document.createElement("td");
  proxyColumn.textContent = accountData.proxy;
  row.appendChild(proxyColumn);

  const postsColumn = document.createElement("td");
  postsColumn.textContent = accountData["Number Of Posts"];
  row.appendChild(postsColumn);

  const followingColumn = document.createElement("td");
  followingColumn.textContent = accountData["Number of Following"];
  row.appendChild(followingColumn);

  const followersColumn = document.createElement("td");
  followersColumn.textContent = accountData["Number of Followers"];
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
    console.log("loading data");
    loadAccountData(data[i]);
  }
}

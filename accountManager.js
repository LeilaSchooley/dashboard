
function insertAccountRow(data) { 
  // Get the table id of the Accounts table
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "accounts";
  }).id;

  // Get the columns for the Accounts table
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "accounts";
  }).columns;

  // Create an object to hold the data for the new row
  var row = {};

  try {
    // Populate the object with the data for the new row
    row[columns.find((column) => column.name === "group").id] = data.group;
    row[columns.find((column) => column.name === "username").id] =
      data.username;
    row[columns.find((column) => column.name === "password").id] =
      data.password;
    row[columns.find((column) => column.name === "proxy").id] = data.proxy;
    row[columns.find((column) => column.name === "recovery_email").id] =
      data.recoveryEmail;
    row[columns.find((column) => column.name === "recovery_pass").id] =
      data.recoveryPass;
    row[columns.find((column) => column.name === "phone").id] = data.phone;
    row[columns.find((column) => column.name === "cookies").id] =
      data.cookies;
    row[columns.find((column) => column.name === "posts").id] =
      data.numberOfPosts;
    row[columns.find((column) => column.name === "fingerprint").id] =
      data.fingerprint;
    row[columns.find((column) => column.name === "following").id] =
      data.numberOfFollowing;
    row[columns.find((column) => column.name === "followers").id] =
      data.numberOfFollowers;
    row[columns.find((column) => column.name === "status").id] = data.status;
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


function loadAccountData(accountData) {
  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");
  
  
  row.appendChild(document.createElement("td")).textContent = accountData["group"];
  row.appendChild(document.createElement("td")).textContent = accountData["username"];
  row.appendChild(document.createElement("td")).textContent = accountData.proxy;
  row.appendChild(document.createElement("td")).textContent = accountData["posts"];
  row.appendChild(document.createElement("td")).textContent = accountData["following"];
  row.appendChild(document.createElement("td")).textContent = accountData["followers"];
  row.appendChild(document.createElement("td")).textContent = accountData["status"];


  tbody.appendChild(row);
  return row;
  }
  

function saveAccountData() {

    // Do something with the account data object
  // Get the ID for the "accounts" table
  const accountsTableId = Api.GetDatabaseStructure().find(
    (table) => table.name === "accounts"
  ).id;

  console.log(accountsTableId);
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const proxy = document.querySelector('input[name="proxy"]').value;
  // do something with the values

  console.log(username);
  console.log(password);
  console.log(proxy);
  // Create an object representing the account data
  const accountData = {

    username: username,
    password: password,
    proxy: proxy,
    recovery_email: "",
    recovery_pass: "",
    phone: "",
    cookies: "eyJjb29NGY2ODA2NDgyNmEyZjAxYzI1OTU2NDliNWZlNzk0YyJ9LHsiZG9t3aXR0ZXIuY29tIiFjRDQifV19",
    posts: "44",
    fingerprint: "",
    following: "3",
    followers: "2",
    status: "",
  };
  
  // Insert the account data into the "accounts" table
  Api.DatabaseInsert([], accountData, accountsTableId)
    .then((insertedRecordId) =>{
      console.log(`Inserted record with ID ${insertedRecordId}`)

      loadAccountData(accountData);

    }
    )
    .catch((error) => console.error(`Error inserting record: ${error}`));

}

function loadAllAccountsData(data) {
  for (var i = 0; i < data.length; i++) {
    console.log("loading data");
    loadAccountData(data[i]);
  }
}

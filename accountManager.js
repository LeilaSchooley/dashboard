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

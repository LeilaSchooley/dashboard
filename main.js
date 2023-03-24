const groupColumnNames = [
  "Group Name",
  "Number of Accounts",
  "Description",
  "Actions",
];

const accountColumnNames = [
  "Group",
  "Username",
  "Proxy",
  "Posts",
  "Following",
  "Followers",
  "Status",
  "Settings",
  "Actions",
];

const taskColumnNames = ["Group", "Account", "Task", "Status", "Actions"];

$(document).ready(function () {
  console.log("Creating tables");

  // Example usage for creating table headers for groups, accounts, and tasks:
  createTableHeader(accountColumnNames);

  // Code to be executed after the DOM has loaded
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });

  $("#add-single").click(() => addAccountModal.classList.add("active"));
  $("#add-single").click(() => $("#addAccountModal").addClass("active"));
  $("#cancelAddAccountButton").click(() =>
    $("#addAccountModal").removeClass("active")
  );

  $("#addAccountButton").click(function () {
    saveAccountDatas();
  });

  function insertRow(data) {
    // Get the table id of the Accounts table
    var tableId = Api.GetDatabaseStructure().find(function (table) {
      return table.name == "Accounts";
    }).id;

    // Get the columns for the Accounts table
    var columns = Api.GetDatabaseStructure().find(function (table) {
      return table.name == "Accounts";
    }).columns;

    // Create an object to hold the data for the new row
    var row = {};

    try {
      // Populate the object with the data for the new row
      row[columns.find((column) => column.name === "Group").id] = data.group;
      row[columns.find((column) => column.name === "Username").id] =
        data.username;
      row[columns.find((column) => column.name === "Password").id] =
        data.password;
      row[columns.find((column) => column.name === "Proxy").id] = data.proxy;
      row[columns.find((column) => column.name === "Recovery Email").id] =
        data.recoveryEmail;
      row[columns.find((column) => column.name === "Recovery Pass").id] =
        data.recoveryPass;
      row[columns.find((column) => column.name === "Phone").id] = data.phone;
      row[columns.find((column) => column.name === "Cookies").id] =
        data.cookies;
      row[columns.find((column) => column.name === "Number Of Posts").id] =
        data.numberOfPosts;
      row[columns.find((column) => column.name === "Fingerprint").id] =
        data.fingerprint;
      row[columns.find((column) => column.name === "Number of Following").id] =
        data.numberOfFollowing;
      row[columns.find((column) => column.name === "Number of Followers").id] =
        data.numberOfFollowers;
      row[columns.find((column) => column.name === "Status").id] = data.status;
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

  function getAllAccounts() {
    try {
      // Get the table id of the Accounts table
      var tableId = Api.GetDatabaseStructure().find(function (table) {
        return table.name === "Accounts";
      }).id;

      // Get the columns for the Accounts table
      var columns = Api.GetDatabaseStructure().find(function (table) {
        return table.name === "Accounts";
      }).columns;
      columns.forEach((column) => console.log(column.name));
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
        loadAllAccountsData(data);
        // Print the data array to the log
      });
    } catch (e) {
      console.log("Error: " + e.message);
    }
  }

  function saveAccountDatas() {
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const proxy = document.querySelector('input[name="proxy"]').value;
    // do something with the values

    const accountData = {
      group: "test",
      username: username,
      password: password,
      proxy: proxy,
      recoveryEmail: "",
      recoveryPass: "",
      phone: "",
      cookies:
        "eyJjb29NGY2ODA2NDgyNmEyZjAxYzI1OTU2NDliNWZlNzk0YyJ9LHsiZG9t3aXR0ZXIuY29tIiFjRDQifV19",
      numberOfPosts: "44",
      fingerprint: "",
      numberOfFollowing: "3",
      numberOfFollowers: "2",
      status: "",
    };

    insertRow(accountData);

    // Call getAllAccounts function to get all the records in the Accounts table
  }

  getAllAccounts();

  const bulkImportButton = document.getElementById("bulkImportButton");
  const bulkImportModal = document.getElementById("bulkImportModal");
  const bulkImportFileInput = document.getElementById("bulkImportFileInput");
  const fileDisplay = document.getElementById("fileDisplay");
  const bulkImportCancelButton = document.getElementById(
    "bulkImportCancelButton"
  );
  const readFileButton = document.getElementById("readFileButton");
  const bulkImportOkButton = document.getElementById("bulkImportOkButton");

  bulkImportButton.addEventListener("click", () => {
    bulkImportModal.classList.add("active");
    document.body.classList.add("modal-open");
  });

  bulkImportModal.addEventListener("click", (event) => {
    if (event.target === bulkImportModal) {
      bulkImportModal.classList.remove("active");
      document.body.classList.remove("modal-open");
      bulkImportFileInput.value = "";
      fileDisplay.value = "";
    }
  });

  bulkImportCancelButton.addEventListener("click", () => {
    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  });

  readFileButton.addEventListener("click", () => {
    const file = bulkImportFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      fileDisplay.value = contents;
    };
    reader.readAsText(file);
  });

  bulkImportOkButton.addEventListener("click", () => {
    // Read file line by line and add to a list of objects
    const list = [];
    const file = bulkImportFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      const lines = contents.split("\n");
      const list = [];
      for (const line of lines) {
        if (line.trim() !== "") {
          const obj = {};
          const parts = line.split(",");
          if (parts.length >= 2) {
            obj.username = parts[0].trim();
            obj.password = parts[1].trim();
          }
          if (parts.length >= 4) {
            obj.email = parts[2].trim();
            obj.recoveryPass = parts[3].trim();
          }
          if (parts.length >= 5) {
            obj.phone = parts[4].trim();
          }
          if (parts.length >= 6) {
            const proxy = parts[5].trim();
            if (proxy !== "") {
              const partsProxy = proxy.split(":");
              if (partsProxy.length === 2) {
                obj.proxy = {
                  ip: partsProxy[0],
                  port: partsProxy[1],
                };
              } else if (partsProxy.length === 4) {
                obj.proxy = {
                  ip: partsProxy[0],
                  port: partsProxy[1],
                  username: partsProxy[2],
                  password: partsProxy[3],
                };
              }
            }
          }
          list.push(obj);
        }
      }
      console.log(list);
      list.forEach((data) => {
        console.log(data);
        insertRow(data);
      });

      getAllAccounts();
    };
    reader.readAsText(file);

    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  });

  const taskManagerButton = document.getElementById("taskManagerButton");
  const taskManagerModal = document.getElementById("taskManagerModal");

  taskManagerButton.addEventListener("click", () => {
    taskManagerModal.classList.add("active");
    document.body.classList.add("modal-open");


      $('#tweetModal').modal('show');
  });






});

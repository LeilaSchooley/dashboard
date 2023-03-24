class Group {
  constructor(name, accounts, description) {
    this.name = name;
    this.accounts = accounts;
    this.number = accounts.length;
    this.description = description;
  }
}

// Create a list to store all groups
const groupList = [
  {
    name: "Group 1",
    accounts: [
      { id: 1, username: "user1", proxy: "proxy1" },
      { id: 2, username: "user2", proxy: "proxy2" },
      { id: 3, username: "user3", proxy: "proxy3" },
    ],
    number: 3,
    description: "This is group 1.",
  },
  {
    name: "Group 2",
    accounts: [
      { id: 4, username: "user4", proxy: "proxy4" },
      { id: 5, username: "user5", proxy: "proxy5" },
      { id: 6, username: "user6", proxy: "proxy6" },
    ],
    number: 3,
    description: "This is group 2.",
  },
];

function addGroupToGroupList(group) {
  groupList.push(group);
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
      loadAllAccountsData(data);
      // Print the data array to the log
    });
  } catch (e) {
    console.log("Error: " + e.message);
  }
}

// Render all groups in the group list on the page
function renderGroups() {
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

// Call fetchGroups to populate the group list and render the groups on the page

async function fetchAccounts() {
  try {
    const response = await fetch("/api/accounts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to populate the accounts dropdown with the fetched accounts
function populateAccounts(accounts) {
  const dropdown = document.querySelector(".ui.dropdown.multiple .menu");
  dropdown.innerHTML = "";

  accounts.forEach((account) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.setAttribute("data-value", account.id);
    item.textContent = `${account.username} - ${account.proxy}`;
    dropdown.appendChild(item);
  });

  $(".ui.dropdown.multiple").dropdown({
    allowAdditions: false,
    fullTextSearch: true,
    forceSelection: false,
    selectOnNavigation: false,
  });
}

// Function to add a new group with selected accounts
function addGroup() {
  const groupName = document.querySelector('input[name="groupName"]').value;
  const groupDescription = document.querySelector(
    'textarea[name="groupDescription"]'
  ).value;
  const selectedAccounts = document.querySelectorAll(
    ".ui.dropdown.multiple .menu .selected.item"
  );

  const accountIds = [];
  selectedAccounts.forEach((account) => {
    accountIds.push(account.getAttribute("data-value"));
  });

  // Do something with the group data and selected account ids
  const groupData = {
    name: groupName,
    description: groupDescription,
    accounts: accountIds,
  };
  console.log(groupData);
  // Call a function to save the new group to the database

  addGroupToGroupList(groupData);
}

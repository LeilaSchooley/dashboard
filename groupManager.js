  

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
  



  async function fetchGroups() {
    try {
      const response = await fetch("/api/groups");
      const data = await response.json();
      groupList = data;
      renderGroups();
    } catch (error) {
      console.error(error);
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

  addGroupToGroupList(groupData)

}



// Fetch all accounts from the database and populate the accounts dropdown
async function loadAccounts() {
  const accounts = await fetchAccounts();
  populateAccounts(accounts);
}



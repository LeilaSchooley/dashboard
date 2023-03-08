async function addTableHeader() {
  // Create the table header element
  const tableHeader = document.createElement("thead");

  // Create the table header row element
  const tableHeaderRow = document.createElement("tr");

  // Create the table header cells (th) and add text content
  const groupCell = document.createElement("th");
  groupCell.textContent = "Group";
  const usernameCell = document.createElement("th");
  usernameCell.textContent = "Username";
  const proxyCell = document.createElement("th");
  proxyCell.textContent = "Proxy";
  const postsCell = document.createElement("th");
  postsCell.textContent = "Posts";
  const followingCell = document.createElement("th");
  followingCell.textContent = "Following";
  const followersCell = document.createElement("th");
  followersCell.textContent = "Followers";
  const statusCell = document.createElement("th");
  statusCell.textContent = "Status";
  const settingsCell = document.createElement("th");
  settingsCell.textContent = "Settings";
  const actionsCell = document.createElement("th");
  actionsCell.textContent = "Actions";

  // Append the table header cells to the table header row
  tableHeaderRow.appendChild(groupCell);
  tableHeaderRow.appendChild(usernameCell);
  tableHeaderRow.appendChild(proxyCell);
  tableHeaderRow.appendChild(postsCell);
  tableHeaderRow.appendChild(followingCell);
  tableHeaderRow.appendChild(followersCell);
  tableHeaderRow.appendChild(statusCell);
  tableHeaderRow.appendChild(settingsCell);
  tableHeaderRow.appendChild(actionsCell);

  // Append the table header row to the table header
  tableHeader.appendChild(tableHeaderRow);

  // Get a reference to the table element
  const table = document.querySelector("table");

  // Append the table header to the table
  table.appendChild(tableHeader);
}
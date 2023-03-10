async function loadAccountData(accountData) {
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

  const settingsColumn = document.createElement("td");
  settingsColumn.textContent = "Settings";
  row.appendChild(settingsColumn);

  const actionsColumn = document.createElement("td");
  actionsColumn.textContent = "Actions";
  row.appendChild(actionsColumn);
  tbody.appendChild(row);
  return row;
}



function saveAccountData() {
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const proxy = document.querySelector('input[name="proxy"]').value;
  // do something with the values
  const accountData = {
    username: username,
    password: password,
    proxy: proxy
  };

  // Do something with the account data object
  console.log(accountData);

  loadAccountData(accountData)
}
async function loadAllAccountsData(data) {
  data.forEach((account) => loadAccountData(data))


}
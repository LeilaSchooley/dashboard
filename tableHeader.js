// Example usage for creating table headers for groups, accounts, and tasks:

 function createTableHeader(columnNames) {
  let tableHeader = document.querySelector("thead");
  if (!tableHeader) tableHeader = document.createElement("thead");

  const tableHeaderRow = document.createElement("tr");
  
  columnNames.forEach((columnName) => {
    const tableHeaderCell = document.createElement("th");
    tableHeaderCell.textContent = columnName;
    tableHeaderRow.appendChild(tableHeaderCell);
  });
  let table = document.querySelector("table");

  tableHeader.appendChild(tableHeaderRow);

  table.appendChild(tableHeader)

  return table;
}


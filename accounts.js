async function loadAccountData() {
  try {
    // const response = await fetch("/api/accounts");
    // const data = await response.json();

    let data = [
      { name: "John Doe", status: "Active" },
      { name: "Jane Smith", status: "Inactive" },
      { name: "Bob Johnson", status: "Pending" },
    ];

    const tbody = document.querySelector("tbody");

    data.forEach((account, index) => {
      const row = document.createElement("tr");

      const numberColumn = document.createElement("td");
      numberColumn.textContent = index + 1;
      row.appendChild(numberColumn);

      const nameColumn = document.createElement("td");
      nameColumn.textContent = account.name;
      row.appendChild(nameColumn);

      const statusColumn = document.createElement("td");
      statusColumn.textContent = account.status;
      row.appendChild(statusColumn);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

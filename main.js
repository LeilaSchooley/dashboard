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

$(document).ready(async function () {
  await addTableHeader();
  // Code to be executed after the DOM has loaded
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });
  loadAccountData();
  let tbody = document.querySelector("tbody");
  let rows = tbody.querySelectorAll("tr");
  const count = rows.length;
  const countElement = document.createElement("div");
  countElement.textContent = `Total accounts: ${count}`;

  $("#taskManagerButton").click(function () {
    $("#taskManagerModal").modal("show");
  });

  $("#addTaskButton").click(function () {
    addTask();
  });

  new Vue({
    el: "#app",
    data: {
      isDropdownVisible: false,
    },
    methods: {
      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
      },
    },
  });

  $("h1").text(`Accounts: ${count}`);
});

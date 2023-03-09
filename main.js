

$(document).ready(async function () {
  await addTableHeader();
  // Code to be executed after the DOM has loaded
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });
  await loadAccountData();
  let tbody = document.querySelector("tbody");
  let rows = tbody.querySelectorAll("tr");
  const count = rows.length;
  const countElement = document.createElement("div");
  countElement.textContent = `Total accounts: ${count}`;

  $("#tasks").click(function () {
    $("tbody").remove();
    $("thead").remove();

    const tasks = [
      { group: 'Group A', account: 'Account 1', task: 'Tweet', status: 'Pending' },
      { group: 'Group B', account: 'Account 2', task: 'Retweet', status: 'Completed' },
      { group: 'Group A', account: 'Account 3', task: 'Follow', status: 'Pending' },
    ];

    createTaskTable(tasks);
  });



  $("#taskManagerButton").click(function () {
    $("#taskManagerModal").modal("show");

    $("#cancelTaskButton").click(function () {
      $("#taskManagerModal").modal("hide");
    });
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

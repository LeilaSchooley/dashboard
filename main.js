$(document).ready(function () {
  const addGroupModal = document.querySelector("#addGroupModal");
  const addGroupButton = document.querySelector("#addGroupButton");
  const addGroupBtn = document.querySelector("#addGroupBtn");

  const bulkImportButton = document.getElementById("add-bulk");
  const bulkImportModal = document.getElementById("bulkImportModal");

  const bulkImportFileInput = bulkImportModal.querySelector(
    'input[name="bulkImportFile"]'
  );
  const readFileButton = bulkImportModal.querySelector("#readFileButton");
  const clearInputButton = bulkImportModal.querySelector("#clearInputButton");
  const fileDisplay = bulkImportModal.querySelector("#fileDisplay");
  const bulkImportOkButton = bulkImportModal.querySelector(
    "#bulkImportOkButton"
  );

  const addSingleButton = document.getElementById("add-single");
  const addAccountModal = document.getElementById("addAccountModal");
  const cancelAddAccountButton = document.getElementById(
    "cancelAddAccountButton"
  );

  const tweetCheckbox = document.querySelector("input[name='tweeting']");
  const retweetCheckbox = document.querySelector("input[name='retweeting']");
  const likeCheckbox = document.querySelector("input[name='liking']");
  const mentionCheckbox = document.querySelector("input[name='mentioning']");

  const directMessageCheckbox = document.querySelector(
    "input[name='directMessaging']"
  );
  const followCheckbox = document.querySelector("input[name='following']");
  const unfollowCheckbox = document.querySelector("input[name='unfollowing']");

  const tweetInput = document.querySelector("input[name='tweeting']");
  const retweetInput = document.querySelector("input[name='retweets']");
  const likeInput = document.querySelector("input[name='likes']");
  const mentionInput = document.querySelector("input[name='mentions']");
  const directMessageInput = document.querySelector(
    "input[name='directMessages']"
  );
  const followInput = document.querySelector("input[name='follows']");
  const unfollowInput = document.querySelector("input[name='unfollows']");

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

  createTableHeader(accountColumnNames);

  getAllAccounts()
    .then(function (accounts) {
      loadAllAccountsDatas(accounts);
    })
    .catch(function (error) {
      alert(error);
    });

  // Code to be executed after the DOM has loaded
  $(".ui.toggle.button").click(function () {
    $(".mobile.only.grid .ui.vertical.menu").toggle(100);
  });

  const menuItems = document.querySelectorAll(".ui.vertical.menu .item");

  menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      menuItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });
      item.classList.add("active");

      if (event.target.textContent === "Accounts") {
        removeTable();

        createTableHeader(accountColumnNames);
      } else if (event.target.textContent === "Groups") {
        removeTable();

        createTableHeader(groupColumnNames);
        renderGroups();
      } else if (event.target.id === "tasks") {
        removeTable();

        createTableHeader(taskColumnNames);

        renderAllTaskTables(tasks);
      }
    });
  });

  tweetCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      console.log("pressed");
      tweetInput.classList.remove("hidden");
    } else {
      tweetInput.classList.add("hidden");
    }
  });

  retweetCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      retweetInput.classList.remove("hidden");
    } else {
      retweetInput.classList.add("hidden");
    }
  });

  likeCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      likeInput.classList.remove("hidden");
    } else {
      likeInput.classList.add("hidden");
    }
  });

  mentionCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      mentionInput.classList.remove("hidden");
    } else {
      mentionInput.classList.add("hidden");
    }
  });

  directMessageCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      directMessageInput.classList.remove("hidden");
    } else {
      directMessageInput.classList.add("hidden");
    }
  });

  followCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      followInput.classList.remove("hidden");
    } else {
      followInput.classList.add("hidden");
    }
  });

  unfollowCheckbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      unfollowInput.classList.remove("hidden");
    } else {
      unfollowInput.classList.add("hidden");
    }
  });

  // Get all the edit buttons and add event listeners to trigger the editTask function
  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.dataset.id;
      editTask(taskId);
    });
  });

  // Get all the delete buttons and add event listeners to trigger the deleteTask function
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.dataset.id;
      deleteTask(taskId);
    });
  });

  updateTableRowCount();

  $("#taskManagerButton").click(function () {
    $("#taskManagerModal").modal("show");

    $("#cancelTaskButton").click(function () {
      $("#taskManagerModal").modal("hide");
    });
  });

  $("#addTaskButton").click(function () {
    addTask();

    removeTable();
    createTableHeader(taskColumnNames);

    renderAllTaskTables(tasks);
  });

  addSingleButton.addEventListener("click", () => {
    addAccountModal.classList.add("active");
  });

  cancelAddAccountButton.addEventListener("click", () => {
    addAccountModal.classList.remove("active");
  });

  addAccountModal.addEventListener("click", (event) => {
    if (event.target === addAccountModal) {
      addAccountModal.classList.remove("active");
    }
  });

  $("#addAccountButton").click(function () {
    saveAccountData();
  });
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

  clearInputButton.addEventListener("click", () => {
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
    // Read file line by line and add to a list
    const file = bulkImportFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const contents = reader.result;
      const lines = contents.split("\n");
      const list = [];
      for (const line of lines) {
        if (line.trim() !== "") {
          list.push(line.trim());
        }
      }
      console.log(list);
    };
    reader.readAsText(file);

    bulkImportModal.classList.remove("active");
    document.body.classList.remove("modal-open");
    bulkImportFileInput.value = "";
    fileDisplay.value = "";
  });

  addGroupButton.addEventListener("click", () => {
    addGroupModal.style.display = "block";
    addGroupModal.classList.add("active");

    document.body.classList.add("modal-open");
  });

  addGroupBtn.addEventListener("click", () => {
    addGroup();
  });

  $("#cancelAddGroupButton").click(function () {});
});

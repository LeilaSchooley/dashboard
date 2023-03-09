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

const groupColumnNames = ["Group", "Settings", "Actions"];
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

const tasks = [
  {
    group: "Group A",
    account: "Account 1",
    task: "Tweet",
    status: "Pending",
  },
  {
    group: "Group B",
    account: "Account 2",
    task: "Retweet",
    status: "Completed",
  },
  {
    group: "Group A",
    account: "Account 3",
    task: "Follow",
    status: "Pending",
  },
];

const taskColumnNames = ["Group", "Account", "Task", "Status", "Actions"];

function updateTableRowCount() {
  const tbody = document.querySelector("tbody");
  const rowCount = tbody.querySelectorAll("tr").length;

  $("h1").text(`Accounts: ${rowCount}`);
}

function removeTable() {
  const tableBody = document.querySelector("tbody");
  const tableHeader = document.querySelector("thead");
  if (tableBody) {
    tableBody.innerHTML = "";
  }
  if (tableHeader) {
    tableHeader.innerHTML = "";
  }
}

$(document).ready(async function () {
  // await addTableHeader();
  createTableHeader(accountColumnNames);

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
      } else if (event.target.id === "tasks") {
        removeTable();

        createTableHeader(taskColumnNames);

        createTaskTable(tasks);
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

  //await loadAccountData();

  updateTableRowCount();

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
});

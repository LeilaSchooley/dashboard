function addTask() {
  const taskName = $('input[name="taskName"]').val();
  const tweeting = $('input[name="tweeting"]').is(":checked");
  const retweeting = $('input[name="retweeting"]').is(":checked");
  const liking = $('input[name="liking"]').is(":checked");
  const replying = $('input[name="replying"]').is(":checked");
  const mentioning = $('input[name="mentioning"]').is(":checked");
  const directMessaging = $('input[name="directMessaging"]').is(":checked");
  const hashtagging = $('input[name="hashtagging"]').is(":checked");
  const following = $('input[name="following"]').is(":checked");
  const unfollowing = $('input[name="unfollowing"]').is(":checked");
  const blocking = $('input[name="blocking"]').is(":checked");
  const reporting = $('input[name="reporting"]').is(":checked");

  console.log("Task Name:", taskName);
  console.log("Tweeting:", tweeting);
  console.log("Retweeting:", retweeting);
  console.log("Liking:", liking);
  console.log("Replying:", replying);
  console.log("Mentioning:", mentioning);
  console.log("Direct Messaging:", directMessaging);
  console.log("Hashtagging:", hashtagging);
  console.log("Following:", following);
  console.log("Unfollowing:", unfollowing);
  console.log("Blocking:", blocking);
  console.log("Reporting:", reporting);
  // Add task to the task list
  // ...
}


function createTaskTable(tasks) {
  // Get a reference to the table element
  const table = document.querySelector('table');

  // Clear any existing rows from the table
  table.innerHTML = '';

  // Create the table header element
  const tableHeader = document.createElement('thead');

  // Create the table header row element
  const tableHeaderRow = document.createElement('tr');

  // Create the table header cells (th) and add text content
  const groupCell = document.createElement('th');
  groupCell.textContent = 'Group';
  const accountCell = document.createElement('th');
  accountCell.textContent = 'Account';
  const taskCell = document.createElement('th');
  taskCell.textContent = 'Task';
  const statusCell = document.createElement('th');
  statusCell.textContent = 'Status';
  const actionsCell = document.createElement('th');
  actionsCell.textContent = 'Actions';

  // Append the table header cells to the table header row
  tableHeaderRow.appendChild(groupCell);
  tableHeaderRow.appendChild(accountCell);
  tableHeaderRow.appendChild(taskCell);
  tableHeaderRow.appendChild(statusCell);
  tableHeaderRow.appendChild(actionsCell);

  // Append the table header row to the table header
  tableHeader.appendChild(tableHeaderRow);

  // Create the table body element
  const tableBody = document.createElement('tbody');

  // Loop through the tasks array and create a table row for each task
  tasks.forEach(task => {
    // Create a table row element
    const tableRow = document.createElement('tr');

    // Create the table cells (td) and add text content
    const groupCell = document.createElement('td');
    groupCell.textContent = task.group;
    const accountCell = document.createElement('td');
    accountCell.textContent = task.account;
    const taskCell = document.createElement('td');
    taskCell.textContent = task.task;
    const statusCell = document.createElement('td');
    statusCell.textContent = task.status;
    const actionsCell = document.createElement('td');
    // Add action buttons to the actions cell
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      // Call the editTask function and pass the task object as an argument
      editTask(task);
    });
    actionsCell.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Call the deleteTask function and pass the task object as an argument
      deleteTask(task);
    });
    actionsCell.appendChild(deleteButton);

    // Append the table cells to the table row
    tableRow.appendChild(groupCell);
    tableRow.appendChild(accountCell);
    tableRow.appendChild(taskCell);
    tableRow.appendChild(statusCell);
    tableRow.appendChild(actionsCell);

    // Append the table row to the table body
    tableBody.appendChild(tableRow);
  });

  // Append the table header and body to the table element
  table.appendChild(tableHeader);
  table.appendChild(tableBody);
}


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

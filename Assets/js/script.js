// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  
// Get the current date and time using the Day.js library
const today = dayjs();

// Reference the container element that holds the time blocks
const timeBlockEl = document.querySelector('.container');

// Function to update the current date and time display
function updateCurrentTime() {
  // Update the element with id "currentDay" to display the current date and time
  $('#currentDay').text(dayjs().format('MMMM D, YYYY, hh:mm A'));
}

// Call the updateCurrentTime function to initially display the current date and time
updateCurrentTime();

// Set up an interval to update the current date and time every minute
setInterval(updateCurrentTime, 60000);

// Event listener for the save button click
$('.saveBtn').on('click', function () {
  // Get the value of the description from the sibling element with class "description"
  const textValue = $(this).siblings('.description').val();
  // Get the id attribute of the parent div element (time block)
  const timeKey = $(this).parent().attr('id');

  // Save the description text in local storage with the time block id as the key
  localStorage.setItem(timeKey, textValue);
});

// Retrieve tasks from local storage and populate the description fields
$('.time-block').each(function () {
  // Get the id attribute of the current time block
  const timeId = $(this).attr('id');

  // Set the value of the description field from local storage based on the time block id
  $(this).find('.description').val(localStorage.getItem(timeId));
});

// Function to update the colors of time blocks based on their relation to the current time
function auditTask() {
  // Get the current hour
  const currentHour = today.hour();

  // Loop through each time block
  $('.time-block').each(function () {
    // Extract the hour from the time block id
    const timeId = parseInt($(this).attr('id').split("hour")[1]);

    // Check if the time block is in the past, present, or future relative to the current hour
    if (timeId < currentHour) {
      $(this).addClass('past'); // Add the "past" class
    } else if (timeId === currentHour) {
      $(this).removeClass('past'); // Remove "past" class
      $(this).removeClass('future'); // Remove "future" class
      $(this).addClass('present'); // Add the "present" class
    } else {
      $(this).removeClass('past'); // Remove "past" class
      $(this).removeClass('present'); // Remove "present" class
      $(this).addClass('future'); // Add the "future" class
    }
  });
}

// Call the auditTask function to update time block colors
auditTask();

// Use setTimeout to reload the page every minute (refreshes the current time display)
setTimeout(function () {
  location = '';
}, 1000 * 60);

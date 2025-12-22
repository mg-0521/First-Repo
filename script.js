/**
 * Personal Portfolio Website - JavaScript Functionality
 * This script handles tab switching, mobile menu toggle, and contact form submission
 */

// ============================================================================
// TAB SWITCHING FUNCTIONALITY
// ============================================================================

// Get all tab links and tab content elements
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

/**
 * Opens a specific tab and updates the active state
 * @param {string} tabname - The ID of the tab content to display
 */
function opentab(tabname) {
  // Remove 'active-link' class from all tab links
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  
  // Remove 'active-tab' class from all tab contents
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  
  // Add 'active-link' class to the clicked tab link
  event.currentTarget.classList.add("active-link");
  
  // Add 'active-tab' class to the selected tab content
  document.getElementById(tabname).classList.add("active-tab");
}

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================

// Get the side menu element
var sidemenu = document.getElementById("sidemenu");

/**
 * Opens the mobile menu by setting right position to 0
 */
function openmenu() {
  sidemenu.style.right = "0";
}

/**
 * Closes the mobile menu by setting right position to -200px
 */
function closemenu() {
  sidemenu.style.right = "-200px";
}

// ============================================================================
// CONTACT FORM SUBMISSION
// ============================================================================

// Google Apps Script URL for form submission
// NOTE: Replace this with your actual Google Apps Script deployment URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxH348z3O_D8OjIsFbP1s4AdEqKcRvLyAi7l2B29db_JpoV59WUwyLOrEeeeMrjcYaVjA/exec';

// Get the contact form and message display element
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

// Add submit event listener to the form
form.addEventListener('submit', e => {
  // Prevent default form submission behavior
  e.preventDefault();
  
  // ==========================================
  // PREPARE UI FOR SUBMISSION
  // ==========================================
  
  // Get the submit button and store its original text
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  // Update button to show loading state
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;
  
  // ==========================================
  // SEND FORM DATA TO GOOGLE SHEETS
  // ==========================================
  
  fetch(scriptURL, { 
    method: 'POST', 
    body: new FormData(form) // Send form data
  })
  .then(response => {
    // ==========================================
    // SUCCESS HANDLING
    // ==========================================
    
    // Display success message
    msg.innerHTML = "Message sent successfully!";
    msg.style.color = "green";
    msg.style.display = "block";
    
    // Clear form fields
    form.reset();
    
    // Reset button to original state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Hide message after 5 seconds
    setTimeout(() => {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 5000);
  })
  .catch(error => {
    // ==========================================
    // ERROR HANDLING
    // ==========================================
    
    // Display error message
    msg.innerHTML = "Error sending message";
    msg.style.color = "red";
    msg.style.display = "block";
    
    // Log error to console for debugging
    console.error('Form submission error:', error.message);
    
    // Reset button to original state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Hide error message after 5 seconds
    setTimeout(() => {
      msg.innerHTML = "";
      msg.style.display = "none";
    }, 5000);
  });
});


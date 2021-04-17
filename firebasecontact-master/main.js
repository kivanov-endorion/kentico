// Initialize Firebase (ADD YOUR OWN DATA)
var firebaseConfig = {
  apiKey: "AIzaSyBcYi6OaemaCVDgCXYKgEjsbCq8FNkNaro",
  authDomain: "contactform-28606.firebaseapp.com",
  databaseURL: "https://contactform-28606-default-rtdb.firebaseio.com",
  projectId: "contactform-28606",
  storageBucket: "contactform-28606.appspot.com",
  messagingSenderId: "944743837474",
  appId: "1:944743837474:web:1ec5f7f8c76694351dbf7b",
  measurementId: "G-J4CN053Q2W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var menu = getInputVal('menu');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, menu, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, menu, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    menu:menu,
    message:message
  });
}
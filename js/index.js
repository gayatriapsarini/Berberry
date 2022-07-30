// Your web app's Firebase configuration
// var firebaseConfig = 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN2eDokFN6CkZnKTABGMfyJSdxAuGLBVU",
  authDomain: "project-android-ed396.firebaseapp.com",
  databaseURL: "https://project-android-ed396-default-rtdb.firebaseio.com",
  projectId: "project-android-ed396",
  storageBucket: "project-android-ed396.appspot.com",
  messagingSenderId: "790400793981",
  appId: "1:790400793981:web:78cfb4cf5f4b5ff080a014",
  measurementId: "G-Z60VGM7P0D"
};
  
  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()

  const logoutBtn = document.querySelector(".tombol-grey");

  //Session control
  window.onload = function () {
    console.log('window - onload');

    // Initialize variables

    //manggil fungsi logoutnya
    logout();

    //manggil onAuthStateChanged dari firebase auth
    auth.onAuthStateChanged(function(user) { //parameternya juga user
      //kalo si user ada/udah login, bakal dikasih alert
      if (user) {
        alert("Hello!");
      } else { //misal belum login/si user gak ada, dia bakal dibalikkin ke login
        alert("You need to login first")
        location.href = "/login.html"
      }
    });
};

//fungsi logout disini
  function logout () {
    //kasih event listener setiap diclick bakal logout
    logoutBtn.addEventListener("click", (e) => {
      alert("You will sign out")
      //ini sesinya langsung diapus karena si user logout
      auth.signOut();
    })
  }
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
   
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false ) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
      
      // DOne
      alert('User Created!!')
      location.href = "/login.html"
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
      location.href = "/home.html"
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
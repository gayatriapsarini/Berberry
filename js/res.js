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
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()

  const noid = document.getElementById('noid');
  const urname = document.getElementById('urname');
  const item = document.getElementById('item');
  const email = document.getElementById('email');
  const notlp = document.getElementById('notlp');
  const alamat = document.getElementById('alamat');
  const addBtn = document.getElementById('addBtn');
  const updateBtn = document.getElementById('updateBtn');
  const removeBtn = document.getElementById('removeBtn');
  const showBtn = document.getElementById('showBtn');
  
  const database = firebase.database();
  const resRef = database.ref('/reseller');
  addBtn.addEventListener('click', e => {
      e.preventDefault();
      resRef.child(noid.value).set({
          urname: urname.value,
          item: item.value,
          email: email.value,
          notlp: notlp.value,
          alamat: alamat.value
      });

      database_ref.child('reseller/' + user.uid).set(resRef)
      
      // DOne
      location.href = "/joinReseller.html"
  });
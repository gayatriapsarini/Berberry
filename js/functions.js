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
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
//   const auth = firebase.auth()

const userId = document.getElementById('userId');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const removeBtn = document.getElementById('removeBtn');
const showBtn = document.getElementById('showBtn');
const table = document.getElementById("tabel-data").getElementsByTagName('tbody')[0];

const database = firebase.database();
const resRef = database.ref('/reseller');
addBtn.addEventListener('click', e => {
    e.preventDefault();
    resRef.child(userId.value).set({
        user_id: userId.value,
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value
    });
    location.reload();
});

updateBtn.addEventListener('click', e => {
    e.preventDefault();
    const newData = {
        user_id: userId.value,
        first_name: firstName.value,
        last_name: lastName.value,
        age: age.value
    };
    resRef.child(userId.value).update(newData);
    location.reload();
});

removeBtn.addEventListener('click', e => {
    e.preventDefault();
    resRef.child(userId.value).remove()
        .then(() => {
            console.log('User Deleted!');
        })
    .catch(error => {
        console.error(error);
    });
    location.reload();
})

var nomorBaris = 0;

resRef.on("child_added", function (data) {
    
    const resUser = data.val();

    const row = table.insertRow(table.rows.length);

    const td1 = row.insertCell(0);
    const td2 = row.insertCell(1);
    const td3 = row.insertCell(2);
    const td4 = row.insertCell(3);
    const td5 = row.insertCell(4);

    td1.innerHTML = ++nomorBaris;
    td2.innerHTML = resUser.user_id;
    td3.innerHTML = resUser.first_name;
    td4.innerHTML = resUser.last_name;
    td5.innerHTML = resUser.age;
});
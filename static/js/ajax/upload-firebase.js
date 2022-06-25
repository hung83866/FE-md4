// copy firebase
const firebaseConfig = {
    apiKey : "AIzaSyBEBxi6CbgqOtGgXSNgwrvirf9xqW02LnE" ,
    authDomain : "hoanghungmanh1.firebaseapp.com" ,
    projectId : "hoanghungmanh1" ,
    storageBucket : "hoanghungmanh1.appspot.com" ,
    messagingSenderId : "970834550842" ,
    appId : "1:970834550842:web:dc94968d3c4d704fb71503" ,
    measurementId : "G-XGV046YT96"
};

// Don't Edit
firebase.initializeApp(firebaseConfig);

var image = '';
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = 'images';

// get elements
var fileButton = document.getElementById('fileButton');

// listen for file selection
function upload(e) {

    // what happened
    console.log('file upload event');
    console.log(e);

    // get file
    var file = e.target.files[0];

    // create a storage ref
    var storageRef = firebase.storage().ref(`${fbBucketName}/${file.name}`);

    // upload file
    var uploadTask = storageRef.put(file);

    // The part below is largely copy-pasted from the 'Full Example' section from
    // https://firebase.google.com/docs/storage/web/upload-files

    // update progress bar
    var uploader = document.getElementById('uploader');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            // save this link somewhere, e.g. put it in an input field
            var downloadURL = uploadTask.snapshot.downloadURL;
            image = downloadURL;
            console.log('downloadURL ===>', downloadURL);
            let divLocation = document.getElementById("imgDiv"); // sua id hien anh
            let divLocation1 = document.getElementById("newA"); // sua id hien anh
            let divLocation2 = document.getElementById("changeAvatar"); // sua id hien anh
            let imgElement = document.createElement("img");
            imgElement.src = downloadURL
            imgElement.width = 200;
            imgElement.height = 200;
            console.log('pic ==', downloadURL)
            divLocation.append(imgElement);
            divLocation1.append(imgElement);
            divLocation2.append(imgElement);
        });

}

function resultImage() {
    console.log('image resulte -->', image)
    return image;
}

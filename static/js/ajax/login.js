function login() {
    let username = $('#username').val();
    let password = $('#password').val();
    let userInfo = {
        username: username,
        password: password
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/auth/signin",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(userInfo),
        success: function (data) {
            console.log("hello anh em")
            console.log(data.id)
            localStorage.setItem("iduser", data.id)
            localStorage.setItem("token", data.token)
            window.open("newsfeed.html", "_self")
            if (data.status == 202) {
                window.location.href = '404-2.html';
            }
        },
        error: function (){
            window.location.href = "404-2.html"
        }
    })
}

function changPass(pass,username) {
    let userInfo = {
        username: username,
        password:pass
    };
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/auth/new-password",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(userInfo),
        success: function (data) {
            window.open("login.html","_self")
            alert("Password changed!")
        },
        error: function (){
            window.location.href = "404-2.html"
        }
    })
}

function PasswordCheck(){
    let username = $('#usernameQ').val();
    let phone = $('#phoneQ').val();
    let email = $('#emailQ').val();
    let userInfo = {
        phone: phone,
        email:email
    };
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/api/auth/forgot-password/"+username,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(userInfo),
        success: function (data) {
            if (data.message=="yes"){
                let pass = prompt("Enter new password:")
                changPass(pass,username)
            }else {
                window.open("login.html","_self")
                alert("error!")
            }
        },
        error: function (){
            window.location.href = "404-2.html"
        }
    })
}



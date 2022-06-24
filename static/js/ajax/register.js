function register() {
    let name = $('#name').val();
    let username = $('#username1').val();
    let phone = $('#phone').val();
    let email = $('#email').val();
    let password = $('#password1').val();
    let birthday = $('#birthday').val();
    let roles = ["user"];
    let userInfo = {
        name: name,
        username: username,
        email: email,
        password: password,
        phone: phone,
        birthday:birthday,
        roles:roles
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/auth/signup",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(userInfo),
        success: function (data) {
            window.open("login.html", "_self")
        },
        error: function (){
            window.location.href = "404-2.html"
        }
    })
}




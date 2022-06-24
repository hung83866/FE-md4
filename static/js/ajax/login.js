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
            localStorage.setItem("accountId", data.id)
            localStorage.setItem("token", data.token)
            window.open("mypage.html", "_self")
            if (data.status == 202) {
                window.location.href = '404-2.html';
            }
        },
        error: function (){
            window.location.href = "404-2.html"
        }
    })
}




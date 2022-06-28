function login1(id){
    let str3 = ""
    let str4 = ""
    let name = ""
    let avatar = ""
    let image = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + id,
        success: function (data) {
            str3 = `<img src="${data.avatar}" alt="avatar"> `
            str4 = `<img style="margin-left: 20px;margin-right: 50px" src="${data.image}" alt="avatar" > `
            name = `<h2 style="color: #2a62bc">${data.name}</h2>`
            avatar = `<img src="${data.avatar}" alt="avatar" height="200px" width="200px"> `
            image = `<img src="${data.image}" alt="avatar" height="200px" width="200px"> `
            document.getElementById("avatarU2").innerHTML = str3
            document.getElementById("avatarU3").innerHTML = str4
            document.getElementById("nameUser").innerHTML = name
            document.getElementById("avatar").innerHTML = avatar
            document.getElementById("image").innerHTML = image
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}
function login2(){
    let str1 = ""
    let name = ""
    let id = +parseInt(window.localStorage.getItem("iduser"));
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + id,
        success: function (data) {
            str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            name = `<a onclick="myPage()" href="#" title="" style="width: 200px; text-align: left; margin-left: 5px">${data.name}</a>`
            document.getElementById("avatarU").innerHTML = str1

        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}function newsfeed(){
    window.open("newsfeed.html","_self")
}

function profile1(id){
    let str=""
    let name=""

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/+`+id,
        success: function (data) {
            console.log(data)
            str=`<div class="widget">
                                        <h4 class="widget-title">Profile</h4>
                                        <ul class="naves">
                                            <li>
                                                <i class="ti-clipboard"></i>
                                                <a>${data.username}</a>
                                            </li>
                                            <li>
                                                <i class="ti-music"></i>
                                                <a>${data.phone}</a>
                                            </li>
                                            <li>
                                                <i class="ti-email"></i>
                                                <a>${data.email}</a>
                                            </li>
                                            <li>
                                                <i class="ti-comments-smiley"></i>
                                                <a>${data.interests}</a>
                                            </li>
                                           
                                            <li>
                                                <i class="ti-home"></i>
                                                <a>${data.address}</a>
                                            </li>
                                            <li>
                                                <i class="ti-user"></i>
                                                <a>${data.sex}</a>
                                            </li>
                                            <li>
                                                <i class="ti-user"></i>
                                                <a>${data.birthday}</a>
                                            </li>
                                        </ul>
                                    </div><!-- Shortcuts -->
                                    <div class="widget stick-widget">
                                        <h4 class="widget-title">Image</h4>
                                        <ul id="non-friend-list" class="followers">

                                        </ul>
                                    </div>`
            name= `<h2 style="color: #2a62bc">${data.name}</h2>`
            document.getElementById("profile").innerHTML = str;
            document.getElementById("nameUser").innerHTML = name;
        },
        error: function (){
            console.log("sai!")
        }

    })


}

function postList1(id) {
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/view/` + id,
        success: function (data) {
            for (let i = data.length - 1; i > 0; i--) {
                str += `

<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-start align-items-center">
                        <div style="width: 100px"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="70"
                                 height="70" /></div>
                            
                            <div style="width: 400px">
                                <h5 class="fw-bold text-primary mb-1">${data[i].userPost.username}</h5>
                               
                                    <p>status : ${data[i].status}</p>
                                    <p>time : ${data[i].time}</p>
                                    <p>${data[i].video}</p>
                              
                              
                            
                            </div>
                        </div>
                        

                        <h5 class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </h5>
                        <img src="${data[i].imageFile}" alt="">
                        <div class="small d-flex justify-content-start">
                            <div style="width: 180px;height: 30px ;text-align: center;margin-top: 10px">
                                <a href="#!" >
                                    <i onclick="notice1(${data[i].idPost})"  class="far fa-thumbs-up me-2"></i>
                                    <p onclick="notice1(${data[i].idPost},)" style="text-align: center">Like</p>
                                </a>
                            </div>
                            
                            <div style="width: 180px;height: 30px ; text-align: center;margin-top: 10px">
                                <a href="#!">
                                    <i onclick="showComment(${data[i].idPost})" class="far fa-comment-dots me-2"></i>
                                    <p onclick="showComment(${data[i].idPost})" class="mb-0">Comment</p>
                                </a>
                            </div>
                            <div style="width: 180px;height: 30px; text-align: center;margin-top: 10px">
                                <a href="#!" >
                                    <i class="fas fa-share me-2"></i>
                                    <p class="mb-0">Share</p>
                                </a>
                            </div>       
                        </div>
                    </div>
                    <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                        <div class="d-flex flex-start w-100">
                            <div>
                            <img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="40"
                                 height="40" />
</div>
                            <div style="float: right;width: 70%" class="form-outline w-100">
                <textarea placeholder="Comment here.."  class="form-control" id="textAreaExample" rows="4"
                          style="background: #fff; height: 50px;border-radius: 50px"></textarea>
                             
                            </div>
                        </div>
                        <div class="float-end mt-2 pt-1">
                            <button type="button" class="btn btn-primary btn-sm">Post comment</button>
                            <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
            }
            document.getElementById("showPost").innerHTML = str;
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}
function logout() {
    window.localStorage.setItem("iduser",0)
    window.localStorage.setItem("token","")
    window.open("login.html","_self")
}
function listFriendUser() {
    let id = +parseInt(window.localStorage.getItem("iduser"));
    let avatarFriend = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/list`,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                if (id==data[i].id){
                    avatarFriend+="";
                }else

                avatarFriend += `<figure>
                                                <a  href="#" title="" ><img  style="border-radius: 100%;height: 60px;width: 60px" src="${data[i].avatar}" alt=""></a>
                                            </figure>
                                            <div class="page-meta">
                                                <a href="#" title="" class="underline">${data[i].name}</a>
                                            </div>
                                            <div class="page-likes">
                                                <ul class="nav nav-tabs likes-btn">
                                                    <li class="nav-item"><a class="active" href="#link1" data-toggle="tab">Inbox</a></li>
                                                    <li class="nav-item"><a class="" href="#link2" data-toggle="tab">views</a></li>
                                                </ul>
                                                <!-- Tab panes -->

                                            </div>`
            }
            document.getElementById("friendList").innerHTML = avatarFriend
        },


        error: function () {
            console.log("sai o dau do")
        }
    })
}

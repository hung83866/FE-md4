function addUser() {
    let idUser = localStorage.getItem("accountId");

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/users/find/${idUser}`,
        success: function (user) {
            document.getElementById("imageNavbar").innerHTML = `<img src="${user.imgUrl}" style="width: 32px; height: 32px;border-radius: 100%" alt="">`
            document.getElementById("imagePost").innerHTML = `<img src="${user.imgUrl}" style="width: 60px; height: 60px;border-radius: 100%" alt="">`
            // document.getElementById("imageComment").innerHTML = `<img src="${user.imgUrl}" alt="">`
        }
    })
}


function postNewsfeed() {
    let idUser = localStorage.getItem("accountId");

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/post/${idUser}/newsfeed`,

        success: function (posts) {
            let content = "";
            for (let i = posts.length - 1; i >= 0; i--) {
                content += postDetail(posts[i]);
            }

            // for (let i = 0; i < posts.length; i++) {
            //     content += postDetail(posts[i]);
            // }
            document.getElementById('postInNewsfeed').innerHTML = content;
        }
    })
    event.preventDefault()
}

function postDetail(post) {
    let idUser = localStorage.getItem("accountId");

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/like-post/${post.idPost}/${idUser}/showLike`,

        success: function (like) {
            document.getElementById(`likePost(${post.idPost})`).innerText = like
        }
    })

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/comment/${post.idPost}/list-comment`,

        success: function (comments) {
            let content = ""
            if (comments != null) {
                for (let i = 0; i < comments.length; i++) {
                    content += `<li><div class="comet-avatar"><img src="${comments[i].user.imgUrl}" style="width: 45px; height: 45px; border-radius: 100%" alt="">
                                </div>
                                <div class="we-comment">
                                <div class="coment-head">
                                    <h5><a href="../time-line.html" title="">${comments[i].user.fullName}</a></h5>
                                    <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
                                </div>
                                <p>${comments[i].content}</p>
                                </div>`
                    if (comments[i].comment != null) {
                        content += `<ul>
                                <li>
                                    <div class="comet-avatar">
                                    <img src="${comments[i].comment.user.imgUrl}" style="width: 45px; height: 45px; border-radius: 100%" alt="">
                                    </div>
                                    <div class="we-comment">
                                        <div class="coment-head">
                                            <h5><a href="../time-line.html" title="">${comments[i].comment.user.fullName}</a></h5>
                                        </div>
                                        <p>${comments[i].comment.content}</p>
                                    </div>
                                </li>
                                </ul>`
                    }
                    content += `<li class="post-comment" hidden>
                        <div class="comet-avatar">
                            
                        </div>
                        <div class="post-comt-box">
                            <form method="post">
                                <textarea name="" id="" placeholder="Reply comment"></textarea>
                                <div class="add-smiles">
                                    <a href="#" onclick=""><i class="fa fa-paper-plane" style=" color: blue" title="REPLY"></i></a>
                                </div>
                            </form>
                        </div>
                    </li>`
                    content += `</li>`

                }
                content += `<li>
                        <a href="#" title="" class="showmore underline">more comments</a>
                    </li>
                    <li class="post-comment">
                        <div class="comet-avatar" id="imageComment">
                            
                        </div>
                        <div class="post-comt-box">
                            <form method="post">
                                <textarea name="commentContent" id="commentContent(${post.idPost})" placeholder="Post your comment"></textarea>
                                <div class="add-smiles">
                                    <a href="#" onclick="commentInPost(${post.idPost})"><i class="fa fa-paper-plane" style=" color: blue" title="SEND"></i></a>
                                </div>
                            </form>
                        </div>
                    </li>`
                document.getElementById(`commentPost(${post.idPost})`).innerHTML = content;
            }
        }
    })

    return `<div class = "central-meta item" >
            <div class = "user-post">
            <div class = "friend-info" >
            <figure><img src="${post.userPost.imgUrl}" style="width: 40px; height: 40px; border-radius: 100%" alt=""></figure>
            <div class="friend-name">
            <ins><a href="time-line.html" onclick="getTimeLine(${idUser},${post.userPost.idUser})" title="${post.userPost.fullName}">${post.userPost.fullName}</a></ins></div>
            <div class="post-meta">
                <img src="${post.imgUrl}" alt="">
                    <div class="description">
                        <p>${post.content}</p>
                    </div>
                    <div class="we-video-info">
                        <ul>
                            <li>
                            <a href="#" onclick="likePost(${post.idPost})">
                                <span class="like" data-toggle="tooltip" title="like">
                                    <i class="ti-heart"></i>
                                    <ins id="likePost(${post.idPost})"></ins>
                                </span></a>
                            </li>
                        </ul>
                    </div>
            </div>
            </div>
    <div class="coment-area">
        <ul class="we-comet" id="commentPost(${post.idPost})">
            
        </ul>
    </div>
</div>
</div>`
}

function likePost(idPost) {
    let idUser = localStorage.getItem("accountId");

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/like-post/${idPost}/${idUser}/checkLike`,

        success: function (like) {
            document.getElementById(`likePost(${idPost})`).innerText = like
        }
    })
    event.preventDefault();
}

function getFriendList() {
    let idUser = localStorage.getItem("accountId");
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/users/${idUser}/friend-list`,

        success: function (users) {
            let content = "";
            for (let i = 0; i < users.length; i++) {
                content += `<li>
                    <figure>
                        <img src="${users[i].imgUrl}" alt="">
                            <span class="status f-online"></span>
                    </figure>
                    <div class="friendz-meta">
                        <a href="../time-line.html">${users[i].fullName}</a>
                        <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__"
                              data-cfemail="f2859b9c869780819d9e969780b2959f939b9edc919d9f">[email&#160;protected]</a></i>
                    </div>
                </li>`
            }
            document.getElementById("people-list").innerHTML = content;
        }
    })
}

function getNonFriend() {
    let idUser = localStorage.getItem("accountId");
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/users/${idUser}/non-friend-list`,

        success: function (users) {
            let content = "";
            for (let i = 0; i < users.length; i++) {
                content += `<li>
                    <figure><img src="${users[i].imgUrl}" alt=""></figure>
                    <div class="friend-meta">
                        <h4><a href="time-line.html" onclick="getTimeLine(${idUser}, ${users[i].idUser})" title="">${users[i].fullName}</a></h4>
                        <a href="#" title="" class="underline">Add Friend</a>
                    </div>
                </li>`
            }
            document.getElementById("non-friend-list").innerHTML = content;
        }
    })
}

function getTimeLine(idUser, idFriend) {
    localStorage.setItem("accountFriend", idFriend);
    window.open("time-line.html", "_blank");
    event.preventDefault();
}

function getTimelineFriend() {
    let idUser = localStorage.getItem("accountId");
    window.open("timeline-friends.html", "_blank");
    event.preventDefault();
}

function getMyTimeLine() {
    let idUser = localStorage.getItem("accountId");
    localStorage.setItem("accountFriend", idUser);
    window.open("time-line.html", "_blank");
    event.preventDefault();
}
function login(){
    let idUser = +parseInt(window.localStorage.getItem("iduser"));
    let str1 = ""
    let str2 = ""
    let str3 = ""
    let str4 = ""
    let name = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {
            str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            str2 = `<img src="${data.avatar}" alt="avatar" height="60px" width="60px" style="border-radius: 100%"> `
            str3 = `<img src="${data.avatar}" alt="avatar" > `
            str4 = `<img style="margin-left: 20px;margin-right: 50px" src="${data.image}" alt="avatar" > `
            name = `<h1 style="color: #2a62bc">${data.name}</h1>`
            document.getElementById("avatarU").innerHTML = str1
            document.getElementById("avatarU1").innerHTML = str2
            document.getElementById("avatarU2").innerHTML = str3
            document.getElementById("avatarU3").innerHTML = str4
            document.getElementById("nameU").innerHTML = name
            console.log(data.image)
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}
function edit1(){
    let idUser = +parseInt(window.localStorage.getItem("iduser"));

    let str3 = ""
    let str4 = ""
    let name = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {

            str3 = `<img src="${data.avatar}" alt="avatar" > `
            str4 = `<img style="margin-left: 20px;margin-right: 50px" src="${data.image}" alt="avatar" > `
            name = `<h1 style="color: #2a62bc">${data.name}</h1>`

            document.getElementById("avatarU2").innerHTML = str3
            document.getElementById("avatarU3").innerHTML = str4
            document.getElementById("nameU1").innerHTML = name
            console.log(data.image)
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}

function editform(){
    let idUser = +parseInt(window.localStorage.getItem("iduser"));

    let str= ""

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {

            str = `
\t\t\t\t\t\t\t\t<div class="central-meta">
\t\t\t\t\t\t\t\t\t<div class="editing-info">
\t\t\t\t\t\t\t\t\t\t<h5 class="f-title"><i class="ti-info-alt"></i> Edit Basic Information</h5>

\t\t\t\t\t\t\t\t\t\t<form method="post">
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group half">\t
\t\t\t\t\t\t\t\t\t\t\t  <input type="text" id="name" value="${data.name}" required="required"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input">full Name</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group half">\t
\t\t\t\t\t\t\t\t\t\t\t  <input type="date" id="birthday" value="${data.birthday}"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input">Birthday</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">\t
\t\t\t\t\t\t\t\t\t\t\t  <input type="email" id="email" value="${data.email}" required="required"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input"><a href="https://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="4b0e262a22270b">Email</a></label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">\t
\t\t\t\t\t\t\t\t\t\t\t  <input type="text" value="${data.phone}" id="phone" required="required"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input">Phone No.</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-radio">
\t\t\t\t\t\t\t\t\t\t\t  <div class="radio">
\t\t\t\t\t\t\t\t\t\t\t\t<label>
\t\t\t\t\t\t\t\t\t\t\t\t  <input type="radio" value="male" id="sex" checked="checked" ><i class="check-box"></i>Male
\t\t\t\t\t\t\t\t\t\t\t\t</label>
\t\t\t\t\t\t\t\t\t\t\t  </div>
\t\t\t\t\t\t\t\t\t\t\t  <div class="radio">
\t\t\t\t\t\t\t\t\t\t\t\t<label>
\t\t\t\t\t\t\t\t\t\t\t\t  <input type="radio" value="female" id="sex"><i class="check-box"></i>Female
\t\t\t\t\t\t\t\t\t\t\t\t</label>
\t\t\t\t\t\t\t\t\t\t\t  </div>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">\t
\t\t\t\t\t\t\t\t\t\t\t  <input type="text" value="${data.address}" id="address" required="required"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input">Address</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">\t
\t\t\t\t\t\t\t\t\t\t\t  <textarea rows="4"  id="interests" required="required">${data.interests}</textarea>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="textarea">Interests</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="submit-btns">
\t\t\t\t\t\t\t\t\t\t\t\t<button type="button" class="mtr-btn"><span><a href="mypage.html">Cancel</a></span></button>
\t\t\t\t\t\t\t\t\t\t\t\t<button onclick="updateUser()" type="button" class="mtr-btn"><span>Update</span></button>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t</form>
\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t</div>\t
\t\t\t\t\t\t\t`

            document.getElementById("nameU").innerHTML = str
            console.log(data.image)
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}


function updateUser(){
    let idUser = +parseInt(window.localStorage.getItem("iduser"))
    let  name = document.getElementById("name").value;
    let  birthday = document.getElementById("birthday").value;
    let  email = document.getElementById("email").value;
    let  phone = document.getElementById("phone").value;
    let  address = document.getElementById("address").value;
    let  sex = document.getElementById("sex").value;
    let  interests = document.getElementById("interests").value;

    let newUser = {
        name: name,
        birthday: birthday,
        email: email,
        address: address,
        sex: sex,
        phone: phone,
        interests: interests
    }

    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/users/` + idUser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newUser),
        success: function (data) {
            // console.log("Done")
            window.open("mypage.html", "_self")
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}

function postList() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"));
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/view/` + idUser,
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
                            <div  style="width: 50px" >
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><img src="https://img.icons8.com/material-outlined/344/edit--v1.png" style="width: 15px; float: right"></button> 
                          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Form</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
      </div>
      <div class="modal-body">
        <form>
        
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Content</label>
            <textarea name="contentPost" id="contentPost1" class="form-control"  >${data[i].content}</textarea>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Image</label>
            <div id="newA" > <img src="${data[i].imageFile}">
            </div>
            <div class="attachments">
                                                    <ul>
                                                        <li>
                                                            <select name="statusPost" id="statusPost">
                                                                <option value="public">Public</option>
                                                                <option value="friend">Friend</option>
                                                                <option value="private">private</option>
                                                            </select>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-image"></i>
                                                            <label class="fileContainer">
                                                                <input name="imgFile" id="imgFile" type="file" onchange="upload(event)">
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-video-camera"></i>
                                                            <label class="fileContainer">
                                                                <input type="file" id="video" onchange="upload(event)">
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-camera"></i>
                                                            <label class="fileContainer">
                                                                <input type="file">
                                                            </label>
                                                        </li>
                                                       
                                                    </ul>
                                                </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onclick="updateP(${data[i].idPost})" type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
                            </div>
                            <div >
                            <button type="button" class="btn btn-primary"  ><img  onclick="if (confirm('Bạn có muốn xóa bài này không?')) deletePost(${data[i].idPost})" src="https://img.icons8.com/ios-glyphs/2x/filled-trash.png" style="width: 15px; float: right">
                             </button>
                            </div>
                        </div>
                        

                        <h5 class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </h5>
                        <img src="${data[i].imageFile}" alt="">
                        <div class="small d-flex justify-content-start">
                            <div style="width: 180px;height: 30px ;text-align: center;margin-top: 10px">
                                <a href="#!" >
                                    <i class="far fa-thumbs-up me-2"></i>
                                    <p style="text-align: center">Like</p>
                                </a>
                            </div>
                            
                            <div style="width: 180px;height: 30px ; text-align: center;margin-top: 10px">
                                <a href="#!">
                                    <i class="far fa-comment-dots me-2"></i>
                                    <p class="mb-0">Comment</p>
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
function editP(idPost){
    return ``
}

function addNewPost() {
    let img = resultImage();
    let video = $('#video').val();
    let content = $('#contentPost').val();
    let status = $('#statusPost').val();
    let iduser = +parseInt(window.localStorage.getItem("iduser"));
    let newPost = {
        video: video,
        imageFile: img,
        content: content,
        status: status
    }

    $.ajax({
        type: "POST",
        url: `http://localhost:8080/post/` + iduser,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newPost),
        success: function (data) {
            // console.log("Done")
            window.open("mypage.html", "_self")
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}

function commentInPost(idPost) {
    let idComment = localStorage.getItem("accountId");

    let content = document.getElementById(`commentContent(${idPost})`).value;

    let newComment = {
        content: content,
        user: {
            idUser: idComment
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: "POST",
        data: JSON.stringify(newComment),
        url: `http://localhost:8080/comment/${idPost}/commentInPost`,

        success: function () {
            postNewsfeed();
            console.log("xong nha")
        }

    })
}

function getJoinedGroup() {
    let idUser = localStorage.getItem("accountId");
    localStorage.setItem("accountFriend", idUser);
    window.open("timeline-groups.html", "_blank");
    event.preventDefault();
}


window.onload = function () {
    addUser();
    getNonFriend();
    getFriendList();
    postNewsfeed();

}
function deletePost(id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'DELETE',
        url: 'http://localhost:8080/post/' + id,
        success: function (data) {
            postList(data)
        }
    })
}


function postListAll() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"))
    let str = ""
    let str1 = ""
    let str2 = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {
            str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            str2 = `<img src="${data.avatar}" alt="avatar" height="60px" width="60px" style="border-radius: 100%"> `
            document.getElementById("avatarU").innerHTML = str1
            document.getElementById("avatarU1").innerHTML = str2
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/post`,
        success: function (data) {
            for (let i = data.length-1; i > 0; i--) {
                str += `

<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                        <div class="d-flex flex-start align-items-center">
                            <div style="width: 80px"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="50"
                                 height="50" /></div>
                            
                            <div style="width: 400px">
                                <h5 class="fw-bold text-primary mb-1">${data[i].userPost.username}</h5>
                                <p class="text-muted small mb-0">
                                    <p>status : ${data[i].status}</p>
                                    <p>time : ${data[i].time}</p>
                                </p>
                              
                            </div>
<!--  sửa xóa-->
                            
<!--  end-->
                        </div>
                        <p class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </p>
                        <img src="${data[i].imageFile}" alt="">
<!--                      minhh  fix-->
                        <div class="small d-flex justify-content-start">
                            <div style="width: 180px;height: 30px ;text-align: center;margin-top: 10px">
                                <a href="#!" >
                                    <i class="far fa-thumbs-up me-2"></i>
                                    <p style="text-align: center">Like</p>
                                </a>
                            </div>
                            
                            <div style="width: 180px;height: 30px ; text-align: center;margin-top: 10px">
                                <a href="#!">
                                    <i class="far fa-comment-dots me-2"></i>
                                    <p class="mb-0">Comment</p>
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
            console.log(str)
        },
        error: function () {
            console.log("sai o dau do")
        }
    })}

function updateP(idPost){

    let img = resultImage();
    let video = $('#video').val();
    let content = document.getElementById("contentPost1").value;
    let status = $('#statusPost').val();
    let newPost = {
        video: video,
        imageFile: img,
        content: content,
        status: status
    }

    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/post/` + idPost,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(newPost),
        success: function (data) {
            // console.log("Done")
            window.open("mypage.html", "_self")
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}
function profile(){
    let str=""
    let id = +parseInt(window.localStorage.getItem("iduser"))
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
            document.getElementById("profile").innerHTML = str;
        },
        error: function (){
            console.log("sai!")
        }

    })

}
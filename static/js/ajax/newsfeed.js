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

function getTimelineFriend(id) {
    window.localStorage.setItem("userFriend", id)
    let idUser = window.localStorage.getItem("iduser")
    if (idUser == id) {
        window.open("mypage.html", "_self");
        event.preventDefault();
    } else {
        window.open("friendPage.html", "_self");
        event.preventDefault();
    }

}

function getMyTimeLine() {
    let idUser = localStorage.getItem("accountId");
    localStorage.setItem("accountFriend", idUser);
    window.open("time-line.html", "_blank");
    event.preventDefault();
}

function login() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"));
    let str1 = ""
    let str2 = ""
    let str3 = ""
    let str4 = ""
    let name = ""
    let name1 = ""
    let avatar = ""
    let image = ""

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {
            str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            str2 = `<img onclick="myPage()" src="${data.avatar}" alt="avatar" height="60px" width="60px" style="border-radius: 100%"> `
            str3 = `<img src="${data.avatar}" alt="avatar"> `
            str4 = `<img style="margin-left: 20px;margin-right: 50px" src="${data.image}" alt="avatar" > `
            name = `<h2 style="color: #2a62bc">${data.name}</h2>`
            name1 = `<a onclick="myPage()" href="#" title="" style="width: 200px; text-align: left; margin-left: 5px">${data.name}</a>`
            avatar = `<img src="${data.avatar}" alt="avatar" height="200px" width="200px"> `
            image = `<img src="${data.image}" alt="avatar" height="200px" width="200px"> `
            document.getElementById("avatarU").innerHTML = str1
            document.getElementById("avatarU1").innerHTML = str2
            document.getElementById("avatarU2").innerHTML = str3
            document.getElementById("avatarU3").innerHTML = str4
            document.getElementById("nameUser").innerHTML = name
            document.getElementById("nameUser1").innerHTML = name1
            document.getElementById("avatar").innerHTML = avatar
            document.getElementById("image").innerHTML = image
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}

function newsfeed() {
    window.open("newsfeed.html", "_self")
}

function myPage() {
    window.open("mypage.html", "_self")
}

function edit1() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"));
    let name1 = ""
    let str3 = ""
    let str4 = ""
    let name = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {

            str3 = `<img src="${data.avatar}" alt="avatar" > `
            str4 = `<img style="margin-left: 20px;margin-right: 50px" src="${data.image}" alt="avatar" > `
            name = `<a onclick="myPage()" href="#" title="" style="width: 200px; text-align: left; margin-left: 5px">${data.name}</a>`
            name1 = str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            document.getElementById("avatarU2").innerHTML = str3
            document.getElementById("avatarU3").innerHTML = str4
            document.getElementById("avatarU").innerHTML = name1
            document.getElementById("nameUser1").innerHTML = name
            console.log(data.image)
        },
        error: function () {
            console.log("sai o dau do")
        }
    })
}

function editProfileForm() {
    window.open("edit-profile.html", "_self");
}

function editform() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"));

    let str = ""

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
\t\t\t\t\t\t\t\t\t\t\t\t  <input type="radio" value="male" id="sex" checked="checked" name="radio"><i class="check-box"></i>Male
\t\t\t\t\t\t\t\t\t\t\t\t</label>
\t\t\t\t\t\t\t\t\t\t\t  </div>
\t\t\t\t\t\t\t\t\t\t\t  <div class="radio" >
\t\t\t\t\t\t\t\t\t\t\t\t<label>
\t\t\t\t\t\t\t\t\t\t\t\t  <input type="radio" value="female" id="sex" name="radio"><i class="check-box"></i>Female
\t\t\t\t\t\t\t\t\t\t\t\t</label>
\t\t\t\t\t\t\t\t\t\t\t  </div>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">
\t\t\t\t\t\t\t\t\t\t\t  <input type="text" value="${data.address}" id="address" required="required"/>
\t\t\t\t\t\t\t\t\t\t\t  <label class="control-label" for="input">Address</label><i class="mtrl-select"></i>
\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t\t\t\t<div class="form-group">
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


function updateUser() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"))
    let name = document.getElementById("name").value;
    let birthday = document.getElementById("birthday").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.getElementById("sex").value;
    let interests = document.getElementById("interests").value;

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
            for (let i = data.length - 1; i >= 0; i--) {
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
                                <h5  class="fw-bold text-primary mb-1">${data[i].userPost.name}</h5>
                               
                                    <p class="fw-bold text-primary mb-1">${data[i].status}</p>
                                    <p class="fw-bold text-primary mb-1">${data[i].time}</p>
                                  
                              
                            </div>
                            <div  style="width: 50px" >
                         <img data-bs-toggle="modal" data-bs-target="#exampleModalPost${i}" src="https://img.icons8.com/material-outlined/344/edit--v1.png" style="width: 25px">
                          <div class="modal fade" id="exampleModalPost${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <textarea name="contentPost" id="contentPost${i}" class="form-control"  >${data[i].content}</textarea>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Image</label>
            <div id="newA" > <img src="${data[i].imageFile}">
            </div>
            <div class="attachments">
                                                    <ul>
                                                        <li>
                                                            <select name="statusPost" id="statusPost${i}">
                                                                <option value="public">Public</option>
                                                                <option value="friend">Friend</option>
                                                                <option value="private">private</option>
                                                            </select>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-image"></i>
                                                            <label class="fileContainer">
                                                                <input name="imgFile" id="imgFile" type="file" onchange="upload1(event)">
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-video-camera"></i>
                                                            <label class="fileContainer">
                                                                <input type="file" id="video" onchange="upload1(event)">
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
        <button onclick="updateP(${data[i].idPost},${i})" type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
                            </div>
                            <div >
                            <img  onclick="if (confirm('Bạn có muốn xóa bài này không?')) deletePost(${data[i].idPost})" src="https://img.icons8.com/ios-glyphs/2x/filled-trash.png" style="width: 25px">
                           
                            </div>
                        </div>
                        

                        <h6 class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </h6>
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
                    <div style="margin-top: 10px">
                        <table id="showCmt(${data[i].idPost})">
                    </table>
                    </div>
                    <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                        <div class="d-flex flex-start w-100">
                            <div style="text-align: center;margin-top: 8px">
                            <img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="40"
                                 height="40" />
</div>
                            <div style="float: right;width: 70%" class="form-outline w-100">
                <textarea placeholder="Comment here.."  class="form-control" id="commentContent(${data[i].idPost})"
 rows="4"
                          style="background: #fff; height: 50px;border-radius: 50px"></textarea>
                             
                            </div>
                        </div>
                        <div class="float-end mt-2 pt-1">
                            <button onclick="addComment(${data[i].idPost})"
 type="button" class="btn btn-primary btn-sm">Post comment</button>
                            <button onclick="clearCmt(${data[i].idPost})" type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
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


function addNewPost() {
    let img = resultImage();
    let video = $('#video11').val();
    let content = $('#contentPost11').val();
    let status = $('#status11').val()
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

function addNewPost1() {
    let img = resultImage();
    let video = $('#video11').val();
    let content = $('#contentPost11').val();
    let status = $('#status11').val()
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
            window.open("newsfeed.html", "_self")
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
    let name = ""
    let avatar = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/` + idUser,
        success: function (data) {
            str1 = `<img src="${data.avatar}" alt="avatar" height="40px" width="40px" style="border-radius: 100%"> `
            str2 = `<img src="${data.avatar}" alt="avatar" height="60px" width="60px" style="border-radius: 100%"> `
            name = `<a onclick="myPage()" href="#" title="" style="width: 200px; text-align: left; margin-left: 5px">${data.name}</a>`

            document.getElementById("avatarU").innerHTML = str1
            document.getElementById("avatarU1").innerHTML = str2
            document.getElementById("nameUser1").innerHTML = name

        },
        error: function () {
            console.log("sai o dau do")
        }
    })
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/post`,
        success: function (data) {


            for (let i = data.length - 1; i >= 0; i--) {
                str += `

<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                        <div class="d-flex flex-start align-items-center">
                            <div onclick="getTimelineFriend(${data[i].userPost.id})" style="width: 80px"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="50"
                                 height="50" /></div>
                            
                            <div style="width: 400px">
                                <h5 onclick="getTimelineFriend(${data[i].userPost.id})" class="fw-bold text-primary mb-1">${data[i].userPost.name}</h5>
                                <p class="text-muted small mb-0">
                                    <p class="fw-bold text-primary mb-1">${data[i].status}</p>
                                    <p class="fw-bold text-primary mb-1">${data[i].time}</p>
                                </p>
                              
                            </div>
<!--  sửa xóa-->
                            
<!--  end-->
                        </div>
                        <h6 class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </h6>
                        <img src="${data[i].imageFile}" alt="">
<!--                      minhh  fix-->
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
                                    <p onclick="nono()" class="mb-0">Share</p>
                                </a>
</div>         
                        </div>
                    </div>
                    <div style="margin-top: 10px">
                        <table id="showCmt(${data[i].idPost})">
                    </table>
                    </div>
                    <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                        <div class="d-flex flex-start w-100">
                            <div style="text-align: center;margin-top: 8px">
                            <div id="Avatar(${i})"></div>
</div>
                            <div style="float: right;width: 70%" class="form-outline w-100">
                <textarea placeholder="Comment here.."  class="form-control" id="commentContent(${data[i].idPost})"
 rows="4"
                          style="background: #fff; height: 50px;border-radius: 50px"></textarea>
                             
                            </div>
                        </div>
                        <div class="float-end mt-2 pt-1">
                            <button type="button" class="btn btn-primary btn-sm" onclick="addComment(${data[i].idPost})">Post comment</button>
                            <button onclick="clearCmt(${data[i].idPost})" type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
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

function like(idPost){

}

function searchByName(){
    let id  = +parseInt(window.localStorage.getItem("iduser"))
    let name = document.getElementById("searchName").value
    let avatarFriend = ""
    if (name==""){
        listFriendUser()
    }
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/search/`+name,
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
            document.getElementById("friendList").innerHTML=avatarFriend

        },


        error: function () {
            console.log("sai o dau do")
        }
    })
}

function listFriendUser(){
    let id  = +parseInt(window.localStorage.getItem("iduser"))
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
            document.getElementById("friendList").innerHTML=avatarFriend
            },


        error: function () {
            console.log("sai o dau do")
        }
    })
}

function avatar() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"))
    let avatar1 = ""

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/post`,
        success: function (data) {
            $.ajax({
                type: "GET",
                url: `http://localhost:8080/users/` + idUser,
                success: function (data1) {
                    for (let i = data.length-1; i > 0; i--) {
                        avatar1 = `<img onclick="getTimelineFriend(${data1.id})" class="rounded-circle shadow-1-strong me-3"
                                 src="${data1.avatar}" alt="avatar" width="40"
                                 height="40" >`
                        document.getElementById(`Avatar(${i})`).innerHTML = avatar1;
                    }
                    },

                error: function () {
                    console.log("sai o dau do")
                }
            })
        },

        error: function () {
            console.log("sai o dau do")
        }
    })
}
        function updateP(idPost,i)
    {
        let img = resultImage1();
        let video = $('#video').val();
        let content = document.getElementById("contentPost"+i).value;
        let status = document.getElementById("statusPost"+i).value;
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

    function profile() {
        let str = ""
        let name = ""
        let id = +parseInt(window.localStorage.getItem("iduser"))
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/users/+` + id,
            success: function (data) {
                console.log(data)
                str = `<div class="widget">
                                        <h4 class="widget-title">Profile</h4>
                                        <ul class="naves">
                                            <li>
                                                <i class="ti-clipboard"></i>
                                                <a>${data.username}</a>
                                            </li>
                                            <li>
                                                <i class="fa-solid fa-phone-flip"></i>
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
                                                <i class="fa-solid fa-calendar-days"></i>
                                                <a>${data.birthday}</a>
                                            </li>
                                        </ul>
                                    </div><!-- Shortcuts -->
                                    <div class="widget stick-widget">
                                        <h4 class="widget-title">Image</h4>
                                        <ul id="non-friend-list" class="followers">

                                        </ul>
                                    </div>`
                name = `<h2 style="color: #2a62bc">${data.name}</h2>`
                document.getElementById("profile").innerHTML = str;
                document.getElementById("nameUser").innerHTML = name;
            },
            error: function () {
                console.log("sai!")
            }

        })


    }

    function updateAvatar() {
        let img = resultImage2();
        let idUser = +parseInt(window.localStorage.getItem("iduser"))
        let newAvatar = {
            avatar: img
        }

        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/users/avatar/` + idUser,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newAvatar),
            success: function (data) {
                // console.log("Done")
                window.open("mypage.html", "_self")
            },
            error: function () {
                console.log("sai o dau do")
            }
        })
    }

    function updateImage() {
        let img = resultImage3();
        let idUser = +parseInt(window.localStorage.getItem("iduser"))
        let newImage = {
            avatar: img
        }

        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/users/image/` + idUser,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newImage),
            success: function (data) {
                // console.log("Done")
                window.open("mypage.html", "_self")
            },
            error: function () {
                console.log("sai o dau do")
            }
        })
    }

    function updatePassword() {
        let currentP = document.getElementById("currentPassword").value;
        let newP = document.getElementById("newPassword").value;
        let idUser = +parseInt(window.localStorage.getItem("iduser"))
        let changeP = {
            currentPassword: currentP,
            newPassword: newP
        }
        $.ajax({
            type: "PUT",
            url: `http://localhost:8080/api/auth/change-password/` + idUser,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(changeP),
            success: function (data) {
                console.log(data)
                // console.log("Done")
                if (data.message == "yes") {
                    alert("done, Password changed!")
                    window.open("mypage.html", "_self")
                } else {
                    alert("error, please try again!?")
                    window.open("mypage.html", "_self")
                }
            },
            error: function () {
                console.log("sai o dau do")
            }
        })
    }

    function logout() {
        window.localStorage.setItem("iduser", 0)
        window.localStorage.setItem("token", "")
        window.open("login.html", "_self")
    }

// minh show cmt
function showComment(idPost) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/post/viewcomment/'+idPost,
        success: function (data) {
            let s = `showCmt(${idPost})`
            console.log(data)
            let str=`<tr><td colspan="2" style=" font-weight: bold" onclick="showCommentNull(${idPost})">Comment (${data.length})</td></tr>`;
            for (let i = 0; i < data.length; i++) {
                str += `
                <tr>
                <td rowspan="2">
                <div style="width: 50px;text-align: center"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].user.avatar}" alt="avatar" width="25"
                                 height="25" /></div>
                </td>
                <td style=" font-weight: bold">${data[i].user.username}</td>
                <td></td>
                </tr>
                <tr>
                <td style="width: 400px; height: 36px; background-color: #ffeeba; border-radius: 15px; margin-left: 30px; padding-left: 10px">${data[i].content}</td>
                <td style="width: 100px">
                    <div>
                           <img data-bs-toggle="modal"  onclick="showFormEditModal(${data[i].idComment})"  src="https://img.icons8.com/material-outlined/344/edit--v1.png" style="width: 20px; float: right">
<!--              MINH       modal editForm-->
                     
                     </div>  
                </td>   
                <td style="width: 35px">
                    <div>
                        <img onclick="if (confirm('Chắc chưa?')) deleteComment(${data[i].idComment}, ${data[i].post.idPost})" src="https://img.icons8.com/ios-glyphs/2x/filled-trash.png" style="width: 20px; float: right">
                    </div>
                </td>         
                            

                </tr>
                `
            }
            document.getElementById(s).innerHTML = str;
        },
        error: function (data) {
            console.log("sai")
        }
    })
    // minh add c


}
function showCommentNull(idPost) {
    let s = `showCmt(${idPost})`
    let x = ""
    document.getElementById(s).innerHTML = x;


}

function addComment(idPost) {
    let content = document.getElementById(`commentContent(${idPost})`).value;
    let userId = +parseInt(window.localStorage.getItem("iduser"));
    let newComment = {
        content: content,
        idUser: userId,
        idPost: idPost
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'POST',
        url: 'http://localhost:8080/comment',
        data: JSON.stringify(newComment),
        success: function () {
            showComment(idPost);
            document.getElementById(`commentContent(${idPost})`).value = ''
            notice(idPost,userId);

        },

    })
}

// hiên thong bao

function notice(idPost,idUser){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/notice/save/'+idUser+"/"+idPost,
        success: function () {
            console.log("ok")
        },
        error: function (data) {
            console.log("sai")
        }
    })
}

function notice1(idPost){
    let idUser = +parseInt(window.localStorage.getItem("iduser"))
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/notice/save/like/'+idUser+"/"+idPost,
        success: function () {
            console.log("ok")
            likeShow(idPost)
        },
        error: function (data) {
            console.log("sai")
        }
    })
}

function likeShow(idPost){
    let str = ""
    let s = `showCmt(${idPost})`
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/post/like/'+idPost,
        success: function (data) {
            str=`<tr><td colspan="2" style=" font-weight: bold" onclick="showCommentNull(${idPost})">Likes (${data})</td></tr>`
            document.getElementById(s).innerHTML = str
        },
        error: function (data) {
            console.log("sai")
        }
    })
}
function hide(){
    let count = ""
    count = `<span>0</span>`
    document.getElementById("count").innerHTML = count
}

function noticeList(){
    let id = +parseInt(window.localStorage.getItem("iduser"))
    let str = ""
    let count = ""
    let count1 = ""
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/notice/'+id,
        success: function (data) {
            count = `<span> ${data.length} notication</span>`
            count1 = `<span>${data.length}</span>`
            for (let i = data.length-1; i >= 0; i--) {
                str+=`<li>
                                <a onclick="showPost(${data[i].post.idPost})" title="">
                                    <img style="width: 40px;height: 40px;border-radius: 100%" src="${data[i].usersFrom.avatar}" alt="">
                                    <div class="mesg-meta">
                                        <h5 style="color: #2a62bc;">${data[i].usersFrom.name}</h5>
                                        <span>${data[i].notice}</span>
                                       <i>${data[i].time}</i>
                                    </div>
                                </a>
                              
                            </li>`
            }
            document.getElementById("notice").innerHTML = str
            document.getElementById("noticeCount").innerHTML = count
            document.getElementById("count").innerHTML = count1
        },
        error: function (data) {
            console.log("sai")
        }
    })
}

//show 1 bài viết
function showPost(id){
    let str = ""
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/post/'+id,
        success: function (data) {
            str = `<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-start align-items-center">
                        <div style="width: 100px"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data.userPost.avatar}" alt="avatar" width="70"
                                 height="70" /></div>
                            
                            <div style="width: 400px">
                                <h5  class="fw-bold text-primary mb-1">${data.userPost.name}</h5>
                               
                                    <p class="fw-bold text-primary mb-1">${data.status}</p>
                                    <p class="fw-bold text-primary mb-1">${data.time}</p>
                                  
                              
                            </div>
                            <div  style="width: 50px" >
                         <img data-bs-toggle="modal" data-bs-target="#exampleModalPost${data.idPost}" src="https://img.icons8.com/material-outlined/344/edit--v1.png" style="width: 25px">
                          <div class="modal fade" id="exampleModalPost${data.idPost}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <textarea name="contentPost" id="contentPost${data.id}" class="form-control"  >${data.content}</textarea>
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Image</label>
            <div id="newA" > <img src="${data.imageFile}">
            </div>
            <div class="attachments">
                                                    <ul>
                                                        <li>
                                                            <select name="statusPost" id="statusPost${data.id}">
                                                                <option value="public">Public</option>
                                                                <option value="friend">Friend</option>
                                                                <option value="private">private</option>
                                                            </select>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-image"></i>
                                                            <label class="fileContainer">
                                                                <input name="imgFile" id="imgFile" type="file" onchange="upload1(event)">
                                                            </label>
                                                        </li>
                                                        <li>
                                                            <i class="fa fa-video-camera"></i>
                                                            <label class="fileContainer">
                                                                <input type="file" id="video" onchange="upload1(event)">
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
        <button onclick="updateP(${data.idPost},${data.id})" type="button" class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
                            </div>
                            <div >
                            <img  onclick="if (confirm('Bạn có muốn xóa bài này không?')) deletePost(${data.idPost})" src="https://img.icons8.com/ios-glyphs/2x/filled-trash.png" style="width: 25px">
                           
                            </div>
                        </div>
                        

                        <h6 class="mt-3 mb-4 pb-2">
                           ${data.content}
                        </h6>
                        <img src="${data.imageFile}" alt="">
                        <div class="small d-flex justify-content-start">
                            <div style="width: 180px;height: 30px ;text-align: center;margin-top: 10px">
                                <a href="#!" >
                                    <i onclick="notice1(${data[i].idPost})"  class="far fa-thumbs-up me-2"></i>
                                    <p onclick="notice1(${data[i].idPost},)" style="text-align: center">Like</p>
                                </a>
                            </div>
                            
                            <div style="width: 180px;height: 30px ; text-align: center;margin-top: 10px">
                                <a href="#!">
                                    <i onclick="showComment(${data.idPost})" class="far fa-comment-dots me-2"></i>
                                    <p onclick="showComment(${data.idPost})" class="mb-0">Comment</p>
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
                    <div style="margin-top: 10px">
                        <table id="showCmt(${data.idPost})">
                    </table>
                    </div>
                    <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                        <div class="d-flex flex-start w-100">
                            <div style="text-align: center;margin-top: 8px">
                            <img class="rounded-circle shadow-1-strong me-3"
                                 src="${data.userPost.avatar}" alt="avatar" width="40"
                                 height="40" />
</div>
                            <div style="float: right;width: 70%" class="form-outline w-100">
                <textarea placeholder="Comment here.."  class="form-control" id="commentContent(${data.idPost})"
 rows="4"
                          style="background: #fff; height: 50px;border-radius: 50px"></textarea>
                             
                            </div>
                        </div>
                        <div class="float-end mt-2 pt-1">
                            <button onclick="addComment(${data.idPost})"
 type="button" class="btn btn-primary btn-sm">Post comment</button>
                            <button onclick="clearCmt(${data.idPost})" type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

            document.getElementById("showPost").innerHTML = str;
        },
        error: function (data) {
            console.log("sai")
        }
    })
}

// minh xóa cmt
function deleteComment(idComment, idPost) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'DELETE',
        url: 'http://localhost:8080/comment/'+idComment,
        success: function () {
            showComment(idPost)
        },
        error: function (data) {
            console.log("sai")
        }
    })
}

// minh clear cmt
function clearCmt(idPost) {
    document.getElementById(`commentContent(${idPost})`).value = '';
}

function searchByContent() {
    let content = document.getElementById("searchPost").value;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'GET',
        url: 'http://localhost:8080/post/search?content=' + content,
        success: function (data) {
            let str1 = ''
            for (let i = data.length-1; i >= 0; i--) {
                str1 += `
<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                        <div class="d-flex flex-start align-items-center">
                            <div style="width: 80px"><img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="50"
                                 height="50" /></div>
                            
                            <div style="width: 400px">
                                <h5 onclick="pageUser(${data[i].userPost.id})" class="fw-bold text-primary mb-1">${data[i].userPost.username}</h5>
                                <p class="text-muted small mb-0">
                                    <p>status : ${data[i].status}</p>
                                    <p>time : ${data[i].time}</p>
                                </p>
                              
                            </div>

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
<!--                    minh-->
                    
                    <div style="margin-top: 10px">
                        <table id="${data[i].idPost}">
                    </table>
                    </div>
                    
                    <div class="card-footer py-3 border-0" style="background-color: #f8f9fa;">
                        <div class="d-flex flex-start w-100">
                            <div>
                            <img class="rounded-circle shadow-1-strong me-3"
                            
                                 src="${data[i].userPost.avatar}" alt="avatar" width="40"
                                 height="40" />
</div>
                            <div style="float: right;width: 70%" class="form-outline w-100">
                <input placeholder="Comment here.."  class="form-control" name="addCmt" id="commentContent(${data[i].idPost})" rows="4"
                          style="background: #fff; height: 50px;border-radius: 50px">
                             
                            </div>
                        </div>
                        <div class="float-end mt-2 pt-1">
                            <button type="button" class="btn btn-primary btn-sm" onclick="addComment(${data[i].idPost})">Post comment</button>
                            <button type="button" class="btn btn-outline-primary btn-sm" onclick="clearCmt(${data[i].idPost})">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
            }
            document.getElementById("showPost").innerHTML = str1;
            console.log(str1)
        }
    })
}
let idC = 0;
function showFormEditModal(idComment) {
    idC=idComment;
    $(`#exampleModalCmt`).modal('show');
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'GET',
        url: 'http://localhost:8080/comment/'+idComment,
        success: function (data) {
            console.log(data)
            $('#contentCmtModal').val(data.content)
            $('#idPost').val(data.post.idPost)
        }
    })
}

function editComment(idComment) {
    idComment=idC;
    let content = document.getElementById('contentCmtModal').value;
    let idPost = document.getElementById('idPost').value;
    let userId = +parseInt(window.localStorage.getItem("iduser"));
    let newComment ={
        content: content,
        idUser: userId,
        idPost: idPost
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'PUT',
        url: 'http://localhost:8080/comment/'+idComment,
        data: JSON.stringify(newComment),
        success: function () {
            showComment(idPost);
        }
    })
}
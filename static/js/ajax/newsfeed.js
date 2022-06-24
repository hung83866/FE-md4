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

function postList() {
    let idUser = +parseInt(window.localStorage.getItem("iduser"));
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/users/view/` + idUser,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                str += `

<div class="central-meta item">
        <div class="user-post">
            <div class="friend-info">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-start align-items-center">
                            <img class="rounded-circle shadow-1-strong me-3"
                                 src="${data[i].userPost.avatar}" alt="avatar" width="60"
                                 height="60" />
                            <div>
                                <h6 class="fw-bold text-primary mb-1">${data[i].userPost.username}</h6>
                                <p class="text-muted small mb-0">
                                    Shared publicly - Jan 2020
                                </p>
                            </div>
                        </div>

                        <p class="mt-3 mb-4 pb-2">
                           ${data[i].content}
                        </p>
                        <img src="${data[i].imageFile}" alt="">
                        <div class="small d-flex justify-content-start">
                            <a href="#!" class="d-flex align-items-center me-3">
                                <i class="far fa-thumbs-up me-2"></i>
                                <p style="float: right" class="mb-0">Like</p>
                            </a>
                            
                            <a href="#!" class="d-flex align-items-center me-3">
                                <i class="far fa-comment-dots me-2"></i>
                                <p class="mb-0">Comment</p>
                            </a>
                            <a href="#!" class="d-flex align-items-center me-3">
                                <i class="fas fa-share me-2"></i>
                                <p class="mb-0">Share</p>
                            </a>
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
                <textarea placeholder="Comment here" class="form-control" id="textAreaExample" rows="4"
                          style="background: #fff;"></textarea>
                             
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
    })
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
            postlist()
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

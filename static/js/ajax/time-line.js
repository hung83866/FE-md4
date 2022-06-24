function addUser() {
    let idUser = localStorage.getItem("accountFriend");

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
            document.getElementById("imageMain").innerHTML = `<img src="${user.imgUrl}" alt="">
                                <form class="edit-phto">
                                    <i class="fa fa-camera-retro"></i>
                                    <label class="fileContainer">
                                        Edit Display Photo
                                        <input type="file" onclick="changeAvatar(${idUser})"/>
                                    </label>
                                </form>`
            document.getElementById("nameUser").innerHTML = `<h5>${user.fullName}</h5>`
            document.getElementById("imagePost").innerHTML = `<img src="${user.imgUrl}" alt="">`
        }
    })
}

function getFriendList() {
    let idUser = localStorage.getItem("accountFriend");
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
                        <h4><a href="time-line.html" onclick="getTimeLine(${idUser},${users[i].idUser})" title="">${users[i].fullName}</a></h4>
                        <a href="#" title="" class="underline">Add Friend</a>
                    </div>
                </li>`
            }
            document.getElementById("non-friend-list").innerHTML = content;
        }
    })
}

function postTimeline(){
    let idUserFrom = localStorage.getItem("accountId");
    let idUserTo = localStorage.getItem("accountFriend");
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/post/${idUserFrom}/${idUserTo}/timeline`,

        success: function (posts) {
            let content = "";
            for (let i = posts.length-1; i >= 0; i--) {
                content += postDetail(posts[i]);
            }
            document.getElementById('postInTimeline').innerHTML = content;
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
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/comment/${post.idPost}/list-comment`,

        success: function (comments) {
            let content = ""
            if (comments != null) {
                for (let i = 0; i < comments.length; i++) {
                    content += `<li ><div class="comet-avatar"><img src="${comments[i].user.imgUrl}" style="width: 45px; height: 45px; border-radius: 100%" alt="">
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
                    content += `</li>`
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

function checkFriendStatus(){
    let idUserFrom = localStorage.getItem("accountId");
    let idUserTo = localStorage.getItem("accountFriend");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/checkFriendShip`,

        success: function (status){
            if (idUserFrom === idUserTo){
                document.getElementById("friendShip").hidden = true;
            } else {
                document.getElementById("postDiv").hidden = true;
                if (status === "friend"){
                    document.getElementById("friendShip").hidden = false;
                    document.getElementById("friendShip").innerHTML = `<a href="#" onclick="unFriend(${idUserFrom},${idUserTo})" title="" data-ripple="">UnFriend</a>
                                                                                <a href="#" onclick="blockFriend(${idUserFrom},${idUserTo})" title="" data-ripple="">Block</a>`
                } else if (status ==="pending"){
                    document.getElementById("friendShip").hidden = false;
                    document.getElementById("friendShip").innerHTML = `<a href="#" onclick="cancelFriend(${idUserFrom},${idUserTo})" title="" data-ripple="">Cancel Request</a>
                                                                                <a href="#" onclick="blockFriend(${idUserFrom},${idUserTo})" title="" data-ripple="">Block</a>`
                } else if (status === "respond"){
                    document.getElementById("friendShip").hidden = false;
                    document.getElementById("friendShip").innerHTML = `<a href="#" title="" onclick="acceptFriend(${idUserFrom},${idUserTo})" data-ripple="">Accept Request</a>
                                                                                <a href="#" title="" onclick="cancelFriend(${idUserFrom},${idUserTo})" data-ripple="">Cancel Request</a>`

                } else if (status === "block"){
                    document.getElementById("friendShip").hidden = false;
                    document.getElementById("friendShip").innerHTML = `<a href="#" title=""onclick="unBlockFriend(${idUserFrom},${idUserTo})" data-ripple="">Unblock</a>`
                } else if (status === "blocked"){
                    document.getElementById("friendShip").hidden = true;
                } else if  (status === "non friend"){
                    document.getElementById("friendShip").hidden = false;
                    document.getElementById("friendShip").innerHTML = `<a href="#" title="" onclick="addFriend(${idUserFrom},${idUserTo})" data-ripple="">Add Friend</a>`
                }
            }

        }
    })
}

function acceptFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/acceptFriend`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function unFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/deleteFriendStatus`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function cancelFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/deleteFriendStatus`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function blockFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/blockFriend`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function unBlockFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/deleteFriendStatus`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function addFriend(idUserFrom, idUserTo){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/addFriend`,

        success: function () {
            getNonFriend();
            getFriendList();
            checkFriendStatus();
        }
    })
    event.preventDefault()
}

function getTimeLine(idUser, idFriend){
    localStorage.setItem("accountFriend",idFriend);
    window.open("time-line.html","_blank");
    event.preventDefault();
}

function commentInPost(idPost){
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

        success: function (){
            postTimeline();
            console.log("xong nha")
        }

    })
}

function addNewPost(){
    let data = new FormData();
    let content = $('#contentPost').val();
    let status = $('#statusPost').val();
    let idPost = localStorage.getItem("accountId");
    let newPost = {
        content: content,
        status: status,
        userPost: {
            idUser: idPost
        }
    }
    data.append("file", $('#imgFile')[0].files[0]);
    data.append("json", new Blob([JSON.stringify(newPost)],{
        type: "application/json"
    }))

    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        url: `http://localhost:8080/post/newPost`,

        success: function (){
            // console.log("Done")
            window.open("time-line.html", "_self")
        },
        error: function (){
            console.log("sai o dau do")
        }
    })
}

function changeAvatar(idUser){
    let data = new FormData();
    data.append("file", $('#imgFile')[0].files[0]);

    $.ajax({
        type: "GET",
        data: data,
        processData: false,
        contentType: false,
        url: `http://localhost:8080/user/${idUser}/changeAvatar`,

        success: function (){
            // console.log("Done")
            window.open("time-line.html", "_self")
        },
        error: function (){
            console.log("sai o dau do")
        }
    })
}

window.onload = function (){
    addUser()
    getNonFriend();
    getFriendList();
    postTimeline();
    checkFriendStatus();
}
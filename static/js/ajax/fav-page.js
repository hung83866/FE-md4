function addUser() {
    let idUser = localStorage.getItem("accountFriend");

    $.ajax({
        type: "POST",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/users/find/${idUser}`,
        success: function (user) {
            document.getElementById("imageNavbar").innerHTML = `<img src="${user.imgUrl}" style="width: 32px; height: 32px;border-radius: 100%" alt="">`
            // document.getElementById("imageMain").innerHTML = `<img src="${user.imgUrl}" alt="">
            //                     <form class="edit-phto">
            //                         <i class="fa fa-camera-retro"></i>
            //                         <label class="fileContainer">
            //                             Edit Display Photo
            //                             <input type="file"/>
            //                         </label>
            //                     </form>`
            // document.getElementById("nameUser").innerHTML = `<h5>${user.fullName}</h5>`
            // document.getElementById("imagePost").innerHTML = `<img src="${user.imgUrl}" alt="">`
        }
    })
}

function getGroup() {
    let idGroup = localStorage.getItem("groupId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}`,

        success: function (group) {
            document.getElementById("imageMain").innerHTML = `<img src="${group.imgUrl}" alt="">
                                                                        <form class="edit-phto">
                                                                            <i class="fa fa-camera-retro"></i>
                                                                            <label class="fileContainer">
                                                                                Edit Display Photo
                                                                                <input type="file"/>
                                                                            </label>
                                                                        </form>`
            document.getElementById("nameGroup").innerHTML = `<h5>${group.name}</h5>
                                                                        <span>@${group.name}</span>`
            document.getElementById("imagePost").innerHTML = `<img src="${group.imgUrl}" alt="">`
        }
    })
}

function getMembers() {
    let idGroup = localStorage.getItem("groupId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/member`,

        success: function (users) {
            let content = "";
            for (let i = 0; i < users.length; i++) {
                content += `<li>
                                <figure>
                                    <img src="${users[i].imgUrl}" alt="">
                                        <span class="status f-online"></span>
                                </figure>
                                <div class="friendz-meta">
                                    <a href="#">${users[i].fullName}</a>
                                    <i><a href="https://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__"
                                          data-cfemail="1e6977706a7b6c6d71727a7b6c5e79737f7772307d7173">[email&#160;protected]</a></i>
                                </div>
                            </li>`
            }
            document.getElementById("people-list").innerHTML = content
        }
    })
}

function getNonMembers() {
    let idGroup = localStorage.getItem("groupId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/notMember`,

        success: function (users) {
            let content = "";
            for (let i = 0; i < users.length; i++) {
                content += `<li>
                                <figure><img src="${users[i].imgUrl}" alt="" style="width: 41px; height: 41px; border-radius: 100%">
                                </figure>
                                <div class="friend-meta">
                                    <h4><a href="#" class="underline" title="">${users[i].fullName}</a></h4>
                                    <a href="#" title="" class="invite" data-ripple="">invite</a>
                                </div>
                            </li>`
            }
            document.getElementById("inviteFriend").innerHTML = content;
        }
    })
}

function getTotalMembers() {
    let idGroup = localStorage.getItem("groupId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/totalMembers`,

        success: function (total) {
            document.getElementById("totalMembers").innerText = `${total} members`;
        }
    })
}

function getPostInGroup() {
    let idUser = localStorage.getItem("accountId");
    let idGroup = localStorage.getItem("groupId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/posts`,

        success: function (posts) {
            let content = "";
            for (let i = posts.length-1; i >= 0; i--) {
                content += postDetail(posts[i]);
            }
            document.getElementById("postInGroup").innerHTML = content;
        }
    })
    event.preventDefault()
}

function postDetail(post) {
    let idUser = localStorage.getItem("accountId");

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/like-post/${post.idPost}/${idUser}/showLike`,

        success: function (like) {
            document.getElementById(`likePost(${post.idPost})`).innerText = like
        }
    })

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
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
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/like-post/${idPost}/${idUser}/checkLike`,

        success: function (like) {
            document.getElementById(`likePost(${idPost})`).innerText = like
        }
    })
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
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        type: "POST",
        data: JSON.stringify(newComment),
        url: `http://localhost:8080/comment/${idPost}/commentInPost`,

        success: function (){
            getPostInGroup();
            console.log("xong nha")
        }

    })
    event.preventDefault()
}

function addNewPost(){
    let idGroup = localStorage.getItem("groupId")
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
        url: `http://localhost:8080/post/${idGroup}/newPostInGroup`,

        success: function (){
            // console.log("Done")
            window.open("fav-page.html", "_self")
        },
        error: function (){
            console.log("sai o dau do")
        }
    })
}

function statusOnGroup(){
    let idUser = localStorage.getItem("accountId")
    let idGroup = localStorage.getItem("groupId")

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/member`,

        success: function (users) {
            let status = false
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].idUser)
                if (users[i].idUser == idUser){
                    status = true;
                    break;
                }
            }
            console.log(idUser)
            console.log(status)
            if (status === true){
                document.getElementById("statusInGroup").innerHTML = `<a href="#" title="" data-ripple="" onclick="leaveGroup(${idGroup}, ${idUser})">LEAVE GROUP</a>`
            } else {
                document.getElementById("statusInGroup").innerHTML = `<a href="#" title="" data-ripple="" onclick="joinGroup(${idGroup}, ${idUser})">JOIN GROUP</a>`
            }
        }
    })
}

function leaveGroup(idGroup, idUser){
    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/${idUser}/leave`,

        success: function (){
            window.open("fav-page.html", "_self")
        }
    })
    event.preventDefault()
}

function joinGroup(idGroup, idUser){
    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/${idUser}/join`,

        success: function (){
            window.open("fav-page.html", "_self")
        }
    })
    event.preventDefault()
}

function checkMember(){
    let idUser = localStorage.getItem("accountId")
    let idGroup = localStorage.getItem("groupId")

    $.ajax({
        type: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + localStorage.getItem('token')
        // },
        url: `http://localhost:8080/group/${idGroup}/${idUser}/checkMember`,

        success: function (status){
            if (status == "member"){
                document.getElementById("checkMember").hidden = false;
            } else {
                document.getElementById("checkMember").hidden = true;
            }
        }
    })
}


window.onload = function () {
    checkMember()
    addUser()
    getGroup()
    getTotalMembers()
    getMembers()
    getNonMembers()
    getPostInGroup()
    statusOnGroup()
}
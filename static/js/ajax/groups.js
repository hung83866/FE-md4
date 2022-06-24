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

function getFriendList() {
    let idMain = localStorage.getItem("accountId")
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
            let content2 = ""
            for (let i = 0; i < users.length; i++) {
                content2 += `<li>
                    <div class="nearly-pepls">
                        <figure>
                            <a href="time-line.html" onclick="getTimeLine(${idMain},${users[i].idUser})" title="">
                            <img src="${users[i].imgUrl}" alt=""></a>
                        </figure>
                        <div class="pepl-info">
                            <h4><a href="time-line.html" title="" onclick="getTimeLine(${idMain},${users[i].idUser})">${users[i].fullName}</a></h4>
                            <a href="#" title=""  class="add-butn more-action" data-ripple="">unfriend</a>
                            <a href="#" title="" class="add-butn" data-ripple="">block</a>
                        </div>
                    </div>
                </li>`
            }
            let content3 = ""
            for (let i = 0; i < users.length; i++) {
                content3 += `<li>
                    <div class="nearly-pepls">
                        <figure>
                            <a href="time-line.html" onclick="getTimeLine(${idMain},${users[i].idUser})" title="">
                            <img src="${users[i].imgUrl}" alt=""></a>
                        </figure>
                        <div class="pepl-info">
                            <h4><a href="time-line.html" title="" onclick="getTimeLine(${idMain},${users[i].idUser})">${users[i].fullName}</a></h4>
                        </div>
                    </div>
                </li>`
            }
            document.getElementById("people-list").innerHTML = content;
            if (idMain === idUser){
                document.getElementById("friend-list").innerHTML = content2;
            } else {
                document.getElementById("friend-list").innerHTML = content3;
            }

            document.getElementById("numberOfFriends").innerText = users.length;
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

function getGroupNoneJoin(){
    let idUser = localStorage.getItem("accountId");
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/group/${idUser}/groupNoneJoin`,

        success: function (groups){
            let content = "";
            for (let i = 0; i < groups.length; i++) {
                content += `<li>
                                <div class="nearly-pepls">
                                    <figure>
                                        <a href="#" onclick="moveToGroup(${groups[i].idGroup})" title=""><img src="${groups[i].imgUrl}" style="width: 60px; height: 60px; border-radius: 100%" alt=""></a>
                                    </figure>
                                    <div class="pepl-info">
                                        <h4><a href="#" onclick="moveToGroup(${groups[i].idGroup})" title="">${groups[i].name}</a></h4>
                                        <span>public group</span>
                                        <em>32k Members</em>
                                        <a href="#" title="" class="add-butn" onclick="joinGroup(${groups[i].idGroup},${idUser})" data-ripple="">join now</a>
                                    </div>
                                </div>
                            </li>`
            }

            document.getElementById("groupNoneJoin").innerHTML = content;
        }
    })
}

function moveToGroup(idGroup){
    localStorage.setItem("groupId", idGroup);
    window.open("fav-page.html","_blank");
    event.preventDefault();
}

function joinGroup(idGroup, idUser){
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/group/${idGroup}/${idUser}/join`,

        success: function (){
            getGroupNoneJoin()
        }
    })
    event.preventDefault()
}



window.onload = function (){
    addUser()
    getNonFriend()
    getFriendList()
    getGroupNoneJoin()
}
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
            //                             <input type="file" onclick="changeAvatar(${idUser})"/>
            //                         </label>
            //                     </form>`
            // document.getElementById("nameUser").innerHTML = `<h5>${user.fullName}</h5>`
            // document.getElementById("imagePost").innerHTML = `<img src="${user.imgUrl}" alt="">`
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
                                <div class="nearly-pepls">
                                    <figure>
                                        <img src="${users[i].imgUrl}" alt="">
                                    </figure>
                                    <div class="pepl-info">
                                        <h4><a href="time-line.html" onclick="getTimeLine(${idUser},${users[i].idUser})" title="">${users[i].fullName}</a></h4>
                                        <a href="#" title="" class="add-butn" onclick="getTimeLine(${idUser},${users[i].idUser})" data-ripple="">go to timeline</a>
                                    </div>
                                </div>
                            </li>`
            }
            document.getElementById("non-friend-list").innerHTML = content;
        }
    })
}

// function addFriend(idUserFrom, idUserTo){
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         },
//         url: `http://localhost:8080/friend-list/${idUserFrom}/${idUserTo}/addFriend`,
//
//         success: function () {
//             getNonFriend();
//             getFriendList();
//             checkFriendStatus();
//         }
//     })
//     event.preventDefault()
// }

function getTimeLine(idUser, idFriend){
    localStorage.setItem("accountFriend",idFriend);
    window.open("time-line.html","_blank");
    event.preventDefault();
}

window.onload = function (){
    getFriendList();
    getNonFriend();
    addUser();
}
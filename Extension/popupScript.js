//google analyitics start
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-98900189-2']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
//google analyitics end

//varibles start
custom = "";
links = document.getElementsByClassName('links');
buts = document.getElementsByClassName('curChoice');
chosen = document.getElementsByClassName('chosen');
colButs = document.getElementsByClassName('colorButton');
pre = document.getElementsByClassName('buy_pre_button');
//varibles end

//eventlisners start
//class
for (i=0; i < buts.length; i ++){
    document.getElementById(buts[i].id).addEventListener('click', select, true)
}
for (i=0; i < pre.length; i ++){
    document.getElementById(pre[i].id).addEventListener('click', select, true)
}
//id
document.getElementById("helpEmail").addEventListener('click', helpEmail);
document.getElementById('twitter').addEventListener('click', twitter);
document.getElementById("default").addEventListener('click', select, true);
document.getElementById("infoLink").addEventListener('click', informationLink);
document.getElementById("upLink").addEventListener('click', uploadLink);
document.getElementById("other").addEventListener('click', other);
document.getElementById('gotoOptions').addEventListener('click', gotoOptions);
document.getElementById("other2").addEventListener('click', imgurUp);
    //eventlisners end

function helpEmail (){
    chrome.storage.sync.get(function(obj){
        window.open('mailto:bbusch.developer@gmail.com?subject=Help Email&body=(This stuff helps me solve your problem) ' +
            ('option: ' + obj.option + ' cursor: ' + obj.cursor + ' color: ' + obj.color + ' size: ' + obj.size));
    });

}

function informationLink (){
    parent.window.open('http://beckbusch.github.io/Custom-Rainbow-Cursor-Extension/?type=popup');
}

function twitter (){
    parent.window.open('https://twitter.com/CursorCustom');
}

function gotoOptions(){
    chrome.runtime.openOptionsPage();
}

function uploadLink (){
    parent.window.open('http:/beckbusch.github.io/Custom-Rainbow-Cursor-Extension/imgurUp.html');
}

function select() {
    selection = this.id;
    document.getElementById("chosen").innerText = selection;
    document.body.style.cursor = "url(cursors/arrows/" + selection + ".png), auto";
    document.getElementById('preview').src = "cursors/arrows/" +selection + ".png";
    saveOptions()
}

function imgurUp(){
    selection = "other";
    custom = document.getElementById("uploadedImg").src;
    saveOptions();
}

function other() {
    selection = this.id;
    custom = (document.getElementById('other_input').value);
    document.getElementById('preview').src = custom;
    var img = document.getElementById('preview');
    var imgWide = img.naturalWidth;
    var imgHigh = img.naturalHeight;
    if ((imgWide > 128) || (imgHigh > 128)) {
        alert("Your custom image is larger that 128x128. This can not be used as a cursor.");
        document.getElementById('preview').src = "";
        document.getElementById('preview').style.visibility = "initial";
    }
    else if ((imgWide > 32) || (imgHigh > 32)) {
        alert("Your custom image is larger that 32 pixels. This may not look good as a cursor.");
        document.getElementById('preview').style.visibility = "initial";
        document.body.style.cursor = "url(" + custom + "), auto";
    }
    else {
        document.getElementById('preview').style.visibility = "initial";
        document.body.style.cursor = "url(" + custom + "), auto";
    }
    saveOptions()
}

function saveOptions() {
    chrome.tabs.query({}, function (tabs) {
        for(i=0; i<tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id, {msg: "update"});
        }
    });
    _gaq.push(['_trackEvent', selection, 'clicked']);

    chrome.storage.sync.set(
        {"option": selection, "link": custom}, function () {
        });
}
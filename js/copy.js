function copy(copyId) {
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    let copyText = document.getElementById(copyId).innerHTML;
    inputElement.value = copyText;
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand("copy");
    document.body.remove.child(inputElement);
    document.getElementById("alert").style.display="block";
    setTimeout(function() {
        document.getElementById("alert").style.display="none";
    });
}

/* How to use: 
<p id="text1">Text to be copied</p>
<button onclick="copy(text1)">Copy</button> 
<p id="alert">Text copies</p>
*/
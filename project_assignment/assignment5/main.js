function postFunction() {
 var topic = document.getElementById("topic");
 var reply1 = document.getElementById("reply1");
 var reply2 = document.getElementById("reply2");
    var message = document.getElementById("message");

    if(topic.textContent === ""&&message.value !== ""){
        topic.textContent = message.value;
        message.value = "";
    }
    else if (reply1.textContent ==""&& message.value !== null){
        reply1.textContent = message.value;
        message.value = "";
    }
    else if (reply2.textContent ==""&& message.value !== null){
        reply2.textContent = message.value;
        message.value = "";
    }
}

function clearFunction() {
 var topic = document.getElementById("topic");
 var reply1 = document.getElementById("reply1");
 var reply2 = document.getElementById("reply2");
    var message = document.getElementById("message");

    topic.textContent = "";
    reply1.textContent = "";
    reply2.textContent = "";
    message.value = "";
}

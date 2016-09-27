var stompClient = null;

var stompClientConnected = false;

function setConnected(connected) {
	stompClientConnected = connected;
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#falcon").html("");
}

function connect() {
    var socket = new SockJS('/falcon-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/message', function (message) {
        	showMessage(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
	if(stompClientConnected) {
		stompClient.send("/falcon", {}, JSON.stringify({'name': $("#name").val(), 'message': $("#message").val()}));
	} else {
		alert("Please, connect to the WebSocket");
	}
}

function showMessage(messageObj) {
    $("#conversation tbody").append("<tr><td>" + messageObj.name + "</td><td>" + messageObj.message + "</td><td>" + getTimeFormat(messageObj.messageDate) +  " " + getDateFormat(messageObj.messageDate) +  "</td></tr>");
}

function getDateFormat(dateTime) {
	return dateTime.dayOfMonth + "." + dateTime.monthValue + "." + dateTime.year;
}

function getTimeFormat(dateTime) {
	return dateTime.hour + ":" + dateTime.minute + ":" + dateTime.second;
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

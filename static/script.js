async function sendMessage() {

    const input =
        document.getElementById("user-input");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    const chatBox =
        document.getElementById("chat-box");


    // USER MESSAGE

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.innerText =
        message;

    chatBox.appendChild(userMessage);


    // CLEAR INPUT

    input.value = "";


    // TYPING INDICATOR

    const typing =
        document.createElement("div");

    typing.className =
        "bot-message";

    typing.innerText =
        "🤖 Typing...";

    chatBox.appendChild(typing);


    chatBox.scrollTop =
        chatBox.scrollHeight;


    try {

        const response =
            await fetch("/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


        const data =
            await response.json();


        // REMOVE TYPING

        typing.remove();


        // BOT RESPONSE

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "bot-message";

        botMessage.innerText =
            "🤖 " + data.response;

        chatBox.appendChild(botMessage);


        chatBox.scrollTop =
            chatBox.scrollHeight;


    } catch (error) {

        typing.innerText =
            "❌ Unable to connect to the server.";

        console.error(error);

    }

}


/* QUICK QUESTIONS */

function quickQuestion(question) {

    document.getElementById(
        "user-input"
    ).value = question;

    sendMessage();

}


/* ENTER KEY */

document.getElementById(
    "user-input"
).addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);
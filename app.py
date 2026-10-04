from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json["message"]

    user_message = user_message.lower()

    if "admission" in user_message:
        response = "You can contact the college admission department for admission details."

    elif "courses" in user_message:
        response = "The college offers B.Tech programs in CSE, AI & Data Science, ECE, EEE and other departments."

    elif "timings" in user_message:
        response = "The college working hours are from 9:00 AM to 4:00 PM."

    elif "hostel" in user_message:
        response = "The college provides hostel facilities for eligible students."

    else:
        response = "Sorry, I don't have information about that yet."

    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
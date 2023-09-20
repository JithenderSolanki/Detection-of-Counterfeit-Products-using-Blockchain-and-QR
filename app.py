from flask import Flask, request, redirect, render_template, make_response
from flask_sqlalchemy import SQLAlchemy
import pyqrcode
import urllib.parse
import base64
from datetime import datetime
import json
with open('config.json','r')as c:
    account=json.load(c)["account"]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///qr_db1.db'
db = SQLAlchemy(app)

class QRCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    max_scans = db.Column(db.Integer, nullable=False)
    current_scans = db.Column(db.Integer, default=0)
    scanned = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.now)

@app.route("/")
def home():
    return render_template("home.html",account=account)

@app.route("/manufacturer")
def manufacturer():
    return render_template("manufacturer.html",account=account)

@app.route("/consumer")
def cunsumer():


    return render_template("consumer.html",account=account)

@app.route('/generate', methods=['POST'])
def generate():
        latest_qrcode = QRCode.query.order_by(QRCode.id.desc()).first()
        if latest_qrcode:
            latest_id = latest_qrcode.id
        else:
            latest_id = 0

        # increment the ID value by 1
        next_id = (str)(latest_id + 1)
        max_scans = 1
        qrcode = QRCode(max_scans=max_scans)
        db.session.add(qrcode)
        db.session.commit()

        data1 = request.form["company"]
        data2 = request.form["branch"]
        data3 = request.form["name"]
        data4 = request.form["id"]
        data5 = request.form["type1"]
        data6 = request.form["date1"]

        metadata =  data1 + data2 +data3 + data4 +data5 +data6
        encoded_metadata = base64.b64encode(metadata.encode("utf-8"))
       # url="http://127.0.0.1:5000/consumer?metadata="+encoded_metadata.decode("utf-8")
       #url="http://127.0.0.1:5000/scan/"+next_id
        url = f"http://127.0.0.1:5000/scan/{next_id}?metadata={encoded_metadata.decode('utf-8')}"
        
        data=url
        
        qr = pyqrcode.create(data)
        current_time =  datetime.now()
        time_string =  current_time.strftime(" %H-%M-%S , %d-%m-%Y")
        qr.png("C:\\Users\\jithender\\Desktop\\miniproject\\Verification\\qrimages\\" +time_string + "qr "+".png", scale=8)

        

        return  "QR code generated succesfully"
     
         

@app.route('/scan/<id>')
def scan(id):
    get_metadata = request.args.get('metadata')
    qrcode = QRCode.query.filter_by(id=id).first()

    if qrcode.scanned:
        qrcode.current_scans += 1
        db.session.commit()
        return 'This QR code has already been scanned - INVALID'

    qrcode.scanned = True
    qrcode.current_scans += 1
    db.session.commit()
    message='Successfully scanned QR code'
    url = "http://127.0.0.1:5000/consumer?metadata="+get_metadata
    response = make_response(f'<center>{message}<br><br><br><a href="{url}">{url}</a><center>')
    response.headers['X-My-Custom-Header'] = 'Hello'
    return response

with app.app_context():
      db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

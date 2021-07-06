import requests
from bs4 import BeautifulSoup
import json

from flask import Flask, request

app = Flask(__name__)

@app.route('/verify/wce',methods = ['POST'])
def login():
    try:
        params = json.loads(str(request.data.decode("utf-8")))
        
        s = requests.Session()

        s.get('http://112.133.242.241/moodle/')

        r = s.post('http://112.133.242.241/moodle/login/index.php',{"username": params["username"],"password": params["password"]})

        soup = BeautifulSoup(r.text, 'html.parser')

        data = soup.find_all("span", {"class": "usertext"})[0].get_text().split()
        print(data)
        prn = data[3]
        name = ' '.join(data[4:])

        return {'status':'OK', 'prn':prn, 'name':name}
    except Exception:
        return {'status':'ERROR'}
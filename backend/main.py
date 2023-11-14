from flask import Flask
import get_warnings, postcode, json

app = Flask(__name__)

@app.route('/')
def index():
    return "Working"

@app.route('/getaddresses/<pc>')
def get_addresses(pc):
    print(pc)
    return json.dumps(postcode.get_addresses(pc))

@app.route('/evaluateproperty/<uprn>')
def property_warnings(uprn):
    success, result = get_warnings.get_warnings(uprn)
    if success:
        return json.dumps({"success": True, "evaluation": result})
    return json.dumps({"success": False, "error": result})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
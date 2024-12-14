'''
╱╱╱╭━━━╮╱╱╱╭╮╭╮
╱╱╱┃╭━╮┃╱╱╭╯╰┫┃
╭━╮┃╰━╯┣╮╱┣╮╭┫╰━┳━━┳━╮
┃╭╮┫╭━━┫┃╱┃┃┃┃╭╮┃╭╮┃╭╮╮
┃┃┃┃┃╱╱┃╰━╯┃╰┫┃┃┃╰╯┃┃┃┃
╰╯╰┻╯╱╱╰━╮╭┻━┻╯╰┻━━┻╯╰╯
╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╰━━╯
'''

from flask import Flask, request, jsonify,render_template
import sys
import io
from ban_words import ban_words

current_ban = ""
app = Flask(__name__,template_folder='template')

def check_words(code: str) -> bool:
    global current_ban

    for line in code.split('\n'):
        if line.strip() and line[0] != '#':
            for unit in ban_words:
                if unit in line:
                    current_ban = unit
                    return False
                else:
                    pass
        else:
            pass

    return True


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code')

    output = io.StringIO()
    sys.stdout = output

    try:
        if check_words(code):
            exec(code)
        else:
            print(f"Error: '{current_ban}' detected")

    except Exception as e:
        return jsonify({'output': str(e)})
    finally:
        sys.stdout = sys.__stdout__

    return jsonify({'output': output.getvalue()})

if __name__ == '__main__':
    app.run(debug=True)

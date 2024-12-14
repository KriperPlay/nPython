/*
╱╱╱╭━━━╮╱╱╱╭╮╭╮
╱╱╱┃╭━╮┃╱╱╭╯╰┫┃
╭━╮┃╰━╯┣╮╱┣╮╭┫╰━┳━━┳━╮
┃╭╮┫╭━━┫┃╱┃┃┃┃╭╮┃╭╮┃╭╮╮
┃┃┃┃┃╱╱┃╰━╯┃╰┫┃┃┃╰╯┃┃┃┃
╰╯╰┻╯╱╱╰━╮╭┻━┻╯╰┻━━┻╯╰╯
╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╰━━╯
*/

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "python",
    theme: "default", 
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4
});

document.getElementById('run').onclick = function() {
    const code = editor.getValue();

    fetch('/run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = data.output;
    })
    .catch(error => {
        document.getElementById('result').textContent = 'Error: ' + error;
    });
};


window.onkeydown = function(event) {
    if (event.ctrlKey && event.keyCode === 18) {
        const code = editor.getValue();

        fetch('/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.output;
        })
        .catch(error => {
            document.getElementById('result').textContent = 'Error: ' + error;
        });
}}

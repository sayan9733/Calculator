const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/calculator', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
});

app.get('/calculate', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
});

app.get('/calculate_result', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator_result.html'));
});

app.post('/calculate', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        // Parse num1, num2, and operator from the query string
        const num1 = parseFloat(body.split('&')[0].split('=')[1]);
        const num2 = parseFloat(body.split('&')[1].split('=')[1]);
        const operator = body.split('&')[2].split('=')[1];
        let result;

        // Check if the numbers are valid
        if (isNaN(num1) || isNaN(num2)) {
            result = 'Invalid numbers';
        } else {
            // Perform calculation based on operator
            if (operator === 'add') {
                result = num1 + num2;
            } else if (operator === 'subtract') {
                result = num1 - num2;
            } else if (operator === 'multiply') {
                result = num1 * num2;
            } else if (operator === 'division') {
                if (num2 === 0) {
                    result = 'Cannot divide by zero';
                } else {
                    result = num1 / num2;
                }
            } else {
                result = 'Invalid operator';
            }
        }

        // Send the result back in HTML format
        res.send(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #ffffffef;
                        }
                        .calculator_result-box {
                            background: #ffffffef;
                            padding: 40px;
                            border-radius: 30px;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                            width: 300px;
                        }
                        h2 {
                            color: rgb(0, 0, 0);
                            font-weight: bold;
                        }
                        p {
                            font-size: 22px;
                            color: rgb(0, 0, 0);
                            margin: 20px 0;
                        }
                        a {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: #218838;
                            color: white;
                            text-decoration: none;
                            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                            border-radius: 5px;
                            transition: background-color 0.3s;
                        }
                        a:hover {
                            background-color: #218838;
                        }
                    </style>
                </head>
                <body>
                    <div class="calculator_result-box">
                        <h2>Calculation Result</h2><hr>
                        <p>${num1} ${operator} ${num2} = ${result}</p><hr>
                        <a href="/calculator">Go Back to calculator</a>
                    </div>
                </body>
            </html>
        `);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

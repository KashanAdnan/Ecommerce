const emailVerification = (otp, name) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
            font-family: 'Roboto', sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        .verification-link {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size:18px;
        }
    </style>
</head>
<body>
    <div className="container">
        <h1>Email Verification</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering:</p>
        <h6 className="verification-link">
        ${otp}
        </h6>
        <p>If you didn't register on our platform, you can ignore this email.</p>
        <p>Best regards,<br>Your Company Name</p>
        </div>
        </body>
        </html>`;
  return html;
};


export default emailVerification
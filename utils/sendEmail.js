 const nodemailer = require("nodemailer");


const sendEmail = async (email, subject ,Id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "localhost",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "simakasare@gmail.com",
        pass: "spk@12345",
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: 'hello',
      text: 'hello...registration is successfull',
      html : `<h2> hello ...your registration is successfull ,please click on bellow link ${Id} to set your password . thanx` ,


    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;

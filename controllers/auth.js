
   const mysql = require("mysql");

   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: '',
       database: 'project-node'
   
   });

exports.register = (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
 
    db.query('SELECT Email FROM users WHERE email = ?',[email],(error, result) => {
        if(error){
            console.log(error)
        }
        if(result.length > 0){
            return res.render('register',{
                message: 'That email is already in use'
            });
        }else if (password !== confirmpassword){
            return res.render ('register',{
                message: 'The password do not match'
            });
        }
        db.query('INSERT INTO users SET ?' ,{Username : username, Email : email , Password : password}, (error , result) =>{
            if(error){
                console.log(error);
            }else{
                console.log(result);
                 return res.render('register',{
                message: 'User registered successfully '
            });
            }
        })
    });

}





//login page 

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE Email = ?', [email], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    if (results.length === 0 || results[0].Password !== password) {
      return res.render('login', {
        message: 'Incorrect email or password'
      });
    }

    // User found
    return res.render('login', {
      message: 'Login successful!'
    });
  });
};

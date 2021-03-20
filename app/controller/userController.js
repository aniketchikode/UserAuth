const db = require('../config/dbconfig.js');

const User = db.users;

// API for Users List
exports.userslist = (req, res) => {

	let limit = 5;
	const  pageOptions = {
		page: req.params.page || 1,
		limit: limit
	}

    User.findAll({limit:pageOptions.limit,offset: pageOptions.limit * (pageOptions.page - 1)})
    .then(data => {

      res.status(200).json({
          
          success: '200',
          page:pageOptions.page,
          data: data
      
      })
    })

  }
  
// API for Update user info
  exports.UpdateUser = async(req, res) => {

    var data= User.findOne({where:{id: req.params.id}})
    if(data){

			User.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobileno: req.body.mobileno,
        address: req.body.address,
      },{ where: { id: req.params.id } })
      .then(async(user) => {

        res.status(200).json({
					message: 'Updated Successfully.',
    		});

      })
    }
  }
  

  // API for Search 
  exports.SearchUser = (req, res) => {

    let condition ={}
  
        if (req.query.firstname) {
          condition.firstname = req.query.firstname;
        } else if (req.query.lastname) {
          condition.lastname = req.query.lastname;
        } else if (req.query.email) {
          condition.email = req.query.email;
        } else if (req.query.mobileno) {
          condition.mobileno = req.query.mobileno;
        }else {
          condition={}
        }
  
        let limit = 5;
        const  pageOptions = {
          page: req.query.page || 1,
          limit: limit
        }
  
        User.findAll({where: condition ,limit:pageOptions.limit,offset: pageOptions.limit * (pageOptions.page - 1)})
        .then(data => {
  
        res.status(200).json({
            
            success: '200',
            page:pageOptions.page,
            data: data
        
        })
      })
  }
  
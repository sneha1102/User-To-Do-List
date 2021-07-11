const bycrypt = require('bcryptjs')
const jwt = require( "jsonwebtoken" );
require( "dotenv" ).config();

const User = require( '../Models/userModel' );

//SignUp Controller
async function signup(req,res) {

  const salt = await bycrypt.genSalt(10);
	hashpassword = await bycrypt.hash( req.body.password, salt );

	const emailExist = await User.findOne( {email: req.body.email} );
  if(emailExist){
		res.status( 400 ).json( {"error": 'Email already Exist'} );
  }

	const user = new User( {
		name: req.body.name,
		email: req.body.email,
		password: hashpassword
	} );
  try{
		const userInfo = await user.save();
    const payload = {
      user: {
        id: userInfo.id,
      }
    };
		jwt.sign( payload, process.env.secret,function(err, token)
    {
      if(err){
        res.send(err)
      }
      res.status(200).json({
				user: userInfo,
				token,
      })
    })
  } 
  catch(err){
		res.status( 400 ).json( {'error': err} );
  }
}

//Login Controller
async function login(req,res){
	const userExist = await User.findOne( {email: req.body.email} );
  if(!userExist){
		res.status( 400 ).json( {error: "User not registered.Please register first."} );
  }
  const checkpassword = await bycrypt.compare(req.body.password, userExist.password)
  if(!checkpassword){
    res.status(400).json({error:"Password mismatch"})
  }
  const token = jwt.sign({_id: userExist.id},process.env.secret)
	res.header('Authorization',token).json({user: userExist, 'Token':token})
}

// Update user details
async function updateUserDetail ( req, res )
{
	const user = await User.findOne( {email: req.body.email} );
	if ( !user ) {
		res.status( 404 ).json( {error: "User not Found"} );
	}
	const dataToUpdate = {};
	if ( req.body?.age ) {
		dataToUpdate.age = req.body.age;
	}
	if ( req.body?.name ) {
		dataToUpdate.name = req.body.name;
	}
	const updatedUser = await User.findOneAndUpdate( {email: req.body.email}, {$set: dataToUpdate}, {new: true} );
	res.status(200).json(updatedUser);
}

module.exports = {
  signup,
  login,
	updateUserDetail,
}
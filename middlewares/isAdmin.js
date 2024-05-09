module.exports = function isAdmin(){
	return async function(req, res, next){
		const user = await User.findOne({where: {req.session.username}})
		if(!user || user.is_admin != true){
			return res.status(403).send({error: {status:403, message: 'Access Denied'}})
		}
	}
}
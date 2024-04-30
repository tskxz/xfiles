const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema(
	{
		username: {type: String, required: [true, "Please provide a username."], index: {unique: true}},
		email: {type: String, required: [true, "Please provide an email address"]},
		password: {type: String, required: [true, "Please provide a password"]}
	},
	{ timestamps: true }
)

UserSchema.pre('save', function(next) {
	var user = this
	// So faz hash se a pass for modificado ou se for nova pass
	if(!user.isModified('password')) return next()

	// Gerar salt
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err)

			// Faz hash á pass ao usar o salt
			bcrypt.hash(user.password, salt, function(err, hash){
				if(err) return next(err)
				// Mete a pass hashed
				user.password = hash
				next()
			})
	})
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err)
		cb(null, isMatch)
	})
}

const User = mongoose.model("User", UserSchema)

module.exports = User
const mongoose = require('mongoose')
const xFileSchema = mongoose.Schema(
	{
		file_name: {
			type: String,
			required: [true, "Please enter file name"],
		},

		size: {
			type: Number,
			required: true,
		},

		encoding: {
			type: String,
			required: false,
		},

		md5: {
			type: String,
			required: false,
		}

		mimetype: {
			type: String,
			required: true,
		}
	},

	{
		timestamps: true,
	}
)

const xFile = mongoose.model("xFile", xFileSchema)

module.exports = xFile
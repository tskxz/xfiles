const mongoose = require('mongoose')
const xFileSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter file name"],
		},

		size: {
			type: Number,
			required: false,
		},

		encoding: {
			type: String,
			required: false,
		},

		md5: {
			type: String,
			required: false,
		},

		mimetype: {
			type: String,
			required: false,
		},

		filePath: {
			type: String,
			required: false,
		}
	},

	{
		timestamps: true,
	}
)

const xFile = mongoose.model("xFile", xFileSchema)

module.exports = xFile
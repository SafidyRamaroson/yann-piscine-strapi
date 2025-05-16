module.exports = ({ env }) => ({
	upload: {
		config: {
			provider: 'cloudinary',
			providerOptions: {
				cloud_name: env('CLOUDINARY_NAME'),
				api_key: env('CLOUDINARY_API_KEY'),
				api_secret: env('CLOUDINARY_API_SECRET'),
			},
			actionOptions: {
				upload: {},
				uploadStream: {},
				delete: {},
			},
		},
	},
	email: {
		config: {
			provider: 'nodemailer',
			providerOptions: {
				host: env('EMAIL_SMTP_HOST', 'smtp.mailtrap.io'),
				port: env.int('EMAIL_SMTP_PORT', 2525),
				auth: {
					user: env('EMAIL_SMTP_USER'),
					pass: env('EMAIL_SMTP_PASS'),
				},
			},
			settings: {
				defaultFrom: env('EMAIL_ADDRESS_FROM'),
				defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
			},
		},
	},
});
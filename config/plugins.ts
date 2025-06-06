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
			provider: env('EMAIL_PROVIDER'),
			providerOptions: {
				apiKey: env('API_KEY'),
			  },
			settings: {
				defaultSenderEmail: 'safidyramaroson.patrick@gmail.com',
        		defaultSenderName: 'Yann Piscines Web',
        		defaultReplyTo: 'safidyramaroson.patrick@gmail.com',
			},
		},
	},
});
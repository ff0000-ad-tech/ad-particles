const fatJsdoc2md = require('@ff0000-ad-tech/ad-docs')
fatJsdoc2md.createMarkdownFromClasses(
	'ad-particles',
	`${__dirname}/../`,
	`${__dirname}/api.hbs`,
	`${__dirname}/README.hbs`
)

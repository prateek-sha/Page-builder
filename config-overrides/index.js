const { paths } = require('react-app-rewired');

module.exports = function (config, env) {

	config.module.rules.push({
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/
	});

	config.module.rules.push({
		test: /\.js$/,
		enforce: "pre",
		use: ["source-map-loader"],
	})

	config.ignoreWarnings = [/Failed to parse source map/]
	config.resolve.extensions = ['.tsx', '.ts', '.js', '.jsx', '.less'];

	return config;
};


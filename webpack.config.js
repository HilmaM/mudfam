/**
 * Compatible to CK Editor Plugin tool
 * This WebPack
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	performance: { hints: false },
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		}
	},

	output: {
		// The name under which the editor will be exported.
		library: 'ClassicEditor',

		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},{
				test: /\.less$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'less-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},{
						loader: 'css-loader',
						options: {
							modules: true
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					}
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:7180'
        })
	},
}

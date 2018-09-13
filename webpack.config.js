
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  entry: './src/index.ts',
  output: {
    filename: `bundle.js`,
    path: `${__dirname}/build/my-project/assets/js`
  },
 
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // Babel のオプションを指定する
        options: {
          presets: [
            // env を指定することで、ES2018 を ES5 に変換。
            // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
            // webpack の Tree Shaking 機能が使えない
            ['env', {'modules': false}]
          ]
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Webpackで利用するときの設定
    alias: {
    },
    extensions: ['*', '.js', '.json', '.ts']
  },
  plugins: [
    
  ],
  // Configuration for dev server
  devServer: {
    contentBase: `${__dirname}/dist/`,
    watchContentBase: true,
    open: true,
    port: 8000
  },
};

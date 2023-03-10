const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path'); //path라는 전역모듈을 가져와 path에 할당
const webpack = require('webpack');

// webpack 환경변수 지정
const dotenv = require('dotenv'); // dotenv 패키지를 가져와 dotenv에 할당
dotenv.config(); // dotenv.config 실행

module.exports = (env, argv) => {
  const prod = argv.mode === 'production';

  return {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'hidden-source-map' : 'eval',

    // 파일을 읽어들이기 시작하는 진입점 설정 , webpack은 js를 진입점으로 사용
    entry: './src/index.tsx',
    // 결과물(번들)을 반환하는 설정
    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    //모듈에 적용할 여러가지 로더들과 그 옵션들을 추가하는 부분.
    // jsx,tsx,ts,js 해석을 위한 babel로더 설정
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: '/node_modules/',
          loader: 'babel-loader',
        },
        {
          test: /\.(tsx|ts)?$/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|webp|mp4|webm)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new HtmlWebpackPlugin({
        // HTML 파일에 번들링 된 자바스크립트 파일을 삽입해주고 이 플러그인으로 빌드하면 HTML 파일로 아웃풋에 생성
        template: './public/index.html',
        env: process.env,
        minify:
          process.env.NODE_ENV === 'production'
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(), // 번들링을 할 때마다 이전 번들링 결과를 제거
      // process.env를 전역에서 접근 가능하게 지정
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
    ],
  };
};

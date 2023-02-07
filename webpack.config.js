const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path'); //path라는 전역모듈을 가져와 path에 할당
const webpack = require('webpack');

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
    },
    // 개발환경서버 포트 3000으로 변경.
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new HtmlWebpackPlugin({
        // HTML 파일에 번들링 된 자바스크립트 파일을 삽입해주고 이 플러그인으로 빌드하면 HTML 파일로 아웃풋에 생성
        template: './public/index.html',
        minify:
          process.env.NODE_ENV === 'production'
            ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
              }
            : false,
      }),
      new CleanWebpackPlugin(), // 번들링을 할 때마다 이전 번들링 결과를 제거
    ],
  };
};

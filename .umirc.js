
// ref: https://umijs.org/config/
const routes = require("./src/routes")
export default {
  treeShaking: true,
  publicPath:'/',
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'route-demo',
      dll: true,
      
    }],
  ],
}

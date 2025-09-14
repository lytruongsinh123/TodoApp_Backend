import express from "express";
/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static("./src/public")); // cho phép truy cập file hình ảnh file css file javascript
    app.set("view engine", "ejs"); // cấu hình app sử dụng view engine là ejs
    app.set("views", "./src/views"); // tất cả các file view sẽ được đặt trong thư mục src/views
}
export default configViewEngine;
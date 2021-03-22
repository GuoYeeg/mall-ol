module.exports = {
  devServer: {
      proxy: "http://localhost:8000"
  }
}
/*
module.exports={
    devServer:{
        port:8090,
        host:"127.0.0.1",
        open:true,
		proxy : {
			"/api" : {
				target : "http://47.111.136.117",
				changeOrigin : true,
				pathRewrite : {
					"^/api" : "/"
				}
			}
		}
	},
}
*/
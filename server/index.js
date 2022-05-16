const express =require('express')
const home = require('./home/index')
let app = new express()

app.get('/api/index',home )

app.listen(3000, () => {
	console.log('服务已启动')
})

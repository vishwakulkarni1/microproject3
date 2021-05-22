const http = require("http");
const server = http.createServer(
	function f1(request,response)
        {
    		response.write('Hello World\n');
		response.end();
	}
       );
	server.listen(9000,function()
	{
	   console.log('Server is running....');
	});	
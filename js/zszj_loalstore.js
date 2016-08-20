/**
 * 下载图书到本地存储
 * @param {Object} bookName
 */
function downloadBook(bookName){
	if(eval ("(" + plus.storage.getItem(bookName) + ")")  == null){
	mui.ajax(getServerHost()+"/downloadBook/"+bookName,{
					dataType:'html',//服务器返回json格式数据
					type:'get',//HTTP请求类型
					timeout:10000,//超时时间设置为10秒；changeTwoDecimal_f
					async:false,
					success:function(data){
						data = eval ("(" + data + ")");
						var obj= JSON.stringify(data);
						plus.storage.setItem(bookName, obj);
						//data = eval ("(" + plus.storage.getItem(bookName) + ")");
					},
					error:function(xhr,type,errorThrown){
						console.log(type);
						alert("请检查您的设备是否连接至互联网！");
					}
				});
			}else{
				alert("图书已存在");
			}
}

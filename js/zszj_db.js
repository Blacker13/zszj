/**本地数据库相关信息*/
var dbname = 'localBooks';	//数据库名
var version = '1.0';	//版本号
var description = 'local db for ZSZJ books';	//描述信息
var maxSize = '1024*1024*20';//最大值
var dbObj = null;	//数据库对象，使用单子模式

var isExit = false;

/**打开数据库*/
function openDB() {  
        html5sql.openDatabase(dbname, description, maxSize);
    }  

/**创建表格*/
function createTable(){
	  html5sql.process(
     [
         "create table if not exists localBooks(bookName text,bookEname text,bookId text,bookSort text,bookYear text,bookNumber text,bookAuthor text,bookPress text,pressDate INTEGER,bookContent text)",
         "create table if not exists bookContents(bookName text,chapterName text,sectionName text,sectionContent text,sectionSort INTEGER)",
     ],
     function(){
         console.log("Success Cretating Tables");
     },
     function(error, statement){
         console.error("Error: " + error.message + " when processing " + statement);
     }        
 );
}

/**插入数据*/
function insertBookData(bookName,bookContent,bookSort){
	//判断数据库中是否已经存在该图书，如果不存在，则插入记录
	//alert(bookSort);
	html5sql.process(
				     [	{
				         "sql" : "select * from localBooks where bookName = ?;",
				         "data" : [bookName],
         				"success": function(transaction, results){
         						if(results.rows.length==0){
         							simpleSQL3("insert into localBooks (bookName,bookContent,bookSort)  values (?,?,?);",bookName,bookContent,bookSort);
         						}
				        	}, 
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
	);
	}
	
 
 function insertT(bookName,bookContent){
 	html5sql.process(
				     [	{
				         "sql" : "insert into localBook00s (bookName,bookContent)  values (?,?);",
				         "data" : [bookName,bookContent]
				        }
				     ],
				     function(){
				         console.log("Success Insert Data");
				         //alert("111");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
			);
}
/**查询函数*/
function loadData(bookName){
	 html5sql.process(
     [	{
         "sql" : "select * from localBooks where bookName = ?",
         "data" : [bookName],
         "success": function(transaction, results){
           if(results.rows.length>0){  
//         	for(var i=0;i<results.rows.length;++i)
//         		//alert(results.rows.item(i).bookName);
         
           }
      	},
        }
     ],
     function(){
         console.log("Success Cretating Tables");
     },
     function(error, statement){
         console.error("Error: " + error.message + " when processing " + statement);
     }        
 );
}

/**该函数将Integer格式转化为时间*/
function formatDate(format)  
{  
    var o = {  
    "M+" : this.getMonth()+1, //month  
    "d+" : this.getDate(),    //day  
    "h+" : this.getHours(),   //hour  
    "m+" : this.getMinutes(), //minute  
    "s+" : this.getSeconds(), //second  
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter  
    "S" : this.getMilliseconds() //millisecond  
    }  
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,  
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));  
    for(var k in o)if(new RegExp("("+ k +")").test(format))  
    format = format.replace(RegExp.$1,  
    RegExp.$1.length==1 ? o[k] :  
    ("00"+ o[k]).substr((""+ o[k]).length));  
    return format;  
}  

/**
 *简单SQL执行语句，包含一个参数
 * @param {Object} sql
 * @param {Object} param
 */
function simpleSQL(sql,param){
	html5sql.process(
				     [	{
				         "sql" : sql,
				         "data" : [param]
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
				);
}
/**
 * 简单SQL语句，包含两个参数
 * @param {Object} sql
 * @param {Object} param1
 * @param {Object} param2
 */
function simpleSQL2(sql,param1,param2){
	html5sql.process(
				     [	{
				         "sql" : sql,
				         "data" : [param1,param2]
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
				);
}
/**
 * SQL执行，带三个参数
 * @param {Object} sql
 * @param {Object} param1
 * @param {Object} param2
 * @param {Object} param3
 */
function simpleSQL3(sql,param1,param2,param3){
	html5sql.process(
				     [	{
				         "sql" : sql,
				         "data" : [param1,param2,param3]
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
				);
}
/**
 * 判断元素是否存在
 * @param {Object} sql
 * @param {Object} param
 */
function isExisted(sql,param){
	html5sql.process(
				     [	{
				         "sql" : sql,
				         "data" : [param],
         				"success": function(transaction, results){
         						if(results.rows.length>0){
         							isExit = true;
         							alert(isExit);
         						}
				        	}, 
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
			);
}

function insertBookSection(bookName,chapterName,sectionName,sectionContent,sectionSort){
	html5sql.process(
				     [	{
				         "sql" : "insert into bookContents (bookName,chapterName,sectionName,sectionContent,sectionSort) values(?,?,?,?,?);",
				         "data" : [bookName,chapterName,sectionName,sectionContent,sectionSort],
         				"success": function(transaction, results){
				        	}, 
				        }
				     ],
				     function(){
				         console.log("Success do insertBookSection");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
			);
}

/**
 * js调试，查看数据是否插入成功
 */
function checkBook(bookName){
	html5sql.process(
				     [	{
				         "sql" : "select * from bookContents where bookName =?",
				         "data" : [bookName],
         				"success": function(transaction, results){
         					if(results.rows.length>0){
         						alert(results.rows.length);
         					}else{
         						alert("bbb");
         					}
				        	}, 
				        }
				     ],
				     function(){
				         console.log("Success do sql");
				     },
				     function(error, statement){
				         console.error("Error: " + error.message + " when processing " + statement);
				     }        
			);
}

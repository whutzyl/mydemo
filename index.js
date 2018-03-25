var express = require('express');
var router = express.Router();
var http = require('http')
var https = require('https')
var cheerio = require('cheerio')
var fs = require('fs')
/* GET home page. */
var html=''
var arrAll = []
var arr1 = []
var arr2 = []
var arr3 = []
var temp =''
var num = 0
var baseUrl = 'https://www.huaweicloud.com/'
function fileterData(html){
  var $=cheerio.load(html)
  var test=$('a')
  // console.log(test)
}

function findUrl(html,array){
        var $ = cheerio.load(html)
        var href_url_a = $('html').find('a')
        // console.log($(href_url_a[2]).attr('href'))
        for (var i = 0; i < href_url_a.length; i++) {
            if ($(href_url_a[i]).attr('href') == '' || $(href_url_a[i]).attr('href') == null) {
            }else{
                if ($(href_url_a[i-1]).attr('href') == $(href_url_a[i]).attr('href')) {

                }
                else{
                    var Str = $(href_url_a[i]).attr('href')
                    if (Str.substring(0,4) == 'http') {
                      if(arrAll.indexOf($(href_url_a[i]).attr('href'))==-1){
                        arrAll.push($(href_url_a[i]).attr('href'))
                        array.push($(href_url_a[i]).attr('href'))
                        // console.log(i)
                        temp += $(href_url_a[i]).attr('href')+'\n'
                        num++
                      }
                        
                    }
                }
            }
        }

        fs.writeFile('url.txt','【抓取到<'+baseUrl+'>页面数： '+num+' 个】：'+'\n'+'\n'+temp,function(err){
            if (err)
                throw err
        })
        console.log('\n'+'||这个页面一共有'+num+'链接.')
    }


    // setTimeout(function(){
    //   for(var j=0;j<3;j++){
    //     web_crawler(arr[j])
    //   }
    // },3000)
    web_crawler(baseUrl,arr1)
    setTimeout(function(){
      for(var j=0;j<arr1.length;j++){
        web_crawler(arr1[j],arr2)
      }
    },5000)

    function web_crawler(url,arr){
        if (url.substring(0,5) == 'https') {
          console.log(url)
            https.get(url,function(res){
                res.on('data',function(chunk){
                    html += chunk
                    console.log('正在爬取...')
                })
                res.on('end',function(){
                    findUrl(html,arr)
                    console.log('抓取完毕！')
                }).on('error',function(e){
                    console.log('错误访问...')
                })
            })
        }else{
            http.get(url,function(res){
                res.on('data',function(chunk){
                    html += chunk
                    console.log('正在爬取...')
                })
                res.on('end',function(){
                    console.log('抓取完毕！')
                    findUrl(html,arr)
                }).on('error',function(e){
                    console.log('错误访问...')
                })
            })
        }
    }
    web_crawler(baseUrl)













router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  http.get('',function(res){
    res.on('data',function(chunk){
      html+=chunk
    })
    res.on('end',function() {
      // console.log(html)
      fileterData(html)
    })
  })
});

module.exports = router;

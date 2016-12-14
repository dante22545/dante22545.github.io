//创建模块  加入依赖项
var app = angular.module('app',['ionic'])

app.value('baseUrl','http://localhost:3000/api/v1')

app.service('mService',['baseUrl','$http',function(baseUrl,$http){
    this.name = "mService"
    //此方法接收一个回调函数
    this.getData = function(type,page,callback){
        
        $http.get('/data/book_'+type+'.json')
            .success(function(res){
                callback(res.splice((page-1)*10,10))
            })
    }
}])

app.controller('mainCtrl',['$scope','$ionicLoading','$ionicSideMenuDelegate','mService','baseUrl',function ($s,$ionicLoading,$ismd,m_s,baseUrl) {  

    loadData()

    $s.pageIndex = 0
    $s.type = 'ertong'
    $s.books = []
    $s.changeBookType = function(type){
        $s.type = type
        $s.pageIndex = 0
        loadData()
        $s.books = []
    }

    $s.loadMore = function(){
        console.log('loading...')

        loadData()
    }

    function loadData(){
        $s.pageIndex += 1
        m_s.getData($s.type,$s.pageIndex,function(res){
            $s.books = $s.books.concat(res) //把数据绑定到$scope中
            $s.$broadcast('scroll.infiniteScrollComplete');
        })
    }


    $s.doClick = function(){
        // 弹出loading窗口
        $ionicLoading.show({
            template:'Loading...<br><a href="http://www.baidu.com">百度</a>',
            // templateUrl:''    //模板文件路径
            noBackdrop:true,     //是否没有背景
            duration:3000        //存在时间
        })
    }

    $s.toggleSideMenu = function () {  
        // 侧边栏从右边出来
        $ismd.toggleRight()
    }
    $s.toggleSideMenuLeft = function () {  
        // 侧边栏从右边出来
        $ismd.toggleLeft()
    }
    
}])


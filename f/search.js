/**
 * Created by jiaoyang on 2018-5-9.
 */
$(document).ready(function(){
    $("#searchgo").click(function(){	
        searchCall(1,false);
    });
    $("#secondSearchgo").click(function(){
        searchCall(2,false);
    });
});

function isCnSearch(str){
    for(var i = 0;i < str.length;i++){
        var s = str.charCodeAt(i);
        if(s>128){
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(reg.test(str)){
                return true;
            }

        }
    }
    return false;
}

function openSearchPage(searchUrl,isBlank){
    console.log(searchUrl);
    if(isBlank==true){
        window.open(searchUrl);
    }else{
    	window.location.href = searchUrl;
    }
}

function searchCall(searchType,isBlank){
    var sfield = $("#searchKey").val();
    var searchValue = $("#svalue").val();
    var secondSearchField = '';
    var secondSearchValue = '';
    var searchUrl = '';
    if(sfield=='pdfContent'){
        searchUrl = "/search/book/paperSearch?searchField=pdfContent&searchValue="+searchValue;
    }else {
        if(sfield == 'name'){
            var iscn = isCnSearch(searchValue);
            if(!iscn){
            	sfield = "nameENG";
            }
        }
        searchUrl = "/search/book/query?searchField="+sfield+"&searchValue="+searchValue;
    }
	console.log(searchUrl);

    //直接搜索
    if(searchType==1){
        if(searchValue != null&&searchValue!=""){
            openSearchPage(searchUrl,isBlank);
        }
        return;
    }else if(searchType==2){
        //二次检索
    	 secondSearchField = $("#secondSearchKey").val();
         secondSearchValue = $("#secendVal").val();
         
        if(secondSearchField=='pdfContent'){
            searchUrl = "/search/book/paperSearch?searchField="+sfield+"&searchValue="+searchValue;
        }

        if(secondSearchField!=null&&secondSearchField!=""&&secondSearchValue!=null&&secondSearchValue!=""){
            searchUrl+="&secondSearchField="+secondSearchField+"&secondSearchValue="+secondSearchValue;
        }

        //中图法分类
        var ztfSeq =$("#ztfSeq").val();
        if(ztfSeq!=null&&ztfSeq!=''){
            searchUrl+="&ztfSeq="+ztfSeq;
        }
        //教育部分类
        var eduSeq =$("#eduSeq").val();
        if(eduSeq!=null&&eduSeq!=''){
            searchUrl+="&eduSeq="+eduSeq;
        }
        //直接搜索
        openSearchPage(searchUrl,isBlank);
        return;
        
    }else {
        //作者   // authorValue  publisherValue publishYearValue langeValue
    	 secondSearchField = $("#secondSearchKey").val();
         secondSearchValue = $("#secendVal").val();
         
        if(secondSearchField!=null&&secondSearchField!=""&&secondSearchValue!=null&&secondSearchValue!=""){
            searchUrl+="&secondSearchField="+secondSearchField+"&secondSearchValue="+secondSearchValue;
        }
        
        var authorValue =$("#authorValue").val();
        if(authorValue!=null&&authorValue!=''){
            searchUrl+="&authorValue="+authorValue;
        }
        //出版社
        var publisherValue =$("#publisherValue").val();
        if(publisherValue!=null&&publisherValue!=''){
            searchUrl+="&publisherValue="+publisherValue;
        }
        //出版年
        var publishYearValue =$("#publishYearValue").val();
        if(publishYearValue!=null&&publishYearValue!=''){
            searchUrl+="&publishYearValue="+publishYearValue;
        }

        //语种
        var langeValue =$("#langeValue").val();
        if(langeValue!=null&&langeValue!=''){
            searchUrl+="&langeValue="+langeValue;
        }
        
        
        var  ztfSeq = $("#ztfSeq").val();
        if(classZtf!=null&&classZtf!=''){
            searchUrl+="&ztfSeq="+classZtf;
        }

        var classEdu =$("#eduSeq").val();
        if(classEdu!=null&&classEdu!=''){
            searchUrl+="&eduSeq="+classEdu;
        }

        //中图法分类
        var  classZtf = $("#classZtf").val();
        if(classZtf!=null&&classZtf!=''){
            searchUrl+="&classZtf="+classZtf;
        }

        var classEdu =$("#classEdu").val();
        if(classEdu!=null&&classEdu!=''){
            searchUrl+="&classEdu="+classEdu;
        }


        var page = $("#pageNo").val();

        if(page!=null&&page!=''){
            searchUrl+="&pageNo="+page;
        }

        var sort = $("#sort").val();

        if(sort!=null&&sort!=''){
            searchUrl+="&sort="+sort;
        }

        var direc = $("#direc").val();

        if(direc!=null&&direc!=''){
            searchUrl+="&direc="+direc;
        }
        openSearchPage(searchUrl,isBlank);
    }
}

function searchedFilterAll(urlRequest,isBlank){
	var url = urlRequest?urlRequest:window.location.href;
	var urlReq = null;
	var searchType = 0;
	if(url){
		var index = url.search(/\?/i);
		if(index){
			var urlParam = url.substring(index+1);
			var urlReq = url.substring(0,index+1);
			var paramArr = urlParam.split("&");
			if(paramArr.length > 0){
				for(var i=0;i<paramArr.length;i++){
					var str = paramArr[i];
					if(str.search(/searchField/i) > -1){
						urlReq += str;
						urlReq += "&"
						searchType = 1;
						continue;
					}
					if(str.search(/searchValue/i) > -1){
						urlReq += str;
						urlReq += "&"
						searchType = 1;
						continue;
					}
					if(str.search(/secondSearchField/i) > -1){
						urlReq += str;
						urlReq += "&"
						searchType = 2;
						continue;
					}
					if(str.search(/secondSearchValue/i) > -1){
						urlReq += str;
						urlReq += "&"
						searchType = 2;
						continue;
					}
					
				}
			}
			console.log(urlReq);
		}
	}
	if(urlReq){
		 openSearchPage(urlReq,isBlank);
	}
}


angular.module('starter.services',[])
.service('ADLookupService', ['$http', '$q' ,function($http, $q){
	var data = {};
	var d = $q.defer();
	data.Users = [];
	
	var serviceBaseUrl = 'http://fqqkmv1.dist.target.com/ADSearcherApi/api/ADSearch/getusers';
	var getUsers = function(groupName){
		var finalUrl = serviceBaseUrl + "?groupName=" + groupName;
		$http.get(finalUrl).success(function(responseData){
			angular.forEach(responseData, function(user){
				data.Users.push(user);
			});
			console.log('service returned : '+ data.Users.length + " users");
			d.resolve();
		}).error(function(data){
			console.log('Error in service call : ' + data);
			d.reject();
		})
		return d.promise;
	}

	return {
		data : data,
		getUsers : getUsers
	}
}]);
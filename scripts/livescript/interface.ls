$ !->
	# $tab_cnts = $ \.tab-cnt
	# $ '.tabs a' .click ->
	# 	$this = $(@)
	# 	$tab_cnts.removeClass \selected .filter $this.attr \href .addClass \selected
	# 	$this.parent!addClass \selected .siblings!removeClass \selected
		
	# 	false



Details_Controller = !($scope)-> $scope.data = DATA.details
Education_Controller = !($scope)-> $scope.data = DATA.education
Events_Controller = !($scope)-> $scope.data = DATA.events
Skills_Controller = !($scope)-> $scope.data = DATA.skills
Freelance_Controller = !($scope)-> $scope.data = DATA.freelance
Experience_Controller = !($scope)-> $scope.data = DATA.experience

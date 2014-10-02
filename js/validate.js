function validate (formId){
	var form = document.getElementById(formId);
	var formInputs = form.getElementsByClassName("validate");
	var validationArray = [];
	for(var i = 0 ; i < formInputs.length ; i++){
		var classMethods = validateTypes(formInputs[i].getAttribute('class'));
		validationArray.push(new targetedInputs(formInputs[i] , classMethods));
	}
	form.onsubmit = methodsCaller;
	var massages = {
		email: "email error",
		length: "lengthmax error"
	}
	var validateMethods = {
		email: function(){
			return false;
		},
		length: function(){
			return false;
		}
	};
	function methodsCaller (){
    	for( eleNum in validationArray){
    		validationElement = validationArray[eleNum]['element'];
    		elementValidationMethods = validationArray[eleNum]['assignedMethods'];
    		for(methodNum in elementValidationMethods) {
    			var flag = validateMethods[elementValidationMethods[methodNum]]();
    			if(flag == false){
    				var node = document.createElement("span");
    				node.innerHTML = massages[elementValidationMethods[methodNum]];
    				var child = form.children[findRow3(validationElement)];
        			form.insertBefore(node, child);
    				break;
    			}
    		}
    	}
    	return false;
	}
	function targetedInputs(input , marray){
		this.element = input;
		this.assignedMethods = marray;
	}
	function validateTypes(str){
		var res = str.match(/(validate)\-[0-9a-zA-Z\-]+/g);
		var methodsArray = [];
		for(matches in res){
			methodsArray.push(res[matches].replace("validate-",""));
		}
		return methodsArray;
	}
	function findRow3(node)
	{
	    var i = 1;
	    while (node = node.previousSibling) {
	        if (node.nodeType === 1) { ++i }
	    }
	    return i;
	}
}
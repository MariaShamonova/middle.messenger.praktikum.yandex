export function handlerButtonClick(elementId, callback, ...props){
	
	document.addEventListener("click", function(evn){
		
		const target = evn.target.closest(elementId); 
		console.log(elementId)
		if(target){
			callback(evn, ...props)
		}
	});
}
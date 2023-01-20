import tpl from './login.hbs';
import './login.less';

export default (props = {}) => {
	document.addEventListener("click", function(e){
		const target = e.target.closest("#auth-button"); 
		
		if(target){
			document.location.href = '/'
		}
	});	

	return tpl(props);
}

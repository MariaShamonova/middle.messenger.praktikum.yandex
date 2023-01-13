import tpl from './avatar.hbs';
import './avatar.less';
import { uploadFile } from '../../../utils/uploadFile'

export default (path) => {
	document.addEventListener("click", function(e){
		const target = e.target.closest("#avatar"); 
		
		if(target){
			uploadFile(() => {})
		}
	});
	return tpl({ path });
}

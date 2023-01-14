export function uploadFile(callback) {
  let input = document.createElement('input');
  input.type = 'file';

  input.onchange = e => { 
    let file = e.target.files[0]; 
    callback(file)
  }
  

  input.click();
}

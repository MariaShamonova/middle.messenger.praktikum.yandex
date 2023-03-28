export default function uploadFile(
  { onChangeInput }: { onChangeInput: (file: File) => void },
) {
  const input = document.createElement('input');
  input.type = 'file';

  input.onchange = (evn: Event) => {
    const target = evn.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    onChangeInput(file);
  };

  input.click();
}

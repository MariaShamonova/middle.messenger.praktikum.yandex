export default function getFormValues(form: HTMLFormElement) {
  const inputs = form.querySelectorAll('input');

  return Array.from(inputs).reduce((
    acc: { [key: string]: string },
    input: HTMLInputElement,
  ) => {
    acc[input.name] = input.value;
    return acc;
  }, {});
}

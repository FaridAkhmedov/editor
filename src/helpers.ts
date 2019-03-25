/**
 *
 * @param data
 * @param name
 */
export function downloadDataAsFile(data: string, name: string = 'file.html') {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  return true;
}

import { BlockType } from '../modules/block';

export default function renderDOM(query: string, block: BlockType) {
  const root = document.querySelector(query)!;
  root.innerHTML = '';
  root.appendChild(block.getContent());
  return root;
}

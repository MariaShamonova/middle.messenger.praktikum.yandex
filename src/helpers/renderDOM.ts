import { BlockType } from '../utils/Block';

export default function renderDOM (query: string, block: BlockType) {
  const root = document.querySelector(query)!;
  if (!root) {
    throw new Error('root is null');
  }
  root.innerHTML = '';

  root.appendChild(block.getContent());
  return root;
}

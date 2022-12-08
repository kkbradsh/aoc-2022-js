import { readTextFile } from '../../utils/file';

const FOLDER = 'folder';
const FILE = 'file';
const SEPARATOR = '/';

export const calcFolderSize = (tree, path = '', folder = '/') => {
  const folderIndex = tree.findIndex((item) => {
    return item.path === path && item.name === folder;
  });
  tree.forEach((item) => {
    if (item.path === path + folder) {
      if (item.type === FILE) {
        tree[folderIndex].size = tree[folderIndex].size + item.size;
      } else {
        tree[folderIndex].size =
          tree[folderIndex].size + calcFolderSize(tree, item.path, item.name);
      }
    }
  });
  return tree[folderIndex].size;
};

export const buildTree = (input) => {
  let path = '';
  const tree = [{ type: FOLDER, path, name: SEPARATOR, size: 0 }];
  for (let i = 0; i < input.length; i++) {
    if (input[i].substring(0, 4) === '$ cd') {
      // change folder
      const folder = input[i].replace('$ cd ', '');
      if (folder === '..') {
        path = path.substring(0, path.lastIndexOf(SEPARATOR));
        path = path.substring(0, path.lastIndexOf(SEPARATOR));
        path = path + SEPARATOR;
      } else {
        path = folder === SEPARATOR ? folder : path + folder + SEPARATOR;
      }
    } else if (input[i].substring(0, 4) === '$ ls') {
      // list folder - nothing to do
    } else if (input[i].substring(0, 3) === 'dir') {
      // folder
      tree.push({
        type: FOLDER,
        path,
        name: input[i].replace('dir ', '') + SEPARATOR,
        size: 0,
      });
    } else {
      // file
      const [size, name] = input[i].split(' ');
      tree.push({ type: FILE, path: path, name, size: Number(size) });
    }
  }
  return tree;
};

export const process = async (file) => {
  const input = await readTextFile(file);
  const tree = buildTree(input);
  calcFolderSize(tree);
  return tree.reduce((sum, item) => {
    if (item.type === FOLDER && item.size <= 100000) {
      return sum + item.size;
    } else return sum;
  }, 0);
};

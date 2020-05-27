class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    const insertIndividualNode = (currNode, newNode) => {
      if (newNode.key === currNode.key) {
        currNode.value = newNode.value
      } else if (newNode.key < currNode.key){
        if (!currNode.left){
          currNode.left = newNode;
          this._count += 1;
        } else {
          insertIndividualNode(currNode.left, newNode)
        }
      } else {
        if (!currNode.right){
          currNode.right = newNode;
          this._count += 1;
        } else {
          insertIndividualNode(currNode.right, newNode)
        }
      }
    }

    const node = new this.Node({ key, value });

    if (!this._root) {
      this._root = node;
      this._count += 1;
    } else {
      insertIndividualNode(this._root, node);
    }
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;

class Node {
    constructor(key,value) {
        this.key=key;
        this.value=value;
        this._left=null;
        this._right=null;
        this.color=true;//true 红 false 黑
        this.parent=null
        this.position=null//true 左 false 右
    }

    set left(value){
        if(!value){
            this._left=null;
            return;
        }
        value.parent=this;
        value.position=true;
        this._left=value;
    }

    set right(value){
        if(!value){
            this._right=null;
            return;
        }
        value.parent=this;
        value.position=false;
        this._right=value;
    }

    get left(){
        return this._left;
    }

    get right(){
        return this._right;
    }

    get uncle(){
        if(this.grandpa){
            return this.parent.position?this.grandpa.right:this.grandpa.left;
        }else{
            return null;
        }
    }

    get grandpa(){
        return this.parent?this.parent.parent:null;
    }

    get brother(){
        return this.parent?this.parent[!this.position?"left":"right"]:null;
    }

    get status(){
        switch(this.parent.position){
            case true:
                return this.position?Node.status_enmu.left_left:Node.status_enmu.left_right;
                break;
            case false:
                return this.position?Node.status_enmu.right_left:Node.status_enmu.right_right;
                break;
        }
    }

    get left_color(){
        return this.left?this.left.color:false;
    }

    get right_color(){
        return this.right?this.right.color:false;
    }

    get delete_status(){
        if(this.color) return Node.delete_status_enmu.selfRed;
        let brother=this.brother;
        switch(brother.color){
            case true:
                return Node.delete_status_enmu.brotherRed;
                break;
            case false:
                if(!brother.left_color&&!brother.right_color){
                    return Node.delete_status_enmu.brotherBlack_black_balck;
                }else if(brother.left_color&&brother.right_color){
                    return Node.delete_status_enmu.brotherBlack_red_red;
                }else{
                    return Node.delete_status_enmu.brotherBlack_red;
                }
                break;
        }
    }

    static delete_status_enmu={
        "brotherBlack_red_black":0,
        "brotherBlack_red_red":1,
        "brotherBlack_black_balck":2,
        "brotherRed":3,
        "selfRed":4
    }

    get isleaf(){
        return !this.right&&!this.left;
    }

    changed_node_value(node_a,node_b){
        let tem_value=node_a.value;
        node_a.value=node_b.value;
        node_b.value=tem_value;

        let tem_key=node_a.key;
        node_a.key=node_b.key;
        node_b.key=tem_key;
    }

    changed_node_color(node_a,node_b){
        let tem_color=node_a.color;
        node_a.color=node_b.color;
        node_b.color=tem_color;
    }

    get changed_node(){//返回交换值后值对应的节点
        if(this.isleaf) return this;
        if(this.right&&!this.left){
            this.changed_node_value(this,this.right);
            return this.right.changed_node;
        }else if(this.left&&!this.right){
            this.changed_node_value(this,this.left);
            return this.left.changed_node;
        }else{
            let backnode=this.getbackNode();
            this.changed_node_value(this,backnode);
            return backnode.changed_node;
        }
    }

    getbackNode(){
        let tem_node=this.right;
        while(tem_node){
            if(tem_node.left){
                tem_node=tem_node.left;
            }else{
                return tem_node;
            }
        }
    }

    deleteself(){
        if(this.isleaf){
            this.parent[this.position?"left":"right"]=null;
        }
    }

    static status_enmu={
        "left_left":0,
        "left_right":1,
        "right_left":2,
        "right_right":3
    }

    turn_left(tree){
        let right=this.right;
        this.right=right.left;
        if(this.parent){
            this.parent[this.position?"left":"right"]=right;
        }else{
            right.parent=right.position=null;
        }
        right.left=this;
        this.changed_node_color(this,right);
        if(!right.parent){
            tree.root=right;
            right.color=false;
        }
    }

    turn_right(tree){
        let left=this.left;
        this.left=left.right;
        if(this.parent){
            this.parent[this.position?"left":"right"]=left;
        }else{
            left.parent=left.position=null;
        }
        left.right=this;
        this.changed_node_color(this,left);
        if(!left.parent){
            tree.root=left;
            left.color=false;
        }
    }
}

class RBtree {
    constructor() {
        this.root=null;
    }

    find_node(key){
        if(!this.root){
            return;
        }
        let tem_node=this.root;
        while (tem_node) {
            if(tem_node.key==key){
                return tem_node;
            }
            tem_node=key<tem_node.key?tem_node.left:tem_node.right;
        }
        return null;
    }

    find(key){
        let node=this.find_node(key);
        return node?node.value:null;
    }

    insert(key,value){
        let node=new Node(key,value);
        if(!this.root){
            this.root=node;
            this.root.color=false;
            return;
        }
        let tem_node=this.root;
        let parent=null;
        while (tem_node) {
            parent=tem_node;
            if(tem_node.key==node.key){
                tem_node.value=node.value;
                return;
            }
            tem_node=node.key<tem_node.key?tem_node.left:tem_node.right;
        }
        parent[node.key<parent.key?"left":"right"]=node;
        this.fix_insert(node);
    }

    fix_insert(node){
        if(!node.parent){
            node.color=false;
            return;
        }
        if(!node.parent.color){
            return;
        }
        if(node.uncle&&node.uncle.color){
            node.parent.color=false;
            node.uncle.color=false;
            node.grandpa.color=true;
            this.fix_insert(node.grandpa);
            return;
        }
        switch(node.status){
            case Node.status_enmu.left_left:
                node.grandpa.turn_right(this);
                break;
            case Node.status_enmu.left_right:
                node.parent.turn_left(this);
                node.parent.turn_right(this);
                break;
            case Node.status_enmu.right_right:
                node.grandpa.turn_left(this);
                break;
            case Node.status_enmu.right_left:
                node.parent.turn_right(this);
                node.parent.turn_left(this);
                break;
        }
    }
    
    delete(key){
        let node = this.find_node(key);
        if(node){
            var delete_node=node.changed_node;
            delete_node.deleteself();
            this.fix_delete(delete_node);
        }else{
            return;
        }
    }

    fix_delete(node){
        switch(node.delete_status){
            case Node.delete_status_enmu.brotherBlack_red:
                switch(node.position){
                    case true:
                        switch(node.brother.right_color){
                            case true:
                                node.parent.turn_left();
                                node.uncle.color=false;
                                break;
                            case false:
                                node.brother.turn_right();
                                node.parent.turn_left();
                                node.uncle.color=false;
                                break;
                        }
                        break;
                    case false:
                        switch(node.brother.left_color){
                            case true:
                                node.parent.turn_right();
                                node.uncle.color=false;
                                break;
                            case false:
                                node.brother.turn_left();
                                node.parent.turn_right();
                                node.uncle.color=false;
                                break;
                        }
                        break;
                }
                break;
            case Node.delete_status_enmu.brotherBlack_red_red:
                switch(node.position){
                    case true:
                        node.parent.turn_left();
                        if(node.uncle){
                            node.uncle.color=false;
                        }
                        break;
                    case false:
                        node.parent.turn_right();
                        if(node.uncle){
                            node.uncle.color=false;
                        }
                        break;
                }
                break;
            case Node.delete_status_enmu.brotherBlack_black_balck:
                node.brother.color=true;
                this.fix_delete(node.parent);
                break;
            case Node.delete_status_enmu.brotherRed:
                switch(node.position){
                    case true:
                        node.parent.turn_left();
                        node.parent.color=false;
                        if(node.parent.right){
                            node.parent.right=true;
                        }
                        break;
                    case false:
                        node.parent.turn_right();
                        node.parent.color=false;
                        if(node.parent.left){
                            node.parent.left=true;
                        }
                        break;
                }
                break;
            case Node.delete_status_enmu.selfRed:
                node.color=false;
                return;
                break;
        }
    }
}


function isRBTree(root) {
    // 如果根为空，返回true
    if (root == null) return true;
    // 如果根不是黑色，返回false
    if (root.color != false) return false;
    // 定义一个变量存储黑高
    let bh = 0;
    // 定义一个辅助函数，用来递归检查每个节点
    function check(node, h) {
        // 如果节点为空，返回true
        if (node == null) return true;
        // 如果节点是红色，检查其子节点是否都是黑色
        if (node.color == true) {
            if (node._left && node._left.color == true) return false;
            if (node._right && node._right.color == true) return false;
        } else {
            // 如果节点是黑色，增加黑高
            h++;
        }
        // 如果到达叶子节点，检查黑高是否一致
        if (node._left == null && node._right == null) {
            if (bh == 0) {
                // 如果第一次到达叶子节点，记录黑高
                bh = h;
            } else {
                // 如果不是第一次到达叶子节点，比较黑高是否相等
                if (bh != h) return false;
            }
        }
        // 递归检查左右子树
        return check(node._left, h) && check(node._right, h);
    }
    // 调用辅助函数，从根开始检查
    return check(root, 0);
}

// A function to print a node with its color and value
function printNode(node) {
  let color = node.color ? "R" : "B"; // true for red, false for black
  let key = node.key;
  let value = node.value;
  return `(${color})${key}(${value})`;
}

// A function to print a node with its color and value
// function printNode(node) {
//   let color = node.color ? "R" : "B"; // true for red, false for black
//   let value = node.key;
//   return `(${color})${value}`;
// }

// A function to get the height of a tree
function getHeight(node) {
  if (!node) return 0; // base case: null node has height 0
  return 1 + Math.max(getHeight(node.left), getHeight(node.right)); // recursive case: height is 1 plus the maximum of left and right subtree heights
}

// A function to get the maximum value length of a tree
function getMaxValueLength(node) {
  if (!node) return 0; // base case: null node has value length 0
  return Math.max(printNode(node).length, getMaxValueLength(node.left), getMaxValueLength(node.right)); // recursive case: value length is the maximum of current node value length and left and right subtree value lengths
}

// A function to print a tree level by level using a queue
function printTree(tree) {
  let queue = []; // an array to store the nodes in each level
  let output = ""; // a string to store the output
  let height = getHeight(tree.root); // get the height of the tree
  let maxValueLength = getMaxValueLength(tree.root); // get the maximum value length of the tree
  let space = " ".repeat(maxValueLength); // a string of spaces with the same length as the maximum value length
  queue.push(tree.root); // push the root node into the queue
  while (queue.length > 0) { // while the queue is not empty
    let levelSize = queue.length; // get the size of the current level
    let levelOutput = ""; // a string to store the output of the current level
    let indent = space.repeat(Math.pow(2, height - 1) - 1); // a string of spaces to indent the first node of the current level
    let gap = space.repeat(Math.pow(2, height) - 1); // a string of spaces to separate two nodes in the current level
    levelOutput += indent; // add the indent to the level output
    let null_num=0;
    for (let i = 0; i < levelSize; i++) { // for each node in the current level
      let node = queue.shift(); // remove the first node from the queue
      if (node) { // if the node is not null
        levelOutput += printNode(node).padEnd(maxValueLength, " "); // print the node with its color and value and pad it with spaces to match the maximum value length
        queue.push(node.left); // push the left child into the queue if exists
        queue.push(node.right); // push the right child into the queue if exists
      } else { // if the node is null
        null_num++;
        levelOutput += space; // print a space instead of a node
        queue.push(null); // push two nulls into the queue to represent the missing children
        queue.push(null);
      }
      if (i < levelSize - 1) { // if this is not the last node in the current level
        levelOutput += gap; // add the gap to the level output
      }
    }
    if(null_num==levelSize){
        break;
    } 
    output += levelOutput + "\n"; // add the level output and a new line to the output string
    height--; // decrement the height by one for each level
  }
  return output; // return the output string
}


var tree = new RBtree();
tree.insert(1,"hello");
tree.insert(243,"hello");
tree.insert(27757,"hello");
tree.insert(14,"hello");
tree.insert(4849,"hello");
tree.insert(455,"hello");
tree.insert(945,"hello");
tree.insert(144,"hello");
tree.delete(14);
tree.delete(4849);
console.log(isRBTree(tree.root));
console.log(printTree(tree));
console.log(tree.find(1));

// 定义一个函数，用来交换数组中两个元素的位置
function swap(arr, i, j) {
  // 用一个临时变量保存第i个元素的值
  let temp = arr[i];
  // 将第j个元素的值赋给第i个元素
  arr[i] = arr[j];
  // 将临时变量的值赋给第j个元素
  arr[j] = temp;
}

// 定义一个函数，用来对数组中的一段区间进行快速排序
function quickSort(arr, left, right) {
  if(left>=right){
    return
  }
  var i=left;
  var j=right-1;
  var standindex=right;
  var stand =arr[right];
  while(i<j){
    while(arr[i]<stand&&i<j){
      i++;
    }
    while(arr[j]>stand&&i<j){
      j--;
    }
    swap(arr,i,j)
  }
  if(arr[i]>stand)
  {
    swap(arr,i,right);
  }
  quickSort(arr,left,i-1);
  quickSort(arr,i+1,standindex);
}
function bubbleSort(arr) {
  // 外层循环控制比较轮数，每轮找出一个最大值
  for (let i = 0; i < arr.length - 1; i++) {
    // 内层循环控制每轮比较次数，每次比较相邻两个元素
    for (let j = 0; j < arr.length - 1 - i; j++) {
      // 如果前一个元素大于后一个元素，就交换它们的位置
      if (arr[j] > arr[j + 1]) {
        // 使用解构赋值来交换元素
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回排序后的数组
  return arr;
}

let nowtime= new Date().getTime();
let x=0;
do{
  x++;
// 定义一个测试用的数组
let arr = [48,7,6,841,281,8164,8265,54,8454,878,845,845,4845,45,484,84,84,8,48,65,9845,9565,986,9856,9956,956,99];
// 调用快速排序函数，对整个数组进行排序
quickSort(arr, 0, arr.length - 1);
}while(x<1000000);
console.log(new Date().getTime()-nowtime);

nowtime= new Date().getTime();
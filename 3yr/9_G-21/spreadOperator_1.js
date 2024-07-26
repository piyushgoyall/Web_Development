let arr = [1, 2, 3];
let arr2 = arr; // arr2 = [1,2,3]

arr2.push(4);
arr2.push(5);

console.log(arr2);
console.log(arr); // both arr and arr2 now contain [1,2,3,4,5] to prevent this use spread operator

let arr3 = [...arr2]; // spread operator
arr3.push(6);
arr3.push(7);

console.log(arr3);
console.log(arr2);
console.log(arr3); // now arr3 contains [1,2,3,4,5,6,7] whereas arr2 contains [1,2,3,4,5]



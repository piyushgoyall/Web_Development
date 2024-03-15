function arrayPlusArray(arr1, arr2) {
  let sum=0,sum1=0;
  for(let i=0;i<arr1.length;i++){
    sum+=arr1[i];
    sum1+=arr2[i];
  }
  return sum+sum1;
}

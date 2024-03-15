function noSpace(str){
  let str2 = '';
  for(let i=0;i<str.length;i++){
    if(str[i]!=' '){
      str2+=str[i];
    }
  }
  return str2;
}

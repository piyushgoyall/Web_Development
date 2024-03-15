function arrayDiff(a, b) {
  if(a.length === 0){
    return [];
  }
  if(b.length === 0){
    return a;
  }
  
  let na = a;
  let nb = b;
  a.forEach((arrItem,arrIndex) => {
    
    const ac = na.slice();
    const bc = nb.slice();
    
    if(b.includes(arrItem)){
      na = ac.filter(item => item !==  arrItem);
      nb = bc.filter(item => item !== arrItem);
    }
  });
  console.log(na);
  return na;
}

function points(games) {
  let total=0;
  for(let i=0;i<games.length;i++){
    const value = games[i];
    const arr = value.split(":");
    
    let x = arr[0];
    let y = arr[1];
    if(x>y){
      total=total+3;
    }
    else if(x<y){
      total=total+0;
    }
    else if(x=y){
      total=total+1;
    }
    
  }
  return total;
}

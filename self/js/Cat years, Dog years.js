var humanYearsCatYearsDogYears = function(hy) {
  // Your code here!
  let cy=0,dy=0;
  if(hy>2){
    cy = 24+(hy-2)*4;
    dy = 24+(hy-2)*5
  }
  else if(hy===1){
    cy=15;
    dy=15;
  }
  else if(hy===2){
    cy=24;
    dy=24;
  }
  return [hy,cy,dy];
}

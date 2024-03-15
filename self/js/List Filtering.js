function filter_list(l) {
  // Return a new array with the strings filtered out
  return l.filter(arrItem => arrItem >= 0 && typeof arrItem == 'number')
}

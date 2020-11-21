export default {
  generateRandomColor,
}

function generateRandomColor() {
  // https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
  return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

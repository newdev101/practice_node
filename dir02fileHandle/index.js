const fs = require('fs');

console.log("hello world");


// //write file
// fs.writeFileSync("./log.txt","hello");
// fs.writeFile("./log2.txt","hello from log2",(err)=>{});


// //read file
// var result = fs.readFileSync("./log2.txt","utf-8");
// console.log(result);

// fs.readFile("./log2.txt","utf-8",(err,result)=>{
//      if(err)console.log("err = ",err);
//      else console.log(result);
// });


// //append file
// fs.appendFileSync("./log.txt",`\nrajat jana`);
// fs.appendFile("./log.txt",`\nrajat jana`,"utf-8",(err)=>{});


// //copy file
// fs.copyFileSync("./log.txt","./log2.txt");
// fs.copyFile("./log.txt","./log2.txt",()=>{});

//delete file
// fs.unlinkSync("./log2.txt");
fs.unlink("./log.txt",()=>{});



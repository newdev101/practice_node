function add(a,b){
     return a+b;
}

function sub(a,b){
     return a-b;
}

// //using exports as an object
// exports.add=(a,b)=>a+b;
// exports.sub=(a,b)=>a-b;

// //bulk export
// module.exports ={
//      addNew:add,
//      subNew:sub
// }

module.exports ={
     add,
     sub
}
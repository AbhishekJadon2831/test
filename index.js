
// const frist = (str1) => {
//     let newarra = str1.split(' ')
//     let obj = {}
//     for (let i = 0; i < newarra.length; i++) {
//         let word = newarra[i]
//         if (obj[word]) {
//             obj[word] += 1
//         } else {
//             obj[word] = 1
//         }
//     }
//     for (const word in obj) {
//         if (obj[word] > 1) {
//             return word
//         }
//     }
// }
// let str1 = "hello world hello"
// console.log(frist(str1))



const findIndex =(str1)=>{
    let newArra=str1.split('')
    let obj={}
    for (let i = 0; i < newArra.length; i++) {
    let char= newArra[i]
    if (obj[char]) {
    obj[char].push(i);
    } else {
    obj[char] = [i];
    }
    }
    let tmp=[]
    for (const key in obj) {
    if (obj[key]) {
    tmp.push(key,obj[key])
    }
    }
    return tmp
    }
    let str1="abccccdd"
    console.log(findIndex (str1))

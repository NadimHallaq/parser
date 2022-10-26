import {v4 as uuidv4} from 'uuid';

const color = ["Red","Green","Blue"]
const size = ["Small","Medium","Large"]
const material = ["plastic","Rubber"]


const permutation2 = (a,b) => {
    let result = [];
    if (a.length == 0 && b.length == 0) return result;
    if (a.length == 0) return b;
    if (b.length == 0) return a;
    for(const i of a){
        for(const j of b)
            if(Array.isArray(i))
                result.push([...i,j])
            else result.push([i,j])
    }
    return result;
}

const permutation = (...a) => {
if (a.length == 1)
    return a[0];
else if (a.length == 2) {
    return permutation2(a[0],a[1]);
} else if (a.length > 2){
    let result = [];
    for(const arr of a){
        result = permutation2(result,arr)
    }
    return result;
} else return [];
}

const is_in = (new_v,old_v) => {
    return old_v.filter(n => !new_v.includes(n)) == 0
}

const apply_new_varient = (old_v,new_v) =>{
    let new_dict = {}
    for(const i of new_v)
        new_dict[uuidv4()] = i;
    
    for (let [old_key, old_value] of Object.entries(old_v)) {

        for (let [new_key, new_value] of Object.entries(new_dict)) {

            if(is_in(new_value,old_value)){
                delete new_dict[new_key];
                new_dict[old_key] = new_value;
                break;
            }
        }
    }
    return new_dict;
}

const two_v = permutation(color,size)
console.log(two_v);

const old_v = {
"1":[ 'Red', 'Small' ],
"2":[ 'Red', 'Medium' ],
"3":[ 'Red', 'Large' ],
"4":[ 'Green', 'Small' ],
"5":[ 'Green', 'Medium' ],
"6":[ 'Green', 'Large' ],
"7":[ 'Blue', 'Small' ],
"8":[ 'Blue', 'Medium' ],
"9":[ 'Blue', 'Large' ]
}

const new_v = permutation(color,size,material);
console.log(new_v);

const result = apply_new_varient(old_v,new_v);
console.log(result);

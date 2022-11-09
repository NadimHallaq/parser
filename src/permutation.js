import {v4 as uuidv4} from 'uuid';

const color = ["Red","Green","Blue"]
const size = ["Small","Medium"]
const material = ["Plastic","Rubber"]


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
    let new_list = []
    for(const i of new_v)
        new_list.push({id:uuidv4(),varient:i,status:"new",...i});

        for (let old_varient_row of old_v){
            const old_key = old_varient_row.id;
            const old_value = old_varient_row.varient;
            let found_the_old = false
        for (let new_varient_row of new_list){
            const new_key = new_varient_row.id;
            const new_value = new_varient_row.varient;        
            if(is_in(new_value,old_value)){
                found_the_old = true
                new_list = new_list.filter((v) => v.id !=new_key )
                new_list.push({id:old_key,varient:new_value,status:"old"})
                break;
            }
        }
        if (!found_the_old){
            new_list.push({id:old_key,varient:old_value,status:"del"})
        }
    }
    return new_list;
}

const two_v = permutation(color,size)
console.log(two_v);
const old_v = [
    {id:"1",varient: [ 'Red', 'Small', 'Plastic' ],sku:''},
    {id:"2",varient: [ 'Red', 'Small', 'Rubber' ],sku:''},
    {id:"3",varient: [ 'Red', 'Medium', 'Plastic' ],sku:''},
    {id:"4",varient: [ 'Red', 'Medium', 'Rubber' ],sku:''},
    {id:"5",varient: [ 'Red', 'Large', 'Plastic' ],sku:''},
    {id:"6",varient: [ 'Red', 'Large', 'Rubber' ],sku:''},
    {id:"7",varient: [ 'Green', 'Small', 'Plastic' ] ,sku:''},
    {id:"8",varient: [ 'Green', 'Small', 'Rubber' ],sku:''},
    {id:"9",varient: [ 'Green', 'Medium', 'Plastic' ] ,sku:''},
    {id:"10",varient: [ 'Green', 'Medium', 'Rubber' ],sku:''},
    {id:"11",varient: [ 'Green', 'Large', 'Plastic' ],sku:''},
    {id:"12",varient: [ 'Green', 'Large', 'Rubber' ],sku:''},
    {id:"13",varient: [ 'Blue', 'Small', 'Plastic' ],sku:''},
    {id:"14",varient: [ 'Blue', 'Small', 'Rubber' ],sku:''},
    {id:"15",varient: [ 'Blue', 'Medium', 'Plastic' ],sku:''},
    {id:"16",varient: [ 'Blue', 'Medium', 'Rubber' ],sku:''},
    {id:"17",varient: [ 'Blue', 'Large', 'Plastic' ],sku:''},
    {id:"18",varient: [ 'Blue', 'Large', 'Rubber' ],sku:''}
    ]

const new_v = permutation(color,size,material);
console.log(new_v);

const result = apply_new_varient(old_v,new_v);
console.log(result);

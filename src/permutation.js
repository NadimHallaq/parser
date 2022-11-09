import {v4 as uuidv4} from 'uuid';

const color = ["Red"]
const size = ["Small","Medium","Large"]
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

const applyNewVarient = (oldVarientLst,newVarientLst) =>{
    let newList = [];
    for(const v of newVarientLst)
    newList.push({id:uuidv4(),varient:v,status:"new"});
    
    let isFoundTheOld = false;
    
    for (let oldVarientRow of oldVarientLst){
        isFoundTheOld = false
    for (let newVarientRow of newList){
        if(is_in(newVarientRow.varient,oldVarientRow.varient)){
            newList = newList.filter((v) => v.id !=newVarientRow.id )
            newList.push({id:oldVarientRow.id,varient:newVarientRow.varient,status:"old"})
            isFoundTheOld = true
            break;
            }
        }
    
    if (!isFoundTheOld){
        newList.push({id:oldVarientRow.id,varient:oldVarientRow.varient,status:"del"})
        }
    }
    return newList;
}

const two_v = permutation(color,size)
console.log(two_v);
const oldVarientLst = [
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

const newVarientLst = permutation(color,size,material);
console.log(newVarientLst);

const result = applyNewVarient(oldVarientLst,newVarientLst);
console.log(result);

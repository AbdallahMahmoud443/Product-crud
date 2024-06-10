/**
 * 
 * @param {string} test - The input text to be sliced
 * @param {number} [max=200]  - Max Number Of Charaters before trancation
 * @returns  The Sliced Text from character 0 to 120 or original text if it's lenght less than 200 chars
 */
export const sliceText = (test:string,max:number=100)=>{
    if(test.length >=max){
        test =  `${test.slice(0,65)}....`;
    }
    return test;
}

export const sliceTextTitle = (test:string,max:number=20)=>{
    if(test.length >=max){
        test =  `${test.slice(0,20)}....`;
        
    }
    return test;
}
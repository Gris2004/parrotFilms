import mysql from 'mysql2/promise';

export async function replaceQuestionMarks(text, values = []){
    let valueIndex = 0;
    let result = '';
    for (let i = 0; i < text.length; i++){
        if(text[i] === '?') {
            result += mysql.escape(values[valueIndex++]);
        } else{
            result += text[i];
        }
    }
    return result;
}

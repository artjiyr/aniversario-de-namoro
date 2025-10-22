const inicioRelacionamento = new Date(2024, 9, 26, 0, 0, 0); // 26/10/2024
const agora = new Date();
const diffMs = agora - inicioRelacionamento;

const segundos = Math.floor(diffMs / 1000);
const minutos = Math.floor(segundos / 60);
const horas = Math.floor(minutos / 60);
const dias = Math.floor(horas / 24);
const meses = Math.floor(dias / 30.44); // aproximado
const anos = Math.floor(meses / 12);

console.log(`Você está com a Mari há:`);
console.log(`${anos} anos`);
console.log(`${meses % 12} meses`);
console.log(`${dias % 30} dias`);
console.log(`${horas % 24} horas`);
console.log(`${minutos % 60} minutos`);
console.log(`${segundos % 60} segundos`);

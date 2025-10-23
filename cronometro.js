// Data inicial: 26 de outubro de 2024 às 00:00 (meia-noite)
const START = new Date(2024, 9, 26, 0, 0, 0); // meses em JS: 0=jan, 9=out


// Seleção dos elementos do HTML
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const totalsEl = document.getElementById('totals');
const toggleBtn = document.getElementById('toggleFormat');
const copyBtn = document.getElementById('copyBtn');


let showTotal = false;


function pad(n){return String(n).padStart(2,'0')}


function computeElapsed(from, to){
let years = to.getFullYear() - from.getFullYear();
let months = to.getMonth() - from.getMonth();
let days = to.getDate() - from.getDate();
let hours = to.getHours() - from.getHours();
let minutes = to.getMinutes() - from.getMinutes();
let seconds = to.getSeconds() - from.getSeconds();


if(seconds < 0){ seconds += 60; minutes -= 1; }
if(minutes < 0){ minutes += 60; hours -= 1; }
if(hours < 0){ hours += 24; days -= 1; }
if(days < 0){
const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
days += prevMonth.getDate();
months -= 1;
}
if(months < 0){ months += 12; years -= 1; }


return {years, months, days, hours, minutes, seconds};
}


function computeTotal(from, to){
const diffMs = to - from;
const totalSeconds = Math.floor(diffMs/1000);
const secs = totalSeconds % 60;
const totalMinutes = Math.floor(totalSeconds/60);
const mins = totalMinutes % 60;
const totalHours = Math.floor(totalMinutes/60);
const hrs = totalHours % 24;
const totalDays = Math.floor(totalHours/24);
return {totalDays, hrs, mins, secs};
}


function update(){
const now = new Date();
const elapsed = computeElapsed(START, now);
yearsEl.textContent = elapsed.years;
monthsEl.textContent = elapsed.months;
daysEl.textContent = elapsed.days;
hoursEl.textContent = pad(elapsed.hours);
minutesEl.textContent = pad(elapsed.minutes);
secondsEl.textContent = pad(elapsed.seconds);


const tot = computeTotal(START, now);
totalsEl.textContent = showTotal
? `Total: ${tot.totalDays} dias — ${pad(tot.hrs)}:${pad(tot.mins)}:${pad(tot.secs)}`
: `Total acumulado: ${tot.totalDays} dias`;
}


update();
setInterval(update, 250);


toggleBtn.addEventListener('click', ()=>{
showTotal = !showTotal;
toggleBtn.textContent = showTotal ? 'Voltar ao formato (anos/meses/...)' : 'Mostrar total (dias/h:m:s)';
update();
});


copyBtn.addEventListener('click', async ()=>{
const text = `${yearsEl.textContent} anos, ${monthsEl.textContent} meses, ${daysEl.textContent} dias, ${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}`;
try{
await navigator.clipboard.writeText(text);
copyBtn.textContent = 'Copiado!';
setTimeout(()=> copyBtn.textContent = 'Copiar tempo atual', 1600);
}catch(e){
alert('Não foi possível copiar automaticamente. Selecione e copie manualmente:\n' + text);
}
});
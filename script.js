function showBeranda(){

document.getElementById("berandaArea").style.display="flex";
document.getElementById("daftarArea").style.display="none";
document.getElementById("formTambah").style.display="none";

}

function showTambah(){

let form = document.getElementById("formTambah");

document.getElementById("berandaArea").style.display="none";
document.getElementById("daftarArea").style.display="block";

if(form.style.display === "flex"){
form.style.display = "none";
}else{
form.style.display = "flex";
}

}

function showDaftar(){

document.getElementById("berandaArea").style.display="none";
document.getElementById("daftarArea").style.display="block";
document.getElementById("formTambah").style.display="none";

}

function tambahTugas(){

let mk=document.getElementById("mataKuliah").value;
let tugas=document.getElementById("taskInput").value;
let deadline=document.getElementById("deadline").value;

if(mk=="" || tugas=="" || deadline==""){
alert("Semua kolom harus diisi!");
return;
}

let row=document.createElement("tr");

row.innerHTML=`
<td>${mk}</td>
<td>${tugas}</td>
<td>${deadline}</td>
<td><input type="checkbox" onchange="updateStatistik()"></td>
<td><span class="hapus-btn" onclick="hapusTugas(this)">Hapus</span></td>
`;

document.getElementById("taskList").appendChild(row);

document.getElementById("mataKuliah").value="";
document.getElementById("taskInput").value="";
document.getElementById("deadline").value="";

updateStatistik();
simpanData();

}

function hapusTugas(element){

element.parentElement.parentElement.remove();

updateStatistik();
simpanData();

}

function updateStatistik(){

let rows=document.querySelectorAll("#taskList tr");

let total=rows.length;
let dekat=0;

let today=new Date();

rows.forEach(row=>{

let checkbox=row.querySelector("input[type='checkbox']");

let deadline=row.children[2].innerText;
let d=new Date(deadline);

let selisih=(d - today)/(1000*60*60*24);

if(!checkbox.checked && selisih<=3 && selisih>=0){
dekat++;
}

});

document.getElementById("totalTugas").innerText=total;
document.getElementById("deadlineDekat").innerText=dekat;

}

/* SIMPAN DATA */
function simpanData(){

let data=document.getElementById("taskList").innerHTML;

localStorage.setItem("tugasData",data);

}

/* LOAD DATA SAAT REFRESH */
function loadData(){

let data=localStorage.getItem("tugasData");

if(data){
document.getElementById("taskList").innerHTML=data;
updateStatistik();
}

}

/* JALANKAN SAAT HALAMAN SUDAH DIMUAT */
window.onload = function(){
loadData();
}
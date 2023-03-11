let npm = document.getElementById('npm');
let nama = document.getElementById('nama');
let keterangan = document.getElementById('keterangan');
let dataMhs = document.getElementById('dataMhs');
let btn = document.getElementById('btn');

let arrayMhs = [];


npm.addEventListener("blur", ()=>{
    arrayMhs.forEach(isNpm);
});

let getData = JSON.parse(localStorage.getItem("dataMhs"));
getData.forEach(showMhs);

function showMhs(item, index){
    dataMhs.innerHTML += "<tr id='row"+index+"'><td>"+item[0]+"</td><td>"+item[1]+"</td><td>"+item[2]+"</td><td><button onclick='editMhs("+index+")'>Ubah</button><button onclick='deleteMhs("+index+")'>Hapus</button></td></tr>";
}

function simpanAbsensi(){
    console.log('Button simpan ditekan');
    arrayMhs.push([npm.value, nama.value,keterangan.value]);

    if(localStorage.getItem("dataMhs") === null){
        console.log('localStorage kosong');
        localStorage.setItem("dataMhs", JSON.stringify(arrayMhs));
    }else{
        console.log('localStorage ada isinya');
        let getDataLs = JSON.parse(localStorage.getItem("dataMhs"));
        getDataLs.push([npm.value, nama.value,keterangan.value]); 
        localStorage.setItem("dataMhs", JSON.stringify(getDataLs));
    }
    
    dataMhs.innerHTML = "";
    let getDataLs = JSON.parse(localStorage.getItem("dataMhs"));
    getDataLs.forEach(showMhs);
    npm.value = "";
    nama.value = "";
    keterangan.value = "";
}

function isNpm(item, index, array){
    console.log(array);
    if(arrayMhs[index].includes(npm.value)==true){
        alert("Npm: "+ npm.value+" sudah ada di dalam array");
        npm.value = "";
    }
}

function deleteMhs(n){
    console.log('Button hapus ditekan');
    let getDataLs = JSON.parse(localStorage.getItem("dataMhs"));

    getDataLs.splice(n, 1);
    localStorage.setItem("dataMhs", JSON.stringify(getDataLs));

    let row = document.getElementById('row'+n);
    row.remove(); 
}

function editMhs(n){
    console.log('Button ubah ditekan');
    let getDataLs = JSON.parse(localStorage.getItem("dataMhs"));
    npm.value = getDataLs[n][0];
    nama.value = getDataLs[n][1];
    keterangan.value = getDataLs[n][2];
    
    npm.setAttribute("disabled", true);
    btn.setAttribute("onclick", "updateMhs("+n+")");
}

function updateMhs(n){
    console.log('Proses ubah dilakukan pada indeks ke-'+n);
    let getDataLs = JSON.parse(localStorage.getItem("dataMhs"));
    getDataLs.splice(n, 1, [npm.value, nama.value,keterangan.value]);

    localStorage.setItem("dataMhs", JSON.stringify(getDataLs));
    dataMhs.innerHTML = "";
    getDataLs.forEach(showMhs);
}

/* ===================================
FACTORY SYSTEM
APP.JS PART 1
إدارة العمال
=================================== */

/* إنشاء المصفوفة إذا لم تكن موجودة */

if (!localStorage.getItem("workers")) {
localStorage.setItem("workers", JSON.stringify([]));
}

/* تحميل العمال */

function getWorkers() {
return JSON.parse(
localStorage.getItem("workers")
) || [];
}

/* حفظ العمال */

function saveWorkers(workers) {
localStorage.setItem(
"workers",
JSON.stringify(workers)
);
}

/* إضافة عامل */

function addWorker() {

```
let name =
    document.getElementById("workerName").value;

let username =
    document.getElementById("workerUser").value;

let password =
    document.getElementById("workerPass").value;

let department =
    document.getElementById("workerDepartment").value;

if (
    name === "" ||
    username === "" ||
    password === ""
) {
    alert("أكمل جميع البيانات");
    return;
}

let workers = getWorkers();

let exists =
    workers.find(
        worker =>
            worker.username === username
    );

if (exists) {
    alert("اسم المستخدم موجود بالفعل");
    return;
}

let worker = {

    id: Date.now(),

    name: name,

    username: username,

    password: password,

    department: department,

    phone: "",

    address: "",

    nationalId: "",

    birthDate: "",

    image: "",

    role: "worker",

    approved: false,

    createdAt:
        new Date().toLocaleString()

};

workers.push(worker);

saveWorkers(workers);

alert("تم إضافة العامل");

clearWorkerForm();

renderWorkers();
```

}

/* تنظيف النموذج */

function clearWorkerForm() {

```
document.getElementById("workerName").value = "";

document.getElementById("workerUser").value = "";

document.getElementById("workerPass").value = "";
```

}

/* عرض العمال */

function renderWorkers() {

```
let table =
    document.getElementById(
        "newWorkersTable"
    );

if (!table) return;

let workers = getWorkers();

table.innerHTML = "";

workers.forEach(worker => {

    table.innerHTML += `
    <tr>

        <td>${worker.name}</td>

        <td>${worker.department}</td>

        <td>
            ${
                worker.approved
                    ? "مقبول"
                    : "بانتظار المراجعة"
            }
        </td>

        <td>

            <button
            onclick="approveWorker(${worker.id})">
            موافقة
            </button>

            <button
            onclick="deleteWorker(${worker.id})">
            حذف
            </button>

        </td>

    </tr>
    `;

});
```

}

/* موافقة العامل */

function approveWorker(id) {

```
let workers = getWorkers();

workers = workers.map(worker => {

    if (worker.id === id) {

        worker.approved = true;

    }

    return worker;

});

saveWorkers(workers);

renderWorkers();
```

}

/* حذف عامل */

function deleteWorker(id) {

```
if (
    !confirm("هل تريد حذف العامل ؟")
) {
    return;
}

let workers =
    getWorkers().filter(
        worker => worker.id !== id
    );

saveWorkers(workers);

renderWorkers();
```

}

/* البحث */

function searchWorkers() {

```
let keyword =
    document
        .getElementById(
            "searchWorker"
        )
        .value
        .toLowerCase();

let workers = getWorkers();

let table =
    document.getElementById(
        "newWorkersTable"
    );

if (!table) return;

table.innerHTML = "";

workers
    .filter(worker =>
        worker.name
            .toLowerCase()
            .includes(keyword)
    )
    .forEach(worker => {

        table.innerHTML += `
        <tr>

            <td>${worker.name}</td>

            <td>${worker.department}</td>

            <td>
                ${
                    worker.approved
                        ? "مقبول"
                        : "بانتظار المراجعة"
                }
            </td>

            <td>

                <button
                onclick="approveWorker(${worker.id})">
                موافقة
                </button>

                <button
                onclick="deleteWorker(${worker.id})">
                حذف
                </button>

            </td>

        </tr>
        `;

    });
```

}

/* عدد العمال */

function updateWorkersCount() {

```
let count =
    document.getElementById(
        "workersCount"
    );

if (!count) return;

count.innerText =
    getWorkers().length;
```

}

/* تحميل الصفحة */

window.addEventListener(
"load",
() => {

```
    renderWorkers();

    updateWorkersCount();

    let search =
        document.getElementById(
            "searchWorker"
        );

    if (search) {

        search.addEventListener(
            "keyup",
            searchWorkers
        );

    }

}
```

);

/* تسجيل خروج */

function logout() {

```
localStorage.removeItem(
    "currentUser"
);

localStorage.removeItem(
    "currentRole"
);

window.location.href =
    "index.html";
```

}
/* ===================================
APP.JS PART 2
إدارة الموديلات
=================================== */

/* إنشاء قاعدة الموديلات */

if (!localStorage.getItem("models")) {
localStorage.setItem(
"models",
JSON.stringify([])
);
}

/* جلب الموديلات */

function getModels() {

```
return JSON.parse(
    localStorage.getItem("models")
) || [];
```

}

/* حفظ الموديلات */

function saveModels(models) {

```
localStorage.setItem(
    "models",
    JSON.stringify(models)
);
```

}

/* إضافة موديل */

function addModel() {

```
let name =
    document.getElementById(
        "modelName"
    ).value;

let code =
    document.getElementById(
        "modelCode"
    ).value;

let price =
    document.getElementById(
        "modelPrice"
    ).value;

let notes =
    document.getElementById(
        "modelNotes"
    ).value;

if (
    name === "" ||
    code === ""
) {
    alert("أدخل بيانات الموديل");
    return;
}

let models =
    getModels();

let exists =
    models.find(
        model =>
            model.code === code
    );

if (exists) {

    alert(
        "كود الموديل موجود بالفعل"
    );

    return;

}

let model = {

    id: Date.now(),

    name: name,

    code: code,

    price: Number(price),

    notes: notes,

    createdAt:
        new Date()
        .toLocaleString()

};

models.push(model);

saveModels(models);

clearModelForm();

renderModels();

updateModelsCount();

loadModelSelects();

alert("تم إضافة الموديل");
```

}

/* تنظيف النموذج */

function clearModelForm() {

```
document.getElementById(
    "modelName"
).value = "";

document.getElementById(
    "modelCode"
).value = "";

document.getElementById(
    "modelPrice"
).value = "";

document.getElementById(
    "modelNotes"
).value = "";
```

}

/* عرض الموديلات */

function renderModels() {

```
let table =
    document.getElementById(
        "modelsTable"
    );

if (!table) return;

let models =
    getModels();

table.innerHTML = "";

models.forEach(model => {

    table.innerHTML += `

    <tr>

    <td>${model.name}</td>

    <td>${model.code}</td>

    <td>${model.price}</td>

    <td>${model.notes}</td>

    <td>

    <button
    onclick="editModel(${model.id})">

    تعديل

    </button>

    <button
    onclick="deleteModel(${model.id})">

    حذف

    </button>

    </td>

    </tr>

    `;

});
```

}

/* حذف موديل */

function deleteModel(id) {

```
if (
    !confirm(
        "هل تريد حذف الموديل ؟"
    )
) {
    return;
}

let models =
    getModels().filter(
        model =>
            model.id !== id
    );

saveModels(models);

renderModels();

updateModelsCount();

loadModelSelects();
```

}

/* تعديل موديل */

function editModel(id) {

```
let models =
    getModels();

let model =
    models.find(
        m => m.id === id
    );

if (!model) return;

let newName =
    prompt(
        "اسم الموديل",
        model.name
    );

if (!newName) return;

model.name = newName;

saveModels(models);

renderModels();

loadModelSelects();
```

}

/* عدد الموديلات */

function updateModelsCount() {

```
let count =
    document.getElementById(
        "modelsCount"
    );

if (!count) return;

count.innerText =
    getModels().length;
```

}

/* تحميل قائمة الموديلات */

function loadModelSelects() {

```
let select =
    document.getElementById(
        "assignModel"
    );

if (!select) return;

select.innerHTML =
    "<option>اختر الموديل</option>";

getModels().forEach(model => {

    select.innerHTML += `

    <option
    value="${model.id}">

    ${model.name}

    </option>

    `;

});
```

}

/* تحميل قائمة العمال */

function loadWorkerSelects() {

```
let select =
    document.getElementById(
        "assignWorker"
    );

if (!select) return;

select.innerHTML =
    "<option>اختر العامل</option>";

getWorkers()
.filter(
    worker =>
        worker.approved
)
.forEach(worker => {

    select.innerHTML += `

    <option
    value="${worker.id}">

    ${worker.name}

    </option>

    `;

});
```

}

/* تحميل الصفحة */

window.addEventListener(
"load",
() => {

```
    renderModels();

    updateModelsCount();

    loadModelSelects();

    loadWorkerSelects();

}
```

);
/* ===================================
APP.JS PART 3
توزيع الشغل والإنتاج
=================================== */

/* إنشاء قاعدة التوزيع */

if (!localStorage.getItem("assignments")) {

```
localStorage.setItem(
    "assignments",
    JSON.stringify([])
);
```

}

/* جلب التوزيع */

function getAssignments() {

```
return JSON.parse(
    localStorage.getItem(
        "assignments"
    )
) || [];
```

}

/* حفظ التوزيع */

function saveAssignments(data) {

```
localStorage.setItem(
    "assignments",
    JSON.stringify(data)
);
```

}

/* توزيع شغل */

function assignWork() {

```
let workerId =
    document.getElementById(
        "assignWorker"
    ).value;

let modelId =
    document.getElementById(
        "assignModel"
    ).value;

let qty =
    document.getElementById(
        "assignQty"
    ).value;

if (
    workerId === "" ||
    modelId === "" ||
    qty === ""
) {

    alert(
        "أكمل بيانات التوزيع"
    );

    return;

}

let workers =
    getWorkers();

let models =
    getModels();

let worker =
    workers.find(
        w =>
            w.id ==
            workerId
    );

let model =
    models.find(
        m =>
            m.id ==
            modelId
    );

if (
    !worker ||
    !model
) {
    return;
}

let assignments =
    getAssignments();

assignments.push({

    id: Date.now(),

    workerId: worker.id,

    workerName:
        worker.name,

    modelId: model.id,

    modelName:
        model.name,

    modelCode:
        model.code,

    assigned:
        Number(qty),

    delivered: 0,

    remaining:
        Number(qty),

    createdAt:
        new Date()
        .toLocaleString()

});

saveAssignments(
    assignments
);

renderProduction();

alert(
    "تم توزيع الشغل"
);
```

}

/* عرض جدول الإنتاج */

function renderProduction() {

```
let table =
    document.getElementById(
        "productionTable"
    );

if (!table) return;

let data =
    getAssignments();

table.innerHTML = "";

data.forEach(item => {

    table.innerHTML += `
```

<tr>

<td>
${item.workerName}
</td>

<td>
${item.modelName}
</td>

<td>
${item.assigned}
</td>

<td>
${item.delivered}
</td>

<td>
${item.remaining}
</td>

</tr>

`;

```
});
```

}

/* تحميل شغل العامل */

function loadWorkerAssignments() {

```
let table =
    document.getElementById(
        "modelsTable"
    );

if (!table) return;

let currentUser =
    localStorage.getItem(
        "currentUser"
    );

let workers =
    getWorkers();

let worker =
    workers.find(
        w =>
            w.username ===
            currentUser
    );

if (!worker) return;

let assignments =
    getAssignments()
    .filter(
        item =>
            item.workerId ===
            worker.id
    );

table.innerHTML = "";

assignments.forEach(item => {

    table.innerHTML += `
```

<tr>

<td>
${item.modelName}
</td>

<td>
${item.modelCode}
</td>

<td>
${item.assigned}
</td>

<td>
${item.delivered}
</td>

<td>
${item.remaining}
</td>

</tr>

`;

```
});
```

}

/* تسجيل تسليم */

function saveDelivery() {

```
let modelName =
    document.getElementById(
        "deliveryModel"
    ).value;

let qty =
    Number(
        document
        .getElementById(
            "deliveryQty"
        )
        .value
    );

if (
    modelName === "" ||
    qty <= 0
) {

    alert(
        "أدخل البيانات"
    );

    return;

}

let currentUser =
    localStorage.getItem(
        "currentUser"
    );

let workers =
    getWorkers();

let worker =
    workers.find(
        w =>
            w.username ===
            currentUser
    );

let assignments =
    getAssignments();

let item =
    assignments.find(
        a =>

        a.workerId ===
        worker.id &&

        a.modelName
        .toLowerCase() ===

        modelName
        .toLowerCase()

    );

if (!item) {

    alert(
        "الموديل غير موجود"
    );

    return;

}

item.delivered += qty;

item.remaining =
    item.assigned -
    item.delivered;

if (
    item.remaining < 0
) {

    item.remaining = 0;

}

saveAssignments(
    assignments
);

loadWorkerAssignments();

updateWorkerStats();

alert(
    "تم تسجيل التسليم"
);
```

}

/* إحصائيات العامل */

function updateWorkerStats() {

```
let currentUser =
    localStorage.getItem(
        "currentUser"
    );

let workers =
    getWorkers();

let worker =
    workers.find(
        w =>
            w.username ===
            currentUser
    );

if (!worker) return;

let assignments =
    getAssignments()
    .filter(
        item =>
            item.workerId ===
            worker.id
    );

let totalAssigned = 0;
let totalDelivered = 0;
let totalRemaining = 0;

assignments.forEach(item => {

    totalAssigned +=
        item.assigned;

    totalDelivered +=
        item.delivered;

    totalRemaining +=
        item.remaining;

});

let a =
    document.getElementById(
        "totalReceived"
    );

let d =
    document.getElementById(
        "totalDelivered"
    );

let r =
    document.getElementById(
        "totalRemaining"
    );

let p =
    document.getElementById(
        "totalProduction"
    );

if(a)
a.innerText =
totalAssigned;

if(d)
d.innerText =
totalDelivered;

if(r)
r.innerText =
totalRemaining;

if(p)
p.innerText =
totalDelivered;
```

}

/* تحميل تلقائي */

window.addEventListener(
"load",
() => {

```
    renderProduction();

    loadWorkerAssignments();

    updateWorkerStats();

}
```

);
/* ===================================
APP.JS PART 4
بيانات العامل والصورة
=================================== */

/* حفظ بيانات العامل */

function saveWorkerProfile() {

```
let currentUser =
    localStorage.getItem(
        "currentUser"
    );

let workers =
    getWorkers();

let worker =
    workers.find(
        w =>
            w.username ===
            currentUser
    );

if (!worker) return;

let phone =
    document.getElementById(
        "workerPhoneInput"
    ).value;

let address =
    document.getElementById(
        "workerAddressInput"
    ).value;

let nationalId =
    document.getElementById(
        "workerNationalId"
    ).value;

let birthDate =
    document.getElementById(
        "workerBirthDate"
    ).value;

worker.phone = phone;
worker.address = address;
worker.nationalId = nationalId;
worker.birthDate = birthDate;

saveWorkers(workers);

alert(
    "تم حفظ البيانات"
);
```

}

/* رفع الصورة */

function uploadProfileImage(event) {

```
let file =
    event.target.files[0];

if (!file) return;

let reader =
    new FileReader();

reader.onload =
function(e){

    let image =
        e.target.result;

    let currentUser =
        localStorage.getItem(
            "currentUser"
        );

    let workers =
        getWorkers();

    let worker =
        workers.find(
            w =>
                w.username ===
                currentUser
        );

    if(!worker) return;

    worker.image = image;

    saveWorkers(
        workers
    );

    let img =
        document.getElementById(
            "workerImage"
        );

    if(img)
    img.src = image;

};

reader.readAsDataURL(
    file
);
```

}

/* تحميل بيانات العامل */

function loadWorkerProfile() {

```
let currentUser =
    localStorage.getItem(
        "currentUser"
    );

let workers =
    getWorkers();

let worker =
    workers.find(
        w =>
            w.username ===
            currentUser
    );

if (!worker) return;

let name =
    document.getElementById(
        "workerName"
    );

if(name)
name.innerText =
worker.name;

let dep =
    document.getElementById(
        "workerDepartment"
    );

if(dep)
dep.innerText =
worker.department;

let phone =
    document.getElementById(
        "workerPhone"
    );

if(phone)
phone.innerText =
worker.phone || "";

let img =
    document.getElementById(
        "workerImage"
    );

if(
    img &&
    worker.image
){

    img.src =
    worker.image;

}
```

}

/* عدد العمال المقبولين */

function countApprovedWorkers() {

```
let workers =
    getWorkers();

return workers.filter(
    w =>
        w.approved
).length;
```

}

/* عدد العمال المنتظرين */

function countPendingWorkers() {

```
let workers =
    getWorkers();

return workers.filter(
    w =>
        !w.approved
).length;
```

}

/* تحديث لوحة المدير */

function updateDashboardStats() {

```
let workersCount =
    document.getElementById(
        "workersCount"
    );

if(workersCount){

    workersCount.innerText =
    countApprovedWorkers();

}
```

}

/* تحميل تلقائي */

window.addEventListener(
"load",
() => {

```
    loadWorkerProfile();

    updateDashboardStats();

}
```

);
/* ===================================
APP.JS PART 5
الوضع الليلي + الإحصائيات
=================================== */

/* الوضع الليلي */

function toggleDarkMode(){

```
document.body.classList.toggle(
    "dark-mode"
);

localStorage.setItem(
    "darkMode",
    document.body.classList.contains(
        "dark-mode"
    )
);
```

}

/* تحميل الوضع الليلي */

function loadDarkMode(){

```
let dark =
    localStorage.getItem(
        "darkMode"
    );

if(dark === "true"){

    document.body.classList.add(
        "dark-mode"
    );

}
```

}

/* البحث السريع */

function searchWorkersAdvanced(){

```
let input =
    document
    .getElementById(
        "searchWorker"
    );

if(!input) return;

let keyword =
    input.value.toLowerCase();

let table =
    document.getElementById(
        "newWorkersTable"
    );

if(!table) return;

let workers =
    getWorkers();

table.innerHTML = "";

workers
.filter(worker =>

    worker.name
    .toLowerCase()
    .includes(keyword)

    ||

    worker.department
    .toLowerCase()
    .includes(keyword)

)

.forEach(worker => {

    table.innerHTML += `
```

<tr>

<td>${worker.name}</td>

<td>${worker.department}</td>

<td>

${
worker.approved
? "مقبول"
: "قيد المراجعة"
}

</td>

<td>

<button
onclick="approveWorker(${worker.id})">

موافقة

</button>

<button
onclick="deleteWorker(${worker.id})">

حذف

</button>

</td>

</tr>

`;

```
});
```

}

/* إجمالي الإنتاج */

function getTotalProduction(){

```
let assignments =
    getAssignments();

let total = 0;

assignments.forEach(item => {

    total +=
        Number(
            item.delivered
        );

});

return total;
```

}

/* أعلى عامل إنتاجاً */

function getTopWorker(){

```
let assignments =
    getAssignments();

let workers = {};

assignments.forEach(item => {

    if(!workers[item.workerName]){

        workers[item.workerName] = 0;

    }

    workers[item.workerName] +=
        Number(
            item.delivered
        );

});

let topWorker = "";

let max = 0;

for(let name in workers){

    if(workers[name] > max){

        max = workers[name];

        topWorker = name;

    }

}

return topWorker || "-";
```

}

/* تحديث لوحة الإحصائيات */

function updateStatistics(){

```
let production =
    document.getElementById(
        "todayProduction"
    );

if(production){

    production.innerText =
        getTotalProduction();

}

let best =
    document.getElementById(
        "bestWorker"
    );

if(best){

    best.innerText =
        getTopWorker();

}
```

}

/* تحميل تلقائي */

window.addEventListener(
"load",
() => {

```
    loadDarkMode();

    updateStatistics();

    let search =
        document.getElementById(
            "searchWorker"
        );

    if(search){

        search.addEventListener(
            "keyup",
            searchWorkersAdvanced
        );

    }

}
```

);
/* ===================================
APP.JS PART 6
LOGS + REPORTS + CSV
=================================== */

/* إنشاء سجل العمليات */

if(!localStorage.getItem("logs")){

localStorage.setItem(
"logs",
JSON.stringify([])
);

}

/* إضافة عملية للسجل */

function addLog(action){

let logs =
JSON.parse(
localStorage.getItem("logs")
) || [];

logs.unshift({

action: action,

date:
new Date()
.toLocaleString()

});

localStorage.setItem(
"logs",
JSON.stringify(logs)
);

}

/* عرض السجل */

function renderLogs(){

let table =
document.getElementById(
"logsTable"
);

if(!table) return;

let logs =
JSON.parse(
localStorage.getItem("logs")
) || [];

table.innerHTML = "";

logs.forEach(log => {

table.innerHTML += `

<tr>

<td>
${log.action}
</td>

<td>
${log.date}
</td>

</tr>

`;

});

}

/* تصدير العمال */

function exportWorkersCSV(){

let workers =
getWorkers();

let csv =
"الاسم,المستخدم,القسم,الهاتف\n";

workers.forEach(worker=>{

csv +=

worker.name + "," +

worker.username + "," +

worker.department + "," +

(worker.phone||"") +

"\n";

});

downloadCSV(
csv,
"workers.csv"
);

}

/* تصدير الموديلات */

function exportModelsCSV(){

let models =
getModels();

let csv =
"اسم الموديل,الكود,السعر\n";

models.forEach(model=>{

csv +=

model.name + "," +

model.code + "," +

model.price +

"\n";

});

downloadCSV(
csv,
"models.csv"
);

}

/* تنزيل الملف */

function downloadCSV(
content,
fileName
){

let blob =
new Blob(
[content],
{
type:
'text/csv;charset=utf-8;'
}
);

let link =
document.createElement("a");

let url =
URL.createObjectURL(blob);

link.href = url;

link.download =
fileName;

document.body.appendChild(
link
);

link.click();

document.body.removeChild(
link
);

}

/* طباعة التقرير */

function printReport(){

let workers =
getWorkers().length;

let models =
getModels().length;

let production =
getTotalProduction();

let html = `

<h1>
تقرير المصنع
</h1>

<hr>

<h3>
عدد العمال:
${workers}
</h3>

<h3>
عدد الموديلات:
${models}
</h3>

<h3>
إجمالي الإنتاج:
${production}
</h3>

`;

let win =
window.open(
"",
"",
"width=900,height=700"
);

win.document.write(
html
);

win.document.close();

win.print();

}

/* تحميل السجل */

window.addEventListener(
"load",
()=>{

renderLogs();

}
);
/* ===================================
APP.JS PART 7
OCR CARD READER
=================================== */

async function readCard(event){

let file =
event.target.files[0];

if(!file) return;

document.getElementById(
"ocrStatus"
).innerText =
"جاري قراءة البطاقة...";

const result =
await Tesseract.recognize(
file,
"ara+eng"
);

let text =
result.data.text;

let currentUser =
localStorage.getItem(
"currentUser"
);

let workers =
getWorkers();

let worker =
workers.find(
w =>
w.username ===
currentUser
);

if(!worker) return;

/* حفظ النص الخام */

worker.cardText = text;

/* محاولة استخراج الرقم القومي */

let nationalMatch =
text.match(/\d{14}/);

if(
nationalMatch
){

worker.nationalId =
nationalMatch[0];

}

/* حفظ البيانات */

saveWorkers(
workers
);

/* تعبئة الحقول */

let nationalInput =
document.getElementById(
"workerNationalId"
);

if(
nationalInput &&
worker.nationalId
){

nationalInput.value =
worker.nationalId;

}

document.getElementById(
"ocrStatus"
).innerText =
"تم استخراج البيانات";

addLog(
"تم رفع بطاقة عامل"
);

}

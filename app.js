
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

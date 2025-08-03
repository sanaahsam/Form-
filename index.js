const dbName = "SCHOOL-DB";
const relationName = "Student-Relation";
const Token = "764066664|7385821558786766262|764067669";
baseUrl = "https://api.jsonpowerdb.com:5567";

let typingTimer;
const doneTyping = 1500;
console.log("this is working");

const rollNo = document.getElementById("rollNo");
const fullName = document.getElementById("fullName");
const stdClass = document.getElementById("stdClass");
const stdAddress = document.getElementById("stdAddress");
const DOB = document.getElementById("DOB");
const DOE = document.getElementById("DOE");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const updateBtn = document.getElementById("updateBtn");

window.onload = function () {
  disableFields();
  rollNo.focus();
};

//validate form
function validateFormFields() {
  let isValid = true;

  document.querySelectorAll(".errormsg").forEach((p) => (p.innerText = ""));

  if (rollNo.value.trim() === "") {
    document.getElementById("rollNoerror").innerText =
      "Roll Number should not be empty.";
    isValid = false;
  }
  if (fullName.value.trim() === "") {
    document.getElementById("nameError").innerText =
      "Full Name should not be empty.";
    isValid = false;
  }
  if (stdClass.value.trim() === "") {
    document.getElementById("Classerror").innerText =
      "Class should not be empty.";
    isValid = false;
  }
  if (stdAddress.value.trim() === "") {
    document.getElementById("Addresserror").innerText =
      "Address should not be empty.";
    isValid = false;
  }
  if (DOB.value.trim() === "") {
    document.getElementById("DOBerror").innerText =
      "Date of Birth should not be empty.";
    isValid = false;
  }
  if (DOE.value.trim() === "") {
    document.getElementById("DOEerror").innerText =
      "Date of Enrollment should not be empty.";
    isValid = false;
  }

  return isValid;
}

//enable feilds
const enableFields = () => {
  fullName.disabled = false;
  stdClass.disabled = false;
  stdAddress.disabled = false;
  DOB.disabled = false;
  DOE.disabled = false;
  saveBtn.disabled = false;
  resetBtn.disabled = false;
  updateBtn.disabled = false;
};

//disable btns and feild

const disableFields = () => {
  fullName.disabled = true;
  stdClass.disabled = true;
  stdAddress.disabled = true;
  DOB.disabled = true;
  DOE.disabled = true;
  saveBtn.disabled = true;
  resetBtn.disabled = true;
  updateBtn.disabled = true;
};

//resetform
function resetForm() {
  rollNo.value = "";
  fullName.value = "";
  stdClass.value = "";
  stdAddress.value = "";
  DOB.value = "";
  DOE.value = "";
  rollNo.focus();
  rollNo.addEventListener("input", (e) => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      console.log(e.target.value);
      enableFields();
    }, doneTyping);
  });
}

//check if record exist of that key
function ifExist() {
  alert("finding if id already exist..");
  const data = {
    id: rollNo.value.trim(),
  };
  let req = createGET_BY_KEYRequest(
    Token,
    dbName,
    relationName,
    JSON.stringify(data),
    true,
    true
  );
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommand(req, "/api/irl");
  console.log(resultObj);

  jQuery.ajaxSetup({ async: true });
  return resultObj.status === 200;
}

rollNo.addEventListener("input", (e) => {
  clearTimeout(typingTimer);
  disableFields();
  typingTimer = setTimeout(() => {
    console.log(e.target.value);
    let isSuccess = ifExist();
    if (isSuccess) {
      alert("id already exist.");

      enableFields();
      fullName.focus();
      rollNo.disabled = true;
      saveBtn.disabled = true;
      updateBtn.disabled = false;
      resetBtn.disabled = false;
    } else {
      alert("id does not exist.");
      enableFields();
      saveBtn.disabled = false;
      updateBtn.disabled = true;
      resetBtn.disabled = false;
    }
  }, doneTyping);
});

//save button function
saveBtn.addEventListener("click", () => {
  if (!validateFormFields()) {
    return;
  }
  alert("trying to save data");
  const data = {
    id: rollNo.value.trim(),
    FullName: fullName.value.trim(),
    Class: stdClass.value.trim(),
    Address: stdAddress.value.trim(),
    BirthDate: DOB.value.trim(),
    EnrollmentDate: DOE.value.trim(),
  };

  try {
    const req = createPUTRequest(
      Token,
      JSON.stringify(data),
      dbName,
      relationName
    );

    jQuery.ajaxSetup({ async: false });
    let resultObj = executeCommandAtGivenBaseUrl(req, baseUrl, "/api/iml");
    alert("Data saved successfully");
    jQuery.ajaxSetup({ async: true });
    location.reload();
  } catch (error) {
    jQuery.ajaxSetup({ async: true });
    console.error("Error while saving data:", error);
    alert("An error occurred while saving data. Please try again.");
  }
});

//update button function
updateBtn.addEventListener("click", () => {
  if (!validateFormFields()) {
    return;
  }
  alert("trying to update ");
  const id = rollNo.value.trim();
  const data = {
    id: rollNo.value.trim(),
    FullName: fullName.value.trim(),
    Class: stdClass.value.trim(),
    Address: stdAddress.value.trim(),
    BirthDate: DOB.value.trim(),
    EnrollmentDate: DOE.value.trim(),
  };

  try {
    const req = createUPDATERecordRequest(
      Token,
      JSON.stringify(data),
      dbName,
      relationName,
      id
    );

    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommand(req, "/api/iml");
    alert("Updated record.");
    jQuery.ajaxSetup({ async: true });
    location.reload();
  } catch (error) {
    jQuery.ajaxSetup({ async: true });
    console.error("Error while updating record:", error);
    alert("An error occurred while updating the record. Please try again.");
  }
});

//reset button function
resetBtn.addEventListener("click", () => {
  resetForm();
  location.reload();
});

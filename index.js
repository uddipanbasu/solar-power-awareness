

function screenshot(){
    html2canvas(document.querySelector('#capture'), {
        onrendered: function(canvas) {
            // document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        }
    });
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}



// copy function on vendor 
// Function to copy text to the clipboard
function copyToClipboard(text) {
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = text;
  document.body.appendChild(tempTextarea);

  tempTextarea.select();

  try {
      document.execCommand('copy');
      
  } catch (error) {
      alert('Copy to clipboard failed. Please try again.');
  }

  document.body.removeChild(tempTextarea);
}

// Attach click event to all elements with the 'copy-text' class
document.addEventListener('DOMContentLoaded', function() {
  const copyElements = document.getElementsByClassName('copy-text');
  for (let i = 0; i < copyElements.length; i++) {
      copyElements[i].addEventListener('click', function() {
          copyToClipboard(copyElements[i].innerText);
      });
  }
});









function copyexcel(type, fn, dl) {
  var elt = document.getElementById('table-to-copy');
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
      XLSX.writeFile(wb, fn || ('contact data.' + (type || 'xlsx')));
}





// Function to update Form 2
function updateForm2(number) {
  const result = number * 428;
  document.getElementById('result').value = result;
}

// Form 1 input event handler
document.getElementById('numberInput').addEventListener('input', function () {
  const number = parseInt(document.getElementById('numberInput').value);
  if (!isNaN(number)) {
    updateForm2(number);
  }
});

// Form 3 submit event handler
document.getElementById('form3').addEventListener('submit', function (event) {
  event.preventDefault();
  const number = parseInt(document.getElementById('numberInput2').value);
  if (!isNaN(number)) {
    document.getElementById('difference').value = '';
    document.getElementById('numberInput2').value = '';
    updateForm2(number);
  }
});

// Calculate Difference button click event handler
document.getElementById('calculateButton').addEventListener('click', function () {
  const form2Value = parseInt(document.getElementById('result').value);
  const form3Value = parseInt(document.getElementById('numberInput2').value);
  if (!isNaN(form2Value) && !isNaN(form3Value)) {
    const difference = (form2Value - form3Value)*100/form3Value;
    const differenceField = document.getElementById('difference');

    // Apply color based on the sign of the difference
    if (difference < 0) {
      differenceField.classList.add('negative');
      differenceField.classList.remove('positive');
      differenceField.value = Math.abs(difference); // Show absolute value for negative difference
    } else {
      differenceField.classList.remove('negative');
      differenceField.classList.add('positive');
      differenceField.value = difference;
    }
  }
});






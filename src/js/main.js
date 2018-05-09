function selectFile() {
  document.getElementById('file-input').click();
}

function onSelectFile() {
  let name = document.getElementById('file-input');
  if (name.files && name.files.item(0)) {
    openFile(name);
  }
}

function openFile(file) {
  img = new SimpleImage(file);
  preloaderSpinner.style.display = '';
  setTimeout(drawImage, 1000);
}

function drawImage() {
  img.drawTo(canvas);
  preloaderSpinner.style.display = 'none';
  canvas.style.display = '';
}

function reshapePicture() {
  let width = widthInput.value;
  let height = heightInput.value;
  console.log('Will reshape to ' + width + 'x' + height + '.');
}

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.fixed-action-btn');
  let instances = M.FloatingActionButton.init(elements, {
    direction: 'top',
    hoverEnabled: false,
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elements, {
    inDuration: 300,
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.tooltipped');
  let instances = M.Tooltip.init(elements, {
    enterDelay: 300,
    delay: 50,
  });
});

document.addEventListener('DOMContentLoaded', function() {
  preloaderSpinner = document.getElementById('preloader');
  preloaderSpinner.style.display = 'none';

  canvas = document.getElementById('canvas-img');
  canvas.style.display = 'none';

  fileSelector = document.getElementById('file-input');
  fileSelector.style.display = 'none';
  fileSelector.addEventListener('change', onSelectFile);

  widthInput = document.getElementById('width');
  heightInput = document.getElementById('height');

  reshapeBtn = document.getElementById('reshape');
  reshapeBtn.addEventListener('click', reshapePicture);
});

let preloaderSpinner = null;

let canvas = null;

let fileSelector = null;

let widthInput = null;

let heightInput = null;

let reshapeBtn = null;

let img = null;
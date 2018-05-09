function selectFile() {
  document.getElementById('file-input').click();
}

function onSelectFile() {
  let name = document.getElementById('file-input');
  let canvas = document.getElementById('canvas-img');
  if (name.files && name.files.item(0)) {
    openFile(name, canvas);
  }
}

function openFile(file, canvas) {
  let img = new SimpleImage(file);
  preloader.style.display = '';
  setTimeout(function() {
    img.drawTo(canvas);
    preloader.style.display = 'none';
    canvas.style.display = '';
  }, 500);
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
  preloader = document.getElementById('preloader');
  preloader.style.display = 'none';

  canvas = document.getElementById('canvas-img');
  canvas.style.display = 'none';

  fileSelector = document.getElementById('file-input');
  fileSelector.style.display = 'none';
  fileSelector.addEventListener('change', onSelectFile);
});

let preloader = null;

let canvas = null;

let fileSelector = null;
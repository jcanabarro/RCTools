function selectFile () {
  document.getElementById('file-input').click()
}

function onSelectFile () {
  let name = document.getElementById('file-input')
  if (name.files && name.files.item(0)) {
    openFile(name)
  }
}

function openFile (file) {
  img = new SimpleImage(file)
  preloaderSpinner.style.display = ''
  setTimeout(onImageOpened, 1000)
}

function drawImage () {
  img.drawTo(canvas)
}

function resamplePicture () {
  let width = widthInput.value || img.width
  let height = heightInput.value || img.height
  if (selectedMethod === KNN) {
    resampled = kNearestNeighbor(width, height)
  } else if (selectedMethod === INTERPOLATION) {
    resampled = interpolation(width, height)
  }
  onImageResampled()
}

function kNearestNeighbor (targetWidth, targetHeight) {
  const next = new SimpleImage(targetWidth, targetHeight)
  let relativeX = 0
  let relativeY = 0
  for (let y = 0; y < targetHeight; y++) {
    relativeY = Math.floor((y / targetHeight) * img.height)
    for (let x = 0; x < targetWidth; x++) {
      relativeX = Math.floor((x / targetWidth) * img.width)
      next.setPixel(x, y, img.getPixel(relativeX, relativeY))
    }
  }
  return next
}

function interpolation (width, height) {
  const next = new SimpleImage(width, height)
  return next
}

function onChangeMethod () {
  selectedMethod = this.options[this.selectedIndex].value
}

function onImageOpened () {
  drawImage()
  original = img
  M.toast({html: 'File opened.' + img.width + 'x' + img.height})
  preloaderSpinner.style.display = 'none'
  canvas.style.display = ''
  downloadBtn.classList.remove('disabled')
  undoAllBtn.classList.remove('disabled')
  resampleBtn.classList.remove('disabled')
}

function onImageResampled () {
  img = resampled
  drawImage()
}

function undoAll () {
  if (original !== null) {
    img = original
    drawImage()
  }
}

function downloadResult () {
  if (img !== null) {
    downloadAnchor.href = canvas.toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    downloadAnchor.click()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // UI
  preloaderSpinner = document.getElementById('preloader')
  preloaderSpinner.style.display = 'none'

  canvas = document.getElementById('canvas-img')
  canvas.style.display = 'none'

  // File
  fileSelector = document.getElementById('file-input')
  fileSelector.style.display = 'none'
  fileSelector.addEventListener('change', onSelectFile)

  // Resample
  widthInput = document.getElementById('width')
  heightInput = document.getElementById('height')

  confirmResampleBtn = document.getElementById('confirm-resample')
  confirmResampleBtn.addEventListener('click', resamplePicture)

  methodCombo = document.getElementById('method')
  methodCombo.addEventListener('change', onChangeMethod)

  // Menu
  uploadBtn = document.getElementById('upload-btn')
  downloadBtn = document.getElementById('download-btn')
  undoAllBtn = document.getElementById('undo-btn')
  aboutBtn = document.getElementById('about-btn')
  resampleBtn = document.getElementById('resample-btn')

  // Undo
  undoAllBtn.addEventListener('click', undoAll)

  // Download
  downloadAnchor = document.getElementById('download')
  downloadAnchor.style.display = 'none'
  downloadBtn.addEventListener('click', downloadResult)

})

// Materialize

document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll('.fixed-action-btn')
  M.FloatingActionButton.init(elements, {
    direction: 'top',
    hoverEnabled: false,
  })
})

document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll('.modal')
  M.Modal.init(elements, {
    inDuration: 300,
  })
})

document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll('select')
  M.FormSelect.init(elements, {})
})

document.addEventListener('DOMContentLoaded', function () {
  let elements = document.querySelectorAll('.tooltipped')
  M.Tooltip.init(elements, {
    enterDelay: 300,
    delay: 50,
  })
})

// General/UI

let preloaderSpinner = null

let canvas = null

// Resample Inputs

let widthInput = null

let heightInput = null

let methodCombo = null

let confirmResampleBtn = null

// Menu

let uploadBtn = null

let downloadBtn = null

let undoAllBtn = null

let resampleBtn = null

let aboutBtn = null

// Img

let img = null

let original = null

let resampled = null

// Method

const KNN = '1'

let selectedMethod = KNN

const INTERPOLATION = '2'

// File

let fileSelector = null

// Download

let downloadAnchor = null
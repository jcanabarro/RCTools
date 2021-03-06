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
  onStartLoading()
  setTimeout(onImageOpened, 1000)
}

function drawImage () {
  setCanvasContainerDimensions()
  img.drawTo(canvas)
}

function resamplePicture (e) {
  e.preventDefault()
  let width = widthInput.value || img.width
  let height = heightInput.value || img.height
  selectedMethod === NEAREST_NEIGHBOR ? nearestNeighbor(width, height) : interpolation(width, height)
}

function nearestNeighbor (targetWidth, targetHeight) {
  onStartLoading()
  const next = new SimpleImage(targetWidth, targetHeight)
  let relativeX = 0
  let relativeY = 0
  for (let y = 0; y < targetHeight; y++) {
    relativeY = Math.round((y / targetHeight) * (img.height - 1))
    for (let x = 0; x < targetWidth; x++) {
      relativeX = Math.round((x / targetWidth) * (img.width - 1))
      next.setPixel(x, y, img.getPixel(relativeX, relativeY))
    }
  }

  setTimeout(function () {
    onEndLoading()
    onImageResampled(next)
  }, 1000)
}

function interpolation (targetWidth, targetHeight) {
  onStartLoading()
  const next = new SimpleImage(targetWidth, targetHeight)
  let relativeX = 0
  let relativeY = 0
  for (let y = 0; y < targetHeight; y++) {
    relativeY = (y / targetHeight) * (img.height - 1)
    for (let x = 0; x < targetWidth; x++) {
      relativeX = (x / targetWidth) * (img.width - 1)
      const relativePixelA = img.getPixel(Math.floor(relativeX), Math.floor(relativeY))
      const relativePixelB = img.getPixel(Math.ceil(relativeX), Math.floor(relativeY))
      const relativePixelC = img.getPixel(Math.floor(relativeX), Math.ceil(relativeY))
      const relativePixelD = img.getPixel(Math.ceil(relativeX), Math.ceil(relativeY))
      const relativeXDecimals = relativeX - Math.floor(relativeX)
      const relativeXDecimalsComplement = 1 - relativeXDecimals
      const relativeYDecimals = relativeY - Math.floor(relativeY)
      const relativeYDecimalsComplement = 1 - relativeYDecimals

      // Red
      const redDeltaX = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelA.getRed(), relativePixelB.getRed())
      const redDeltaY = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelC.getRed(), relativePixelD.getRed())
      const nextRed = relativeYDecimalsComplement * redDeltaX + relativeYDecimals * redDeltaY
      next.setRed(x, y, nextRed)
      // Green
      const greenDeltaX = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelA.getGreen(), relativePixelB.getGreen())
      const greenDeltaY = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelC.getGreen(), relativePixelD.getGreen())
      const nextGreen = relativeYDecimalsComplement * greenDeltaX + relativeYDecimals * greenDeltaY
      next.setGreen(x, y, nextGreen)
      // Blue
      const blueDeltaX = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelA.getBlue(), relativePixelB.getBlue())
      const blueDeltaY = getInterpolatedComponent(relativeXDecimals, relativeXDecimalsComplement, relativePixelC.getBlue(), relativePixelD.getBlue())
      const nextBlue = relativeYDecimalsComplement * blueDeltaX + relativeYDecimals * blueDeltaY
      next.setBlue(x, y, nextBlue)
    }
  }

  setTimeout(function () {
    onEndLoading()
    onImageResampled(next)
  }, 1000)
}

function getInterpolatedComponent (relativeDecimals, relativeDecimalsComplement, componentA, componentB) {
  return relativeDecimalsComplement * componentA + relativeDecimals * componentB
}

function onChangeMethod () {
  selectedMethod = this.options[this.selectedIndex].value
}

function onStartLoading () {
  canvas.style.display = 'none'
  canvasContainer.style.display = 'none'
  preloaderSpinner.style.display = ''
  downloadBtn.classList.add('disabled')
  undoAllBtn.classList.add('disabled')
  resampleBtn.classList.add('disabled')
}

function onEndLoading () {
  preloaderSpinner.style.display = 'none'
  canvasContainer.style.display = ''
  canvas.style.display = ''
  downloadBtn.classList.remove('disabled')
  undoAllBtn.classList.remove('disabled')
  resampleBtn.classList.remove('disabled')
}

function onImageOpened () {
  drawImage()
  original = img
  M.toast({html: 'File opened.' + img.width + 'x' + img.height})
  onEndLoading()
}

function onImageResampled (next) {
  img = next
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

function setCanvasContainerDimensions () {
  const maxWidth = window.innerWidth - 400
  const maxHeight = window.innerHeight - 100
  canvasContainer.style.width = maxWidth + 'px'
  canvasContainer.style.height = maxHeight + 'px'
}

document.addEventListener('DOMContentLoaded', function () {
  // UI
  preloaderSpinner = document.getElementById('preloader')
  preloaderSpinner.style.display = 'none'

  canvas = document.getElementById('canvas-img')
  canvas.style.display = 'none'

  canvasContainer = document.getElementById('canvas-container')

  canvasContainer.style.overflow = 'scroll'
  canvasContainer.style.display = 'none'

  canvasContainer.style.backgroundImage = 'url(assets/bg-transp.png)'
  canvasContainer.style.backgroundRepeat = 'repeat'

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

let canvasContainer = null

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

// Method

const NEAREST_NEIGHBOR = '1'

const INTERPOLATION = '2'

let selectedMethod = INTERPOLATION

// File

let fileSelector = null

// Download

let downloadAnchor = null
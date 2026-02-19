
export function startupControls() {
  createControlsHTML()
  const cardInput = document.getElementById("card-input")
  cardInput.value = getCardCount()
  cardInput.addEventListener("change", updateCards)

  const colorInput = document.getElementById("color-input")
  colorInput.value = getcolor()
  colorInput.addEventListener("change", updateThemeColor)

  const aspectRatioEl = document.getElementById("aspect-ratio")
  aspectRatioEl.value = getAspectRatio()
  aspectRatioEl.addEventListener("change", updateAspectRatio)

  const arcSpreadEl = document.getElementById("arc-spread")
  arcSpreadEl.value = getArcSpread()
  arcSpreadEl.addEventListener("change", updateArcSpread)

  const cardDepthEl = document.getElementById("card-depth")
  cardDepthEl.value = getCardDepth()
  cardDepthEl.addEventListener("change", updateCardDepth)

  const cardHeightEl = document.getElementById("card-height")
  cardHeightEl.value = getCardHeight()
  cardHeightEl.addEventListener("change", updateCardHeight)
}

function createControlsHTML() {
  const controlsDiv = document.createElement("div")
  controlsDiv.id = "controls"
  controlsDiv.classList.add('controls')
  for (let i = 0; i < controlsDefinition.length; i++) {
    const control = controlsDefinition[i]
    const controlDiv = document.createElement("div")
    controlDiv.classList.add("control-container")
    const label = document.createElement("label")
    label.textContent = control.text
    controlDiv.appendChild(label)
    label.htmlFor = control.id
    const input = document.createElement("input")
    input.id = control.id
    input.type = control.type
    controlDiv.appendChild(input)
    controlsDiv.appendChild(controlDiv)
  }
  document.body.appendChild(controlsDiv)
}

const controlsDefinition = [
  {
    id:"card-input",
    text:"Card Count (2-20):",
    type:"number"
  },
  {
    id:"color-input",
    text:"Theme Color (1-360):",
    type:"text"
  },
  {
    id:"aspect-ratio",
    text:"Aspect Ratio (1-10):",
    type:"text"
  },
  {
    id:"arc-spread",
    text:"Arc Spread (0-50):",
    type:"number"
  },
  {
    id:"card-depth",
    text:"Card Depth (0-10):",
    type:"number"
  },
  {
    id:"card-height",
    text:"Card Height (1-50):",
    type:"number"
  }
  ]



//Card count
export function getCardCount() {
  const cardContainer = document.getElementById("card-component")
  return cardContainer.children.length
}
export function updateCards(e) {
  const cardContainer = document.getElementById("card-component")
  cardContainer.replaceChildren()
  for (let i = 0; i < e.target.value; i++) {
    cardContainer.appendChild(document.createElement("div"))
  }
}

//Color
export function getcolor() {
  const docEl = document.documentElement
  const color = getComputedStyle(docEl).getPropertyValue("--theme-color").trim()
  return color
}
export function changeColor(newColor) {
  const doc = document.documentElement
  doc.style.setProperty("--theme-color", newColor)
}
export function updateThemeColor(e) {
  changeColor(e.target.value)
}

//Aspect Ratio
export function getAspectRatio() {
  const component = document.getElementById("card-component")
  const currentAr = getComputedStyle(component.children[0]).getPropertyValue(
    "aspect-ratio",
  )
  const ar = currentAr.split("/")
  const arVal = parseFloat(ar[1])
  if (isNaN(arVal)) {
    return currentAr
  } else {
    return arVal
  }
}
export function updateAspectRatio() {
  const aspectRatioEl = document.getElementById("aspect-ratio")
  const arVal = parseFloat(aspectRatioEl.value)
  const arString = `1/${arVal}`
  const component = document.getElementById("card-component")
  for (let i = 0; i < component.children.length; i++) {
    component.children[i].style.setProperty("aspect-ratio", arString)
  }
}

//Arc Spread
export function getArcSpread() {
  const component = document.getElementById("card-component")
  const currentSpread = getComputedStyle(
    component.children[0],
  ).getPropertyValue("--arc-spread")
  return currentSpread.replace("deg", "")
}
export function updateArcSpread(e) {
  const component = document.getElementById("card-component")
  for (let i = 0; i < component.children.length; i++) {
    component.children[i].style.setProperty(
      "--arc-spread",
      e.target.value + "deg",
    )
  }
}

//Card Depth
export function getCardDepth() {
  const component = document.getElementById("card-component")
  const currentDepth = getComputedStyle(component.children[0]).getPropertyValue(
    "--card-depth",
  )
  return currentDepth.replace("%", "")
}
export function updateCardDepth(e) {
  const component = document.getElementById("card-component")
  for (let i = 0; i < component.children.length; i++) {
    component.children[i].style.setProperty(
      "--card-depth",
      e.target.value + "%",
    )
  }
}

//Card height
export function getCardHeight() {
  const component = document.getElementById("card-component")
  const currentHeight = getComputedStyle(
    component.children[0],
  ).getPropertyValue("--height")
  return currentHeight.replace("cqh", "")
}
export function updateCardHeight(e) {
  const component = document.getElementById("card-component")
  for (let i = 0; i < component.children.length; i++) {
    component.children[i].style.setProperty("--height", e.target.value + "cqh")
  }
}
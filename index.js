function startup() {
  const colorInput = document.getElementById("color-input")
  colorInput.value = getcolor()
  colorInput.addEventListener("change", updateThemeColor)

  const cardInput = document.getElementById("card-input")
  cardInput.value = getCardCount()
  cardInput.addEventListener("change", updateCards)

  const aspectRatioEl = document.getElementById("aspect-ratio")
  aspectRatioEl.value = getAspectRatio()
  aspectRatioEl.addEventListener("change", updateAspectRatio)
}
//Cards
function getCardCount() {
  const cardContainer = document.getElementById("card-component")
  return cardContainer.children.length
}
function updateCards(e) {
  const cardContainer = document.getElementById("card-component")
  cardContainer.replaceChildren()
  for (let i = 0; i < e.target.value; i++) {
    cardContainer.appendChild(document.createElement("div"))
  }
}

//Color Selector
function getcolor() {
  const docEl = document.documentElement
  const color = getComputedStyle(docEl).getPropertyValue("--theme-color").trim()
  return color
}
function changeColor(newColor) {
  const doc = document.documentElement
  doc.style.setProperty("--theme-color", newColor)
}
function updateThemeColor(e) {
  changeColor(e.target.value)
}

//Aspect Ratio
function getAspectRatio() {
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
function updateAspectRatio() {
  const aspectRatioEl = document.getElementById("aspect-ratio")
  const arVal = parseFloat(aspectRatioEl.value)
  const arString = `1/${arVal}`
  const component = document.getElementById("card-component")
  for (let i = 0; i < component.children.length; i++) {
    component.children[i].style.setProperty("aspect-ratio", arString)
  }
}

startup()

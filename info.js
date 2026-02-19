import { getArcSpread } from "./controls.js"


export function showDebugData() {
  const cards = document.getElementById("card-component")
  //
  //Parent Info
  //
  const debugInfo = document.createElement("div")
  debugInfo.id = "debug-info"
  //Parent Width
  const parentWidth = getComputedStyle(cards).getPropertyValue("width")
  const pWidth = document.createElement("p")
  pWidth.textContent = `Parent Width: ${parentWidth}`
  debugInfo.appendChild(pWidth)
  //Parent Height
  const parentHeight = getComputedStyle(cards).getPropertyValue("height")
  const pHeight = document.createElement("p")
  pHeight.textContent = `Parent Height: ${parentHeight}`
  debugInfo.appendChild(pHeight)

  document.body.appendChild(debugInfo)
  const layoutRep = document.createElement("div")
  layoutRep.id = "layout-rep"
  document.body.appendChild(layoutRep)
  layoutRep.style.setProperty("width", parentWidth)
  layoutRep.style.setProperty("height", parentHeight)

  //
  //Card Info
  //

  for (let i = 0; i < cards.children.length; i++) {
    const card = cards.children[i]
    const totalCards = cards.children.length + 1

      const arcSpreadEl = document.getElementById("arc-spread")
      arcSpreadEl.value = getArcSpread()


    const data = document.createElement("div")
    data.classList.add("debug-data")
    //Card Index
    const siblingIndex = i + 1
    const indexTextEl = document.createElement("p")
    indexTextEl.textContent = `Index: ${siblingIndex}`
    data.appendChild(indexTextEl)
    //From Center
    const fromCenterEl = document.createElement("p")
    const fromCenterData = siblingIndex - totalCards / 2
    const fromCenterText = `From Center: ${fromCenterData}`
    fromCenterEl.textContent = fromCenterText
    data.appendChild(fromCenterEl)
    //Card Height
    const cardHeightEl = document.createElement("p")
    const cardHeightData = getComputedStyle(card).getPropertyValue("height")
    const cardHeightText = `Card Height: ${cardHeightData}`
    cardHeightEl.textContent = cardHeightText
    console.log(cardHeightData)
    data.appendChild(cardHeightEl)
    //Card Width
    const cardWidthEl = document.createElement("p")
    const cardWidthData = getComputedStyle(card).getPropertyValue("width")
    const cardWidthText = `Card Width: ${cardWidthData}`
    cardWidthEl.textContent = cardWidthText
    data.appendChild(cardWidthEl)
    card.appendChild(data)
    //Card Angle
    const cardAngleEl = document.createElement("p")
    const cardAngleData = fromCenterData * getArcSpread() + 270
    const cardAngleText = `Card Angle: ${cardAngleData}`
    cardAngleEl.textContent = cardAngleText
    data.appendChild(cardAngleEl)

    //calc(var(--cards-from-center) * var(--offset-angle) + 270deg);
  }
}

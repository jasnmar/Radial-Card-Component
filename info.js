import { getArcSpread, getCardCount } from "./controls.js"

export function showDebugData() {
  const cards = document.getElementById("card-component")
  //
  //Parent Info
  //
  const debugInfo = document.createElement("div")
  debugInfo.id = "debug-info"
  //Parent Width
  const pWidth = document.createElement("p")
  debugInfo.appendChild(pWidth)
  //Parent Height
  const pHeight = document.createElement("p")
  debugInfo.appendChild(pHeight)
  //Offset Angle
  // const offSetAngle = getComputedStyle(cards.children[0]).getPropertyValue("--offset-angle")
  const offSetAngle = getArcSpread() / getCardCount()
  const pOffsetAngle = document.createElement("p")
  pOffsetAngle.textContent = `Offset Angle: ${offSetAngle}`
  debugInfo.appendChild(pOffsetAngle)
  //
  //Layout Rep
  //
  document.body.appendChild(debugInfo)
  const layoutRep = document.createElement("div")
  layoutRep.id = "layout-rep"
  document.body.appendChild(layoutRep)

  //Update Dimensions
  const updateDimensions = () => {
    const styles = getComputedStyle(cards)
    const width = styles.getPropertyValue("width")
    const height = styles.getPropertyValue("height")
    pWidth.textContent = `Parent Width: ${width}`
    pHeight.textContent = `Parent Height: ${height}`
    layoutRep.style.setProperty("width", width)
    layoutRep.style.setProperty("height", height)
  }
  updateDimensions()
  new ResizeObserver(updateDimensions).observe(cards)

  layoutRep.style.setProperty("--ellipse-width", getArcSpread())

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
    const cardAngleData = fromCenterData * offSetAngle
    const cardAngleText = `Card Angle: ${cardAngleData.toFixed(2)} + 270deg`
    cardAngleEl.textContent = cardAngleText
    data.appendChild(cardAngleEl)

  }
}

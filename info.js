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
  const pOffsetAngle = document.createElement("p")
  debugInfo.appendChild(pOffsetAngle)
  //Total Card Width
  const pTotalCardWidth = document.createElement("p")
  debugInfo.appendChild(pTotalCardWidth)

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

  //
  //Card Info
  //

  const updateCardData = () => {
    let totalCardWidth = 0
    const offSetAngle = getArcSpread() / getCardCount()
    pOffsetAngle.textContent = `Offset Angle: ${offSetAngle.toFixed(2)}`
    layoutRep.style.setProperty("--ellipse-width", getArcSpread())

    for (let i = 0; i < cards.children.length; i++) {
      const card = cards.children[i]
      const totalCards = cards.children.length + 1

      let data = card.querySelector(".debug-data")
      if (!data) {
        data = document.createElement("div")
        data.classList.add("debug-data")
        card.appendChild(data)
      } else {
        data.innerHTML = ""
      }

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
      const cardHeightData = getComputedStyle(card).getPropertyValue("height").replace("px", "")
      const cardHeightText = `Card Height: ${cardHeightData}`
      cardHeightEl.textContent = cardHeightText
      data.appendChild(cardHeightEl)
      //Card Width
      const cardWidthEl = document.createElement("p")
      const cardWidthData = getComputedStyle(card).getPropertyValue("width")
      const cardWidthValueString = cardWidthData.replace("px", "")
      const cardWidthValue = parseFloat(cardWidthValueString).toFixed(2)
      totalCardWidth += parseFloat(cardWidthValue)
      const cardWidthText = `Card Width: ${cardWidthData}`
      cardWidthEl.textContent = cardWidthText
      data.appendChild(cardWidthEl)
      //Card Angle
      const cardAngleEl = document.createElement("p")
      const cardAngleData = fromCenterData * offSetAngle
      const cardAngleText = `Card Angle: ${cardAngleData.toFixed(2)} + 270deg`
      cardAngleEl.textContent = cardAngleText
      data.appendChild(cardAngleEl)
      //Card Depth
      const cardDepthEl = document.createElement("p")
      const cardDepthData = getComputedStyle(card).getPropertyValue("--card-depth")
      const cardDepthValue = parseFloat(cardDepthData) / 100
      const cardDepthText = `Card Depth: ${cardDepthValue.toFixed(2)}`
      cardDepthEl.textContent = cardDepthText
      data.appendChild(cardDepthEl)
      //Scale from Center
      //  --scale-from-center-height: calc(var(--height) - abs(var(--cards-from-center)) * var(--card-depth))
      const scaleFromCenterEl = document.createElement("p")
      const scaleFromCenterData = cardHeightData - Math.abs(fromCenterData) * cardDepthValue
      const scaleFromCenterText = `Scale from Center: ${scaleFromCenterData.toFixed(2)}`
      scaleFromCenterEl.textContent = scaleFromCenterText
      data.appendChild(scaleFromCenterEl)
      //X Offset
      //calc(cos(var(--angle)) * var(--radius-horizontal))
      const xOffsetEl = document.createElement("p")
      const horizontalRadius = getComputedStyle(card).getPropertyValue(
        "--radius-horizontal",
      ).replace("cqw","")
      const xOffset = Math.cos((cardAngleData + 270) * (Math.PI / 180)) * horizontalRadius
      xOffsetEl.textContent = `X Offset: ${xOffset.toFixed(2)}`
      data.appendChild(xOffsetEl)
      //Y Offset
      //calc(sin(var(--angle)) * var(--radius-vertical))
      const yOffsetEl = document.createElement("p")
      //calc(100cqw + (100 - calc(100cqh - abs(calc(sibling-index() - (sibling-count() + 1) / 2)) * 5%)))
      const verticalRadius = horizontalRadius + (cardHeightData - Math.abs() )
      
    }
    pTotalCardWidth.textContent = `Total Card Width: ${totalCardWidth}`
  }
  updateCardData()

  const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false
    for (const mutation of mutations) {
      if (mutation.type === "childList" && mutation.target === cards) {
        shouldUpdate = true
      } else if (
        mutation.type === "attributes" &&
        mutation.target.parentNode === cards
      ) {
        shouldUpdate = true
      }
    }
    if (shouldUpdate) updateCardData()
  })

  observer.observe(cards, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"],
  })
}

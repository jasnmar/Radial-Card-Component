//Kicks off the debug controls / scripts
export function debugStartup() {
    //inject debug css
    const cssRef = document.createElement("link")
    cssRef.rel = "stylesheet"
    cssRef.href = "./debug.css"
    document.head.appendChild(cssRef)

    updateCardData()
    setupObserver()
    setupHoverListeners()
}

function updateCardData() {
    const cardComponent = document.getElementById("card-component")
    const cards = cardComponent.children
    const offSetAngle = getArcSpread() / getCardCount()
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        let cardData = card.querySelector(".card-data")
        if (!cardData) {
            cardData = document.createElement("div")
            cardData.className = "card-data"
            card.appendChild(cardData)
        } else {
            cardData.innerHTML = ""
        }
        //Card Index
        //--index: sibling-index();
        const siblingIndex = i + 1
        const cardIndex = document.createElement("p")
        cardIndex.textContent = `${siblingIndex}: Card Index`
        cardData.appendChild(cardIndex)
        //From Center
        //--cards-from-center: calc(var(--index) - (var(--total-siblings) + 1) / 2);
        const fromCenterEl = document.createElement("p")
        const totalCards = cards.length + 1
        const fromCenterData = siblingIndex - totalCards / 2
        const fromCenterText = `${fromCenterData}: From Center`
        fromCenterEl.textContent = fromCenterText
        cardData.appendChild(fromCenterEl)
        //Card Height
        //--scale-from-center-height: calc(var(--height) - abs(var(--cards-from-center)) * var(--card-depth));
        const cardHeightEl = document.createElement("p")
        const cardHeightData = getComputedStyle(card)
            .getPropertyValue("height")
            .replace("px", "")
        const cardHeightText = `${cardHeightData}: Card Height`
        cardHeightEl.textContent = cardHeightText
        cardData.appendChild(cardHeightEl)
        //Card Width
        //aspect-ratio: auto 1 / 1.6;
        const cardWidthEl = document.createElement("p")
        const cardWidthData = getComputedStyle(card).getPropertyValue("width")
        const cardWidthValueString = cardWidthData.replace("px", "")
        const cardWidthValue = parseFloat(cardWidthValueString).toFixed(2)
        const cardWidthText = `${cardWidthValue}: Card Width`
        cardWidthEl.textContent = cardWidthText
        cardData.appendChild(cardWidthEl)
        //Card Angle
        // --angle: calc(var(--cards-from-center) * var(--offset-angle) + 270deg);
        // --offset-angle: calc(var(--arc-spread) / var(--total-siblings))
        // --arc-spread: The angle from the rightmost card to the angle of the leftmost card
        const cardAngleEl = document.createElement("p")
        const cardAngleData = fromCenterData * offSetAngle
        const cardAngleText = `${cardAngleData.toFixed(2)} + 270deg: Card Angle`
        cardAngleEl.textContent = cardAngleText
        // console.log("offSetAngle: ", offSetAngle);
        cardData.appendChild(cardAngleEl)
        //Layer
        //--layer: calc(var(--total-siblings) - abs(var(--cards-from-center)));
        const cardLayerEl = document.createElement("p")
        const cardLayerData = getCardCount() - Math.abs(fromCenterData)
        const cardLayerText = `${cardLayerData}: Layer`
        cardLayerEl.textContent = cardLayerText
        cardData.appendChild(cardLayerEl)
        //Scale from Center
        //--scale-from-center-height: calc(var(--height) - abs(var(--cards-from-center)) * var(--card-depth));
        const cardDepthData =
            getComputedStyle(card).getPropertyValue("--card-depth")
        const cardDepthValue = parseFloat(cardDepthData) / 100
        const scaleFromCenterEl = document.createElement("p")
        const scaleFromCenterData =
            cardHeightData - Math.abs(fromCenterData) * cardDepthValue
        const scaleFromCenterText = `${scaleFromCenterData.toFixed(2)}: Scale / Center `
        scaleFromCenterEl.textContent = scaleFromCenterText
        cardData.appendChild(scaleFromCenterEl)
        //X Position
        const xPositionEl = document.createElement("p")
        const style = getComputedStyle(card)
        const matrix = new DOMMatrix(style.transform)
        const xPos = matrix.m41
        const xPositionText = `${xPos.toFixed(2)}: X Position`
        xPositionEl.textContent = xPositionText
        cardData.appendChild(xPositionEl)
        //Y Position
        const yPositionEl = document.createElement("p")
        const yPos = matrix.m42
        const yPostitionText = `${yPos.toFixed(2)}: Y Position`
        yPositionEl.textContent = yPostitionText
        cardData.appendChild(yPositionEl)
    }
}

function setupObserver() {
    const cardComponent = document.getElementById("card-component")
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false
        for (const mutation of mutations) {
            if (mutation.target === cardComponent) {
                shouldUpdate = true
            }
        }
        if (shouldUpdate) updateCardData()
    })
    observer.observe(cardComponent, {
        childList: true,
        attributes: true,
        attributeFilter: ["style"],
    })
}

function setupHoverListeners() {
    const cardComponent = document.getElementById("card-component")
    cardComponent.addEventListener("mouseover", updateCardData)
    cardComponent.addEventListener("mouseout", updateCardData)
    cardComponent.addEventListener("transitionend", updateCardData)
}

function getCardCount() {
    const cardContainer = document.getElementById("card-component")
    return cardContainer.children.length
}

function getArcSpread() {
    const component = document.getElementById("card-component")
    const currentSpread = getComputedStyle(
        component.children[0],
    ).getPropertyValue("--arc-spread")
    return currentSpread.replace("deg", "")
}

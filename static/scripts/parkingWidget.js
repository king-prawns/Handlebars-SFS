class ParkingWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentParkings = [];
    this.opened = false;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this[attrName] !== newValue) {
      this[attrName] = newValue;
    }
  }
  static get observedAttributes() {
    return ['name', 'airport', 'map', 'features', 'parkings', 'dictionary'];
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (this.name === value) return;
    this._name = value;
    if (this.shadowRoot.children.length > 0) {
      this.setAttribute('name', value);
      this.render();
    }
  }
  get airport() {
    return this._airport;
  }
  set airport(value) {
    if (this.airport === value) return;
    this._airport = value;
    if (this.shadowRoot.children.length > 0) {
      this.setAttribute('airport', value);
      this.render();
    }
  }
  get map() {
    return this._map;
  }
  set map(value) {
    if (this.map === value) return;
    this._map = value;
    if (this.shadowRoot.children.length > 0) {
      this.setAttribute('map', value);
      this.render();
    }
  }
  get parkings() {
    return this._parkings;
  }
  set parkings(value) {
    this._parkings = JSON.parse(value);
  }
  get features() {
    return this._features;
  }
  set features(value) {
    this._features = JSON.parse(value);
  }
  get dictionary() {
    return this._dictionary;
  }
  set dictionary(value) {
    this._dictionary = JSON.parse(value);
  }
  disconnectedCallback() {
    const vendorBtn = Array.from(this.shadowRoot.querySelectorAll('.vendor-area-btn'));
    vendorBtn.map((btn) => {
      btn.removeEventListener('click', this.toggleOpen.bind(this));
      btn.removeEventListener('touchstart', this.toggleOpen.bind(this));
    });
    const parkings = Array.from(this.shadowRoot.querySelectorAll('.parking-area .parking'));
    parkings.map((parking) => {
      parking.removeEventListener('click', this.onSelectParking.bind(this, parking));
      parking.removeEventListener('touchstart', this.onSelectParking.bind(this, parking));
    });
  }
  connectedCallback() {
    this.render();
  }
  addEventClick() {
    const vendorBtn = Array.from(this.shadowRoot.querySelectorAll('.vendor-area-btn'));
    vendorBtn.map((btn) => {
      btn.addEventListener('click', this.toggleOpen.bind(this));
      btn.addEventListener('touchstart', this.toggleOpen.bind(this));
    });
    const parkings = Array.from(this.shadowRoot.querySelectorAll('.parking-area .parking'));
    parkings.map((parking) => {
      parking.addEventListener('click', this.onSelectParking.bind(this, parking));
      parking.addEventListener('touchstart', this.onSelectParking.bind(this, parking));
    });
  }
  setClass(hasClass, className) {
    return hasClass ? className : '';
  }
  toggleOpen(e) {
    e.preventDefault();
    this.opened = !this.opened;
    this.render();
  }
  onSelectParking(parking, e) {
    e.preventDefault();
    const parkingID = parseInt(parking.dataset.id);
    const parkingPrice = parseFloat(parking.dataset.price.replace('EUR', '').trim());
    const parkingIndex = this.currentParkings.map(parking => parking.id).indexOf(parkingID);
    if (parkingIndex < 0) {
      this.currentParkings.push({ id: parkingID, price: parkingPrice});
    } else {
      this.currentParkings.splice(parkingIndex, 1);
    }
    this.dispatchEvent(new CustomEvent('on-select-parking', {
      detail: { 
        parkings: this.currentParkings
      }, bubbles: false
    }));
    this.render();
  }
  checkSelection(parkingID) {
    return (this.currentParkings.map(parking => parking.id).indexOf(parkingID) >= 0) ? 'selected' : '';
  }
  render() {
    this.renderComponent();
    this.addEventClick();
  }
  renderComponent() {
    this.shadowRoot.innerHTML = `
      <style>
      :host {
        display: block;
        contain: content;
        font-family: var(--parking-widget-font-family, 'Arial');
        font-size: var(--parking-widget-font-family, 13px);
      }
      *, *:before, *:after { 
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box; 
      }
      .vendor-area, .parking-area {
        color: var(--parking-vendor-color, #808080);
        padding: 15px;
        min-height: 70px;
        background-color: var(--parking-vendor-background, #fcfcfc);
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        position: relative;
        margin-bottom: 20px;
      }
      .vendor-area-name {
        text-decoration: underline;
      }
      .vendor-area-logo {
        float: right;
        color: #000;
      }
      .vendor-area-btn {
        color: #c42121;
        cursor: pointer;
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
      .vendor-area-btn.hide {
        display: none;
      }
      .vendor-area.open .vendor-area-btn.hide {
        display: block;
      }
      .vendor-area.open .vendor-area-btn.show {
        display: none;
      }
      .vendor-area-content {
        margin: 20px 0;
        border-bottom: 1px solid #e4e4e4;
        display: none;
      }
      .vendor-area-flex {
        display: flex;
        padding: 15px 0;
      }
      .vendor-area-map {
        margin-right: 20px;
      }
      .vendor-area-map img {
        width: 370px;
        border: 1px solid #e9e9e9;
      }
      .vendor-area-features {
        flex: 1;
      }
      .vendor-area-features span {
        display: block;
        margin-bottom: 8px;
      }
      .vendor-area.open .vendor-area-content {
        display: block;
      }
      .parking {
        display: inline-block;
        width: 200px;
        padding: 8px;
        margin: 8px;
        cursor: pointer;
        background-color: #2f6fd6;
      }
      .parking span {
        display: block;
        color: #fff;
        text-align: center;
      }
      .parking.selected {
        background-color: #dd1111;
      }
      @media screen and (max-width: 576px) {
        .vendor-area-map img {
          width: 150px;
        }
        .parking {
            width: 100%;
            display: block;
            margin: 0;
            margin-bottom: 10px;
        }
        .parking:last-child {
          margin: 0;
        }
      }
      </style>
      <div class="vendor-area ${this.opened ? 'open' : ''}">
        <div>
          <span>${this.dictionary.bookYourParking} </span> 
          <span class="vendor-area-name">${this.airport}</span>
          <span class="vendor-area-logo">${this.name}</span>
        </div>
        <div class="vendor-area-content">
          <span>${this.dictionary.featuresTitle}</span>
          <div class="vendor-area-flex">
            <div class="vendor-area-map">
              <img src="${this.map}" alt="${this.airport} map">
            </div>
            <div class="vendor-area-features">
              ${this.features.map(feat => `<span>✅ ${feat}</span>`).join('')}
            </div>
          </div>
        </div>
        <div>
          <span class="vendor-area-btn show">Mostra dettagli</span>
          <span class="vendor-area-btn hide">Nascondi dettagli</span>
        </div>
      </div>
      <div class="parking-area">
        ${this.parkings.map(parking => 
          `<div class="parking ${this.checkSelection(parking.id)}" data-id="${parking.id}" data-price="${parking.price}">
            <span>${parking.indoor ? this.dictionary.indoorSpace : this.dictionary.outdoorSpace}</span>
            <span>${parking.insurance ? this.dictionary.insuranceIncluded : this.dictionary.insuranceExcluded}</span>
            <span>${parking.price}</span>
          </div>`
          ).join('')}
      </div>`;
  }
}

window.customElements.define('parking-widget', ParkingWidget);

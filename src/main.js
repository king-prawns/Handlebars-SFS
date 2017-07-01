import Handlebars from 'handlebars/runtime';
import homeTpl from 'Components/Home/tpl.hbs';
import cartTpl from 'Components/Cart/tpl.hbs';
import '../static/styles/main.scss';

const myRequest = new Request('/data/model.json', {
  method: 'GET',
  headers: new Headers(),
  mode: 'cors',
  cache: 'default'
});
fetch(myRequest).then((response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then((model) => {
      document.getElementById('app').innerHTML = homeTpl({
        name: model.vendor.name,
        departureAirport: model.vendor.departureAirport,
        map: model.vendor.map,
        features: model.vendor.features,
        parkings: model.parkings,
        dictionary: model.dictionary
      });
      document.getElementById('parking-cart').innerHTML = cartTpl({
        parking: []
      });
      // addEventLister on Custom Event of Parking Widget
      const parkingWidget = document.getElementById('myParkingWidget');
      parkingWidget.addEventListener('on-select-parking', (e) => {
        document.getElementById('parking-cart').innerHTML = cartTpl({
          parkings: e.detail.parkings
        });
      }, false);
    });
  }
  return console.log('Oops, we haven\'t got JSON!');
});

Handlebars.registerHelper('json', context => JSON.stringify(context));
Handlebars.registerHelper('total', (parkings) => {
  const total = parkings.reduce((a, b) => a + b.price, 0.00);
  return total.toFixed(2);
});

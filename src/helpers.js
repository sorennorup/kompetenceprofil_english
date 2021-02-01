
function addBackground() {
  $('#accordion__heading').addClass('accordion__heading_background');
  $('#collapse-id').addClass('accordion__minus').removeClass('accordion__plussign');
};
function removeBackground() {
  $('#accordion__heading').removeClass('accordion__heading_background');
  $('#collapse-id').removeClass('accordion__minus').addClass('accordion__plussign');
  
};
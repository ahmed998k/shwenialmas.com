var map = L.map('map', {zoomControl:true}).setView([36.1672,43.9729],15);

// 3D-style dark tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// ALMAS shop marker
var shopMarker = L.marker([36.1672,43.9729]).addTo(map)
.bindPopup("<b>ALMAS</b><br>بۆ فرۆشتن و چاکردنەوەی پێداویستیەکانی ئاو و ئاوەڕۆ<br>📞 07504123111")
.openPopup();

// Auto-detect user location
map.locate({setView:false, maxZoom:16});

map.on('locationfound', function(e){
    var userMarker = L.marker(e.latlng).addTo(map)
    .bindPopup("You are here").openPopup();
    
    var circle = L.circle(e.latlng, {
        radius:50,
        color:'#710a01',
        fillColor:'#710a01',
        fillOpacity:0.2
    }).addTo(map);

    // Optional: fit map bounds to show both markers
    var group = L.featureGroup([shopMarker, userMarker]);
    map.fitBounds(group.getBounds().pad(0.5));
});

map.on('locationerror', function(){
    alert("Could not detect your location.");
});
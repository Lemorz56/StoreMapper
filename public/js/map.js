mapboxgl.accessToken = 
'pk.eyJ1IjoibGVtb3J6NTYiLCJhIjoiY2s1NDBqcjByMDE1ejNla2JwbmIzaWloMiJ9._eDVciQHbROeRIOEnF-InA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-71.157895, 42.707741]
});

//Fetch stores from DB
async function getStores() {
    const res = await fetch('/api/v1/stores');
    const data = await res.json();
    
    //Reconstructure data from fetch - take each into object that looks like this 
    const stores = data.data.map(store => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [store.location.coordinates[0], store.location.coordinates[1]]
            },
            properties: {
                storeID: store.storeID,
                icon: 'shop'
            }
        }
    });

    loadMap(stores);
}

//Below we load the map with stores
function loadMap(stores){
    map.on('load', function () {
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: stores,
                }
            },
            layout: {
                'icon-image': '{icon}-15',
                'icon-size': 1.5,
                'text-field': '{storeID}',
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.9],
                'text-anchor': 'top'
            }
        });
    });
}

getStores();
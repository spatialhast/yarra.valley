mapboxgl.accessToken =
	'pk.eyJ1IjoieWFycmF2YWxsZXkiLCJhIjoiY2o0YWY2aW9qMGlqMTMzcmwzYXg2YjNmNiJ9.54qEdA2hir0YmS4aEt_0xQ';

if (!mapboxgl.supported()) {
	alert('Your browser does not support Mapbox GL');
} else {
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v9',
		center: [145.386, -37.656],
		zoom: 15
	});

	var nav = new mapboxgl.NavigationControl();
	map.addControl(nav, 'bottom-right');

	map.on('load', function () {
		// RASTER FEB
		map.addSource('raster_feb', {
			type: 'raster',
			url: 'mapbox://yarravalley.5ds7ys6r'
		});
		map.addLayer({
			'id': 'raster_feb',
			'type': 'raster',
			'source': 'raster_feb',
			'layout': {
				'visibility': 'visible'
			},
			'minzoom': 0,
			'maxzoom': 22
		});
		// VECTOR FEB
		map.addSource('fill_feb', {
			type: 'vector',
			url: 'mapbox://yarravalley.3bj7zg7j'
		});
		map.addLayer({
			'id': 'fill_feb',
			'type': 'fill',
			'source': 'fill_feb',
			'source-layer': 'yarra_feb-6uhpqg',
			'layout': {
				'visibility': 'visible'
			},
			'paint': {
				'fill-color': {
					property: 'cat',
					type: "categorical",
					stops: [
						['blue', '#0000FF'],
						['green', '#33A02C'],
						['red', '#E31A1C']
					]
				},
				'fill-opacity': 1
			}
		});

		// RASTER JUN
		map.addSource('raster_jun', {
			type: 'raster',
			url: 'mapbox://yarravalley.2pl884ow'
		});
		map.addLayer({
			'id': 'raster_jun',
			'type': 'raster',
			'source': 'raster_jun',
			'layout': {
				'visibility': 'none'
			},
			'minzoom': 0,
			'maxzoom': 22
		});
		// VECTOR JUN
		map.addSource('fill_jun', {
			type: 'vector',
			url: 'mapbox://yarravalley.bwxi7zn5'
		});
		map.addLayer({
			'id': 'fill_jun',
			'type': 'fill',
			'source': 'fill_jun',
			'source-layer': 'yarra_jun-dvct9h',
			'layout': {
				'visibility': 'none'
			},
			'paint': {
				'fill-color': {
					property: 'cat',
					type: "categorical",
					stops: [
						['blue', '#0000FF'],
						['green', '#33A02C'],
						['red', '#E31A1C']
					]
				},
				'fill-opacity': 1
			}
		});

		var monthArr = ['feb', 'jun'];
		var activeLayers = ['fill', 'raster'];

		function getActiveLayers() {
			var month = selectedMonth;

			activeLayers = [];
			$("#menu .active").each(function (index) {
				activeLayers.push($(this).attr('id'));
			});

			map.setLayoutProperty('raster_feb', 'visibility', 'none');
			map.setLayoutProperty('fill_feb', 'visibility', 'none');
			map.setLayoutProperty('raster_jun', 'visibility', 'none');
			map.setLayoutProperty('fill_jun', 'visibility', 'none');

			if (activeLayers.length > 0) {
				activeLayers.forEach(function (item_layer, i, arr) {
					monthArr.forEach(function (item_month, i, arr) {
						var fill_layer = item_layer + '_' + item_month;
						var raster_layer = item_layer + '_' + item_month;
						if (month != item_month) {
							var el = "#legend-" + item_month;
							$(el).css("display", "none");
							map.setLayoutProperty(fill_layer, 'visibility', 'none');
							map.setLayoutProperty(raster_layer, 'visibility', 'none');
						} else {
							var el = "#legend-" + item_month;
							$(el).css("display", "flex");
							map.setLayoutProperty(fill_layer, 'visibility', 'visible');
							map.setLayoutProperty(raster_layer, 'visibility', 'visible');
						};
					});
				});
			};
		};

		var months = [
			'February',
			'June'
		];

		document.getElementById('slider').addEventListener('input', function (e) {
			var month = parseInt(e.target.value, 10);
			filterBy(month);
		});

		var selectedMonth = 'feb';

		function filterBy(month) {
			document.getElementById('month').textContent = months[month];
			selectedMonth = months[month].toLowerCase().substring(0, 3);
			getActiveLayers();
		};

		$("#menu a").click(function (e) {
			var clickedLayer = this.id;
			e.preventDefault();
			e.stopPropagation();

			if (this.className === 'active') {
				this.className = '';
			} else {
				this.className = 'active';
			};

			getActiveLayers();
		});

		filterBy(0);

	});

};
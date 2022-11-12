(() => {
  const data_config = {
    'ann_rain_2019': { 'colourscale': 'viridis' },
    'ann_rain_change_mmday_2065': { 'colourscale': 'viridis' },
    'ann_warming_oC_2065': { 'colourscale': 'viridis' },
    'drought_day_change_2065': { 'colourscale': 'viridis' },
    'max5day_rain_mm_change_2065': { 'colourscale': 'viridis' },
    'number_heatwave_days_change_2065': { 'colourscale': 'viridis' },
    'warmest_dayofyear_change_oC_2065': { 'colourscale': 'viridis' }
  };

  const colourscales = {
    'viridis': new colourScale([{'rgb':[68,1,84],v:0},{'rgb':[72,35,116],'v':0.1},{'rgb':[64,67,135],'v':0.2},{'rgb':[52,94,141],'v':0.3},{'rgb':[41,120,142],'v':0.4},{'rgb':[32,143,140],'v':0.5},{'rgb':[34,167,132],'v':0.6},{'rgb':[66,190,113],'v':0.7},{'rgb':[121,209,81],'v':0.8},{'rgb':[186,222,39],'v':0.9},{'rgb':[253,231,36],'v':1}])
  };

  const hex = new ODI.hexmap(
    document.querySelector('.hexmap__outer'),
    {
      'hexjson': 'resources/climate_projections.hexjson',
      'ready': () => {
        // Build dropdown options
        const hexmap_select = document.querySelector('.hexmap__select');
        for (const key in data_config) {
          let hexmap_opt = document.createElement('option');
          hexmap_opt.innerText = key
          hexmap_opt.value = key
          hexmap_select.appendChild(hexmap_opt)
        }

        // Update hexmap & add auto-update to select change
        updateHexmap(hex, data_config, hexmap_select.value)
        hexmap_select.addEventListener('change', e => {
          updateHexmap(hex, data_config, e.target.value)
        });
      }
    }
  );

  // Tooltip
  hex.on('mouseover', e => {
    const svg = e.data.hexmap.el;
    const hex = e.target;
    let tip = svg.querySelector('.tooltip');
    if (!tip) {
      tip = document.createElement('div');
      tip.classList.add('tooltip');
      svg.appendChild(tip);
    }

    region_name = e.data.data.n;
    region_value = e.data.data[e.data.hexmap.activeKey] || 'No data';
    tip.innerHTML = region_name + '<br>' + region_value;

    const bb = hex.getBoundingClientRect();
    const bbo = svg.getBoundingClientRect();
    tip.style.left = Math.round(bb.left + bb.width/2 - bbo.left + svg.scrollLeft) + 'px';
    tip.style.top = Math.round(bb.top + bb.height/2 - bbo.top) + 'px';
  });

  function colourScale(c) {
    let s = c;
    let n = s.length;
    // Get a colour given a value, and the range minimum/maximum
    this.getValue = (v, min, max) => {
      if (Number.isNaN(v) || typeof v === 'undefined') {
        return 'rgb(225, 225, 225)';
      }

      v = (v - min) / (max - min);
      if (v < 0) return 'rgb('+s[0].rgb.join(',')+')';
      if (v >= 1) return 'rgb('+s[n-1].rgb.join(',')+')';
      for (let c = 0; c < n - 1; c++) {
        const a = s[c];
        const b = s[c+1];
        if (v >= a.v && v < b.v) {
          pc = Math.min(1, (v - a.v) / (b.v - a.v));
          rgb = [
            Math.round(a.rgb[0] + (b.rgb[0] - a.rgb[0]) * pc),
            Math.round(a.rgb[1] + (b.rgb[1] - a.rgb[1]) * pc),
            Math.round(a.rgb[2] + (b.rgb[2] - a.rgb[2]) * pc)
          ];
          return 'rgb(' + rgb.join(',') + ')';
        }
      }
    };

    return this;
  }

  function updateHexmap(obj, all_data_config, key) {
    if (!(key in all_data_config)) {
      console.error('Error: ' + key + ' not found in config');
      return;
    }

    const config = all_data_config[key];
    const colourscale = colourscales[config.colourscale];
    const data = Object.values(obj.mapping.hexes)
      .map(item => item[key] || Number.NaN)
      .filter(item => !Number.isNaN(item));

    vmin = Math.min(...data);
    vmax = Math.max(...data);
    obj.updateColours(r => colourscale.getValue(obj.mapping.hexes[r][key], vmin, vmax));
    obj.activeKey = key
  }
})();

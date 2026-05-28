// Port of the scoring algorithm in source/index.html.
// Returns ranked array of { name, score, data, dims, bestFor }.

(function () {
  function haversineKm(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }

  function scoreNeighborhoods(prefs, data, lifestyleValues) {
    const CATS = window.LIFESTYLE_CATS;
    return Object.entries(data).map(([name, n]) => {
      let rentScore;
      if (n.avg_rent <= prefs.maxRent) rentScore = 100;
      else if (n.avg_rent >= prefs.maxRent * 1.5) rentScore = 0;
      else rentScore = 100 * (1 - (n.avg_rent - prefs.maxRent) / (prefs.maxRent * 0.5));

      const safetyScore = 100 - n.crime_rate;

      const isRemote = prefs.workLocation === 'remote';
      let commuteScore = null;
      if (!isRemote) {
        const workN = data[prefs.workLocation];
        const km = haversineKm(n.lat, n.lng, workN.lat, workN.lng);
        const estMin = km * 3;
        if (estMin <= prefs.maxCommute) commuteScore = 100;
        else if (estMin >= prefs.maxCommute * 2) commuteScore = 0;
        else commuteScore = 100 * (1 - (estMin - prefs.maxCommute) / prefs.maxCommute);
      }

      const dimScores = {
        dining:   n.nightlife_density,
        outdoors: (n.parks_nearby / 6) * 100,
        walkable: n.walkability,
        quiet:    100 - n.noise_complaints,
        arts:     n.nightlife_density * 0.4 + n.cultural_pois * 0.6,
        fitness:  (n.parks_nearby / 6) * 100 * 0.3 + n.gym_density * 0.7,
      };
      let totalWeight = 0, weightedSum = 0;
      CATS.forEach(cat => {
        const w = lifestyleValues[cat.key];
        if (w > 0) { weightedSum += w * dimScores[cat.key]; totalWeight += w; }
      });
      const lifestyleScore = totalWeight > 0 ? weightedSum / totalWeight : 0;

      const parkingScore = prefs.hasCar ? (100 - n.parking_difficulty) : 100;

      const lifestyleEngagement = CATS.reduce((s, c) => s + lifestyleValues[c.key], 0) / CATS.length;
      const rawW = {
        rent:      0.30,
        safety:    0.10 + lifestyleValues['quiet'] * 0.15,
        commute:   isRemote ? 0 : 0.20,
        lifestyle: totalWeight > 0 ? 0.15 + lifestyleEngagement * 0.20 : 0,
        parking:   prefs.hasCar ? 0.15 : 0.05,
      };
      const wTotal = Object.values(rawW).reduce((a, b) => a + b, 0);
      const w = Object.fromEntries(Object.entries(rawW).map(([k, v]) => [k, v / wTotal]));

      const dims = {
        'Rent fit':  rentScore,
        'Safety':    safetyScore,
        'Lifestyle': lifestyleScore,
        'Parking':   parkingScore,
        ...(isRemote ? {} : { 'Commute': commuteScore }),
      };
      const final = Math.round(
        rentScore * w.rent + safetyScore * w.safety +
        (commuteScore ?? 0) * w.commute + lifestyleScore * w.lifestyle +
        parkingScore * w.parking
      );

      const attrs = [
        { label: 'walkability', val: n.walkability },
        { label: 'dining',      val: n.nightlife_density },
        { label: 'safety',      val: 100 - n.crime_rate },
        { label: 'transit',     val: n.transit_score },
        { label: 'parks',       val: (n.parks_nearby / 6) * 100 },
        { label: 'quiet',       val: 100 - n.noise_complaints },
      ];
      attrs.sort((a, b) => b.val - a.val);
      const bestFor = attrs.slice(0, 2).map(a => a.label).join(' + ');

      return { name, score: final, data: n, dims, bestFor };
    }).sort((a, b) => b.score - a.score);
  }

  function scoreColor(score) {
    if (score > 75) return '#1D9E75';
    if (score >= 50) return '#BA7517';
    return '#E24B4A';
  }

  function crimeLabel(rate) {
    if (rate < 35) return 'Low';
    if (rate < 65) return 'Medium';
    return 'High';
  }

  window.scoreNeighborhoods = scoreNeighborhoods;
  window.scoreColor = scoreColor;
  window.crimeLabel = crimeLabel;
})();

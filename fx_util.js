module.exports = {
    
    /** Returns an integer between min..max (inclusive) */
    // http://stackoverflow.com/a/1527820
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /** Returns a value between a and b, linearly depending on percent, with percent=0 -> a and percent=100 -> b */
    map: function(a, b, percent) {
        percent = Math.min(100, Math.max(0, percent))
        return Math.floor((a * (100-percent) + b * percent) / 100)
    },

    /** Returns a color, linearly mapped in RGB space between col1 and col2, with percent 0..100 */
    mapColor: function(col1, col2, percent) {
        var result = {r: 0, g: 0, b: 0}
        result.r = this.map(col1.r, col2.r, percent)
        result.g = this.map(col1.g, col2.g, percent)
        result.b = this.map(col1.b, col2.b, percent)
        return result
    },
	
	/** Returns an array of colors of length targetLength  based on copying newColors onto existingColors starting at index startIndex. Missing colors are filled with black.
	 *  Usage to ensure a certain length: mergeColors(targetLength, colors)
	 *  Usage to just return all black: mergeColors(targetLength)
	 */
	mergeColors: function(targetLength, existingColors, newColors, startIndex) {
        var defaultColor = {r: 0, g: 0, b: 0}
		if (newColors === undefined) newColors = []
		if (startIndex === undefined) startIndex = 0
		if (existingColors === undefined) existingColors = []
		for(var i = existingColors.length; i < targetLength; i++) {
			existingColors[i] = defaultColor
		}
        var prefix = existingColors.slice(0, startIndex)
        var postfix = existingColors.slice(startIndex + newColors.length)
        var result = prefix.concat(newColors, postfix)
        result = result.slice(0, targetLength)
		return result
    },
    
    rgb2html: function(col) {
        return "#" + ((1 << 24) + (col.r << 16) + (col.g << 8) + col.b).toString(16).slice(1);
    },

    html2rgb: function(html) {
        var result = /^#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/i.exec(html);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
	
    rgb: function(r, g, b) {
        return {
            r: r,
            g: g,
            b: b
        }
    },

    /** returns the 32bit int representation of the r,g,b color.
     * Note: ensures that b != 255 as this triggers a special mode in the ALDI led strip
     */
    rgb2Int: function(r, g, b) {
        if (b == 255) { b = 254 }
        return ((r & 0xff) << 16) + ((b & 0xff) << 8) + (g & 0xff)
    }
}

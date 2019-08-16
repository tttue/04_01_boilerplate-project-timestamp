module.exports = {
	refineDateString: function(date_s) {
		function refine(data) {
			data = data.replace(/^0*/, "");
			if (data.length < 2) {
				data = "0" + data;
			}
			return data;
		}
		var dateA = date_s.split("-")
		var year = dateA[0], month = dateA[1], day = dateA[2];

		return year + "-" + refine(month) + "-" + refine(day);
	}
}
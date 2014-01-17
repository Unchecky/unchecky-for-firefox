(function(){
	var rules = [
		{
			id: 'offerCheckbox',				//id of the element to uncheck
			urls: [								//urls to search in
				/^https?:\/\/get[23]?\.adobe\.com\/(.*?\/)?(reader|flashplayer)\/.*$/
			]
		}
	];

	var warning_message = self.options.warning_message;

	for(i = 0; i < rules.length; i++){ //for each rule
		var id = rules[i].id;
		var urls = rules[i].urls;
		for(j = 0; j < urls.length; j++){ //for each url
			if(urls[j].test(location.href)){
				/*  at this time, the DOM tree is ready, but Adobe creates the checkbox
				 *  dynamically, so we have to wait for it, using a timer
				 */
				setupTimer(id);
				break;
			}
		}
	}

	function setupTimer(id){
		var tmr = setInterval(function(){
			var ck = document.getElementById(id);
			if(typeof ck !== "undefined" && ck != null){
				clearInterval(tmr); //stop searching
				if(ck.checked){
					ck.click();
				}
				ck.addEventListener("click", function(evt){ //warn user if manually clicks
					if(ck.checked && !confirm(warning_message)){
						setTimeout(function(){ //allow the browser to process the event before clicking again
							ck.click();
						}, 1);
					}
				}, false);
			}
		}, 200);
	}
})();

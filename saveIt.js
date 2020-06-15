// Source: https://www.jqueryscript.net/form/jQuery-Plugin-To-Store-Form-Values-Into-Local-Storage-saveIt.html

if(typeof(Storage) !== "undefined") {	
	$(window).load(function() {
		$(document).ready(function() {
			$('.saveIt').each(function(index){
				
				var textFieldName = $(this).attr('name');
				var fieldValue = localStorage.getItem(textFieldName);	
				var standard = $(this).is('input[type=datetime], input[type=date], :text, select, input[type=datetime-local], input[type=email], input[type=hidden], input[type=month], input[type=number], input[type=password], input[type=range], input[type=search], input[type=tel], input[type=url], input[type=week] ');			
					switch(true){
						case standard:
							if(fieldValue != null){
								$(this).val(fieldValue);
							}
						break;
						case $(this).is('textarea'):
							$(this).text(fieldValue);
						break;
						case $(this).is(':checkbox'):
							if(fieldValue == 'true'){
								$(this).prop('checked', true);
							}else{
								$(this).prop('checked', false);
							}
						break;
						case $(this).is(':radio'):
							if(fieldValue != null){
								$("input[name=" + textFieldName + "][value=" + fieldValue + "]").prop('checked', true);
							}
						break;
						case $(this).is(':file, input[type=image]'):
							$(this).removeClass('saveIt');
							console.log('[File upload], [image] are not allowed, class saveIt removed.');
						break;
						default: console.log('Element is no input.');
					}
							
			});
			var timer = null;
			$('.saveIt').keydown(function(){
				clearTimeout(timer); 
				timer = setTimeout(storeData, 100);
			});
			
			//Het tweede event wordt getriggerd wanneer de muisknop omhoog wordt gehaald.
			$('.saveIt').mouseup(function(){
				storeData();
			});
			
			function storeData() {
				localStorage.setItem($(':focus').attr('name'),$(':focus').val());
				if($(':focus').is(':checkbox')){
					if($(':focus').prop('checked')){
						localStorage.setItem($(':focus').attr('name'),'false');
					}else{
						localStorage.setItem($(':focus').attr('name'),'true');
					}
				} 		
			}
					
			$('.removeIt').click(function() {
				localStorage.clear();
				$('.saveIt').val('');
				$('.saveIt').text('');
				$('.saveIt').prop('checked',false);
			});
		});
	});
}else{
	console.log('-**This website or browser does not support HTML5**-');
}



HTMLFormElement.prototype.save = function(config){
	
	let form = this;
	
	form.addEventListener('submit', e=>{
		
		e.preventDefault(); //cancelar o envio padrão de enviar o post e atualizar a página. Agora, vamos enviar via ajax
		
		let formData = new FormData(form); //carrega os dados do formulário para um objeto
		
		//enviar os dados via ajax para o servidor
		fetch(form.action, {
			method: form.method,
			body: formData
		})
		.then(response => response.json())
			.then(json => {
				
				if (json.error) {
					
					if (typeof config.failure === 'function') config.failure(json.error);
					
				} else {
					
					if (typeof config.success === 'function') config.success(json);
					
				}
				
			}).catch(err =>{
				
				if (typeof config.failure === 'function') config.failure(err);
				
			});
		
	});
	
}
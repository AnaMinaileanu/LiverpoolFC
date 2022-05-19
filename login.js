const form = document.querySelector('.forms form');
const inputs = document.querySelectorAll('.forms input');
const successMessage = document.querySelector('#yes');
const btn = document.getElementById('submit-button');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	inputs.forEach((input) => {

		if (!input.value) {
			input.parentElement.classList.add('error');
		} else {
			input.parentElement.classList.remove('error');
			if (input.type == 'email') 
			{
				if (validateEmail(input.value)) {
					input.parentElement.classList.remove('error');
				} else {
					input.parentElement.classList.add('error');
				}
			}
		}
	});

    btn.addEventListener('click', function handleClick(event) {
 
        event.preventDefault();
      
        inputs.forEach(input => {
          input.value = '';
        });
      
        successMessage.classList.add('show');
        setTimeout("location.href = 'home.html';",5000);
      
      });

});

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}





function openForm(productTitle) {
    document.getElementById('form-title').textContent = `Responda el formulario ${productTitle}:`;
    document.getElementById('form-popup').style.display = 'block';
}
function closeForm() {
    document.getElementById('form-popup').style.display = 'none';
}
async function submitForm(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('purchase-form'));
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    };

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Lo siento, ocurrio un error, intentalo despues o actualiza la pagina.');
        }
        alert('Sus datos se han registrados correctamente.');
        closeForm();
    } catch (error) {
        console.error('Error:', error.message);
        alert(`ocurrio un error, inténtelo más tarde.`);
    }
}



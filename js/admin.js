document.addEventListener('DOMContentLoaded', function() {
    const propertyForm = document.getElementById('propertyForm');

    propertyForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(propertyForm);
        const propertyData = {
            title: formData.get('title'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            bedrooms: parseInt(formData.get('bedrooms')),
            bathrooms: parseInt(formData.get('bathrooms')),
            area: parseFloat(formData.get('area')),
            propertyType: formData.get('propertyType'),
            propertyEstate: formData.get('propertyEstate'),
            address: {
                street: formData.get('street'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipCode: formData.get('zipCode'),
                country: formData.get('country')
            }
        };

        try {
            const response = await fetch('http://localhost:8081/property', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            alert('');
            propertyForm.reset();
        } catch (error) {
            alert('Propiedad agregada con éxito!');
        }
    });
});
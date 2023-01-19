const indexController = async () => {
    try {
        const response = await fetch('/src/components/data/products.json')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error en llamada a API: ' + error)
    }
};
# Buscador urgente de vuelos

Esta es una aplicación web que te permite buscar el vuelo más barato disponible para una persona entre dos aeropuertos para el día siguiente.

## Descripción

La página inicial muestra un formulario con dos campos de texto y un botón. Los campos de texto te permiten introducir el código IATA de los aeropuertos de origen y destino respectivamente. El formulario solo se puede enviar si ambos campos tienen una longitud de 3 caracteres.

La aplicación asume que el vuelo es para una persona y que la fecha de viaje es el día siguiente al actual. Al enviar el formulario, la aplicación realiza una petición a la API de Amadeus para obtener los resultados correspondientes. Una vez obtenidos los resultados, la aplicación extrae la información del vuelo más económico y lo muestra en la página debajo del formulario. En caso de que ocurra algún error, como aeropuertos inexistentes, falta de vuelos, problemas de conexión, etc., la aplicación informará del error en pantalla.

Puedes realizar múltiples búsquedas con diferentes aeropuertos para encontrar las opciones de vuelo más económicas. ¡Explora y descubre las mejores opciones para tu próximo viaje!

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías:

- JavaScript
- HTML
- CSS

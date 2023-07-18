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



# Urgent Flight Finder

This is a web application that allows you to search for the cheapest flight available for one person between two airports for the next day.

## Description

The home page displays a form with five text fields and a button. The text fields allow you to enter the IATA code of the origin and destination airports respectively. The form can only be submitted if both fields are 3 characters long.

The application assumes that the flight is for one person and that the travel date is the day after the current day. When submitting the form, the application makes a request to the Amadeus API to obtain the corresponding results. Once the results are obtained, the application extracts the information of the cheapest flight and displays it on the page below the form. In case of any errors, such as non-existent airports, missing flights, connection problems, etc., the application will report the error on the screen.

You can perform multiple searches with different airports to find the cheapest flight options. Explore and discover the best options for your next trip!

## Technologies used

The project was developed using the following technologies:

- JavaScript
- HTML
- CSS

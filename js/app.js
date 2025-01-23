
//ACOMODAR NOMBRES DE LAS VARIABLES EN INGLES Y DE LOS IDS!!!!!!!
//LOS IDS EN  EL INDEX.HTML TAMBIEN DEBEN SER MODIFICADOS!!!!!!!

// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
          // console.log(articulosCarrito);
          carritoHTML();
     });

     // Scroll infinito
window.addEventListener('scroll', () => {
     if (window.scrollY + window.innerHeight === document.body.scrollHeight) {
         window.scrollTo(1120,625)}
     })
 
     document.addEventListener('DOMContentLoaded', () => {
         let timeout;
     
         window.addEventListener('mousemove', () => {
             clearTimeout(timeout);
             timeout = setTimeout(() => {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
             }, 3000); // 5 segundos
         });
     });
}


// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad =  cantidad;
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }     
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}

// buscador
document.addEventListener('DOMContentLoaded', function() {
     const form = document.getElementById('busqueda');
     const buscador = document.getElementById('buscador');
     const cursos = Array.from(document.querySelectorAll('.card'));
     const contenedor = document.getElementById('lista-cursos');

     form.addEventListener('submit', (e) => {
       e.preventDefault();
       const textoBusqueda = buscador.value.trim().toLowerCase();
       if (textoBusqueda) {
         const resultadosBusqueda = cursos.filter(curso =>
           curso.querySelector('h4').textContent.toLowerCase().includes(textoBusqueda)
         );
         mostrarResultados(resultadosBusqueda);
       } else {
         console.log('No se ha introducido texto de búsqueda');
         mostrarResultados(cursos); // Muestra todos los cursos si la búsqueda está vacía
       }
     });

     function mostrarResultados(resultados) {
       contenedor.innerHTML = '';
       resultados.forEach(resultado => contenedor.appendChild(resultado));
     }
});


    document.addEventListener('DOMContentLoaded', () => {
        function initRating(containerId, valueId) {
            const stars = document.querySelectorAll(`#${containerId} .star`);
            const ratingValue = document.getElementById(valueId);
            
            stars.forEach(star => {
                star.addEventListener('click', () => {
                    let selectedValue = star.getAttribute('data-value');
                    stars.forEach((s, index) => {
                        if (index < selectedValue) {
                            s.classList.add('selected');
                        } else {
                            s.classList.remove('selected');
                        }
                    });
                });
    
                star.addEventListener('mouseover', () => {
                    let hoverValue = star.getAttribute('data-value');
                    stars.forEach((s, index) => {
                        if (index < hoverValue) {
                            s.classList.add('hovered');
                        } else {
                            s.classList.remove('hovered');
                        }
                    });
                });
    
                star.addEventListener('mouseleave', () => {
                    stars.forEach(s => s.classList.remove('hovered'));
                });
            });
        }
    
        initRating('rating1', 'value1');
        initRating('rating2', 'value2');
        initRating('rating3', 'value5');
        initRating('rating4', 'value4');
        initRating('rating5', 'value5');
        initRating('rating6', 'value6');
        initRating('rating7', 'value7');
        initRating('rating8', 'value8');
    });
$(document).ready(() =>{
    //Listado de usuarios
   const list = () =>{
   $.ajax({
       url:"http://localhost:8080/usuario",
       type:"GET",
       dataType:"json",
       success:function(res){
           let data="";
           res.forEach(element => {
               data+=`
                    <tr usuarioId = ${element.id} >
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.lastname}</td>
                        <td>${element.cell}</td>
                        <td>${element.email}</td>
                        <td>${element.password}</td>
                        <td>
                        <button id="eliminar" class="btn btn-danger">Eliminar</button>
                        </td>
                        <td>
                        <button id="actualizar" class="btn btn-primary ">Editar</button>
                        </td>
                    </tr>
               `
           });
           $("tbody").html(data);
    }
    })
}

//Guardar Usuario
    const save = () => {
        $("#agregar").on("click",function(){
            const datosUsuario={
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                cell: $("#cell").val(),
                email: $("#email").val(),
                password: $("#password").val(),
            }
            $.ajax({
                url:"http://localhost:8080/usuario",
                contentType:"application/json",
                type:"POST",
                data:JSON.stringify(datosUsuario),
                dataType:"json", 
                success: (data) =>{
                    $("#mensaje").html(`Usuario creado: Id:${data.id}  Nombre:${data.name}  Apellido:${data.lastname}
                    Email:${data.email}`).css("display","block").removeClass('alert alert-danger alert alert-info').addClass('alert alert-success');
                    reset();
                    list();
                }
            })
        })
    }

//Eliminar Usuario
const deleteUsuario = () => {
    $(document).on('click', '#eliminar', function(){
        if(confirm('Seguro desea eliminar ?')){
            let btnDelete = $(this)[0].parentElement.parentElement;
            let id = $(btnDelete).attr('usuarioId');
            $.ajax({
                url: "http://127.0.0.1:8080/usuario/" + id,
                type: 'DELETE',
                success: (data) => { 
                    $('#mensaje').html(data).css('display', 'block').addClass('alert alert-danger');
                    borrarBusqueda();
                    list();
                } 
            })
        }
    })
}

const buscarUsuario = () => {
    $("#buscar").on("click",function(){
       let parametro= $("#busqueda").val();
       let seleccion=$("#seleccion").val();
       if(seleccion==1){
            $.ajax({
                url: "http://127.0.0.1:8080/usuario/"+parametro,
                type: 'GET',
                dataType: 'json',
                success: function(res){
                            data= 
                                `
                                <tr usuarioId= ${res.id}>
                                    <td>${res.id}</td>
                                    <td>${res.name}</td>
                                    <td>${res.lastname}</td>
                                    <td>${res.cell}</td>
                                    <td>${res.email}</td>
                                    <td>${res.password}</td>
                                    <td>
                                    <button id="eliminar" class="btn btn-danger">Eliminar</button>
                                    </td>
                                    <td>
                                    <button id="actualizar" class="btn btn-primary ">Editar</button>
                                    </td>
                                </tr>
                                `
                    
                        $('#tbody').html(data);
                }
            })

        }else if(seleccion==2){
            $.ajax({
                url: "http://127.0.0.1:8080/usuario/query?prioridad="+parametro,
                type: 'GET',
                dataType: 'json',
                
                success: function(res){
                    let data="";
                    res.forEach(element => {
                        data+=`
                             <tr usuarioId = ${element.id} >
                                <td>${element.id}</td>
                                <td>${element.name}</td>
                                <td>${element.lastname}</td>
                                <td>${element.cell}</td>
                                <td>${element.email}</td>
                                <td>${element.password}</td>
                                <td>
                                <button id="eliminar" class="btn btn-danger">Eliminar</button>
                                </td>
                                <td>
                                <button id="actualizar" class="btn btn-primary ">Editar</button>
                                </td>
                             </tr>
                        `
                    });
                    $("tbody").html(data);
                }
            })
            

        }



    }

    )
}

//Rellenar los datos del alumno en el formualario
const rellenarUsuario = () => {
    $(document).on('click', '#actualizar', function(){
        let btnEdit= $(this)[0].parentElement.parentElement;
        let id = $(btnEdit).attr('usuarioId');
        console.log(id,btnEdit);
       $('#agregar').hide();
       $('#editar').show();
       $.ajax({
           url:"http://127.0.0.1:8080/usuario/" + id,
           type:  'GET',
           dataType: 'json',
           success:  (res) => {
               $('#id').val(res.id);
               $('#name').val(res.name);
               $('#lastname').val(res.lastname);
               $('#cell').val(res.cell);
               $('#email').val(res.email);
               $('#password').val(res.password);
           }
       })
    })

}

//Método para modificar los datos de los alumnos
const editUsuario = () => {
    $('#editar').on('click', function(){
        let id = $('#id').val();
        $('#agregar').css('display', 'none');
        $('#editar').css('display', 'block');
        
        const datosUsuario = {
            id:$('#id').val(),
            name: $("#name").val(),
                lastname: $("#lastname").val(),
                cell: $("#cell").val(),
                email: $("#email").val(),
                password: $("#password").val(),
        }
        $.ajax({
            url: "http://127.0.0.1:8080/usuario",
            
            contentType: 'application/json',
            type: 'POST',
            data:JSON.stringify(datosUsuario),
            dataType: 'json',
            success:  (res) => {
                $('#messages').html('Usuario modificado').css('display','block')
                $('#editar').css('display', 'none');
                $('#agregar').css('display','block');
                $("#mensaje").html(`Usuario con el Id:  ${res.id} Editado, Nombre: ${res.name}, Apellido: ${res.lastname}, email: ${res.email}`).css("display","block").removeClass('alert alert-danger alert alert-success').addClass('alert alert-info');
                reset();
                borrarBusqueda();
                list();
            }

        })
    })
}

const borrarBusqueda = () =>{
    $("#busqueda").val("");
    $("#seleccion").val("");
}

//metodo para limpiar el formulario
const reset = () =>{
    $('#name').val("");
    $('#lastname').val("");
    $('#cell').val("");
    $('#email').val("");
    $('#password').val("");
}

// LLamado a las funciones
list();
save();
deleteUsuario();
buscarUsuario();
rellenarUsuario();
editUsuario();

})
import { ChangeEvent, useEffect, useState } from "react"
import { appsettings } from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Container,Row,Col, Form,FormGroup, Label, Input, Button } from "reactstrap"
import { Iitems } from "../Interfaces/Iitems"

const initialItem = {
     idEmpleado: 0,
     nombre: "",
     correo: "",
     sueldo: 0,
     descripcion: "",
     price: 0,
     stock: 0
}


export function Editar() {

     const {id} = useParams<{id:string}>()
     const [item,setItem] = useState<Iitems>(initialItem)
     const navigate = useNavigate()

     useEffect(() => {
          const obtenerItem = async() =>{
               const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`)
               if(response.ok){
                    const data = await response.json();
                    setItem(data);
               }
          }

          obtenerItem()
     },[])

     const inputChangeValue = (event : ChangeEvent<HTMLInputElement>)=> {
          const inputName = event.target.name;
          const inputValue = event.target.value;

          setItem({ ...item, [inputName] : inputValue})
     }

     const guardar = async () =>{
          const response = await fetch(`${appsettings.apiUrl}Item/Editar`,{
               method: 'PUT',
               headers:{
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify(item)
          })
          if(response.ok){
               navigate("/")
          }else{
               Swal.fire({
                    title: "Error!",
                    text: "No se pudo editar el item",
                    icon: "warning"
                  });
          }

     }

     const volver = () =>{
          navigate("/")
     }

     return(
          <Container className="mt-5">
          <Row>
               <Col sm={{size:8, offset:2}}>
                    <h4>Editar item</h4>
                    <hr/>
                    <Form>
                         <FormGroup>
                              <Label>Nombre</Label>
                              <Input type="text" name="nombre" onChange={inputChangeValue} value={item.nombre} />
                         </FormGroup>
                         <FormGroup>
                              <Label>descripcion</Label>
                              <Input type="text" name="descripcion" onChange={inputChangeValue} value={item.descripcion} />
                         </FormGroup>
                         <FormGroup>
                              <Label>precio</Label>
                              <Input type="number" name="precio" onChange={inputChangeValue} value={item.price} />
                         </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary"  onClick={volver}>Volver</Button>
               </Col>
          </Row>
    </Container>
     )
}

import { ChangeEvent, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Iitems } from "../Interfaces/Iitems";

const initialItem = {
  nombre: "",
  descripcion: "",
  price: 0,
  stock: 0
};

export function NuevoItem() {
  const [item, setItem] = useState<Iitems>(initialItem);
  const navigate = useNavigate();

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setItem({ ...item, [inputName]: inputValue });
  };

  const guardar = async () => {
    // Transformar objeto para que coincida con el backend
    const itemToSend = {
      idProduct: 0, // Ajusta según la lógica de tu backend
      name: item.nombre,
      description: item.descripcion,
      price: item.price,
      stock: item.stock
    };

    const response = await fetch(`${appsettings.apiUrl}Product/nuevo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemToSend)
    });

    if (response.ok) {
      navigate("/");
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se pudo guardar el item",
        icon: "warning"
      });
    }
  };

  const volver = () => {
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Nuevo item</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Nombre</Label>
              <Input type="text" name="nombre" onChange={inputChangeValue} value={item.nombre} />
            </FormGroup>
            <FormGroup>
              <Label>Descripción</Label>
              <Input type="text" name="descripcion" onChange={inputChangeValue} value={item.descripcion} />
            </FormGroup>
            <FormGroup>
              <Label>Precio</Label>
              <Input type="number" name="price" onChange={inputChangeValue} value={item.price} />
            </FormGroup>
            <FormGroup>
              <Label>Stock</Label>
              <Input type="number" name="stock" onChange={inputChangeValue} value={item.stock} />
            </FormGroup>
          </Form>
          <Button color="primary" className="me-4" onClick={guardar}>
            Guardar
          </Button>
          <Button color="secondary" onClick={volver}>
            Volver
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

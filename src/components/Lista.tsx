import { useEffect, useState } from "react";
import { appsettings } from "../settings/appsettings";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Iitems } from "../Interfaces/Iitems";
import { Container, Row, Col, Table, Button } from "reactstrap";

export function Lista() {
  const [items, setItems] = useState<Iitems[]>([]);

  const obtenerItems = async () => {
    const response = await fetch(`${appsettings.apiUrl}Product/Lista`);
    if (response.ok) {
      const data = await response.json();

      // Mapeamos los datos del backend al formato de la interfaz
      const mappedItems: Iitems[] = data.map((item: any) => ({
        idProduct: item.idProduct,
        nombre: item.name,
        descripcion: item.description,
        price: item.price,
        stock: item.stock
      }));

      setItems(mappedItems);
    }
  };

  useEffect(() => {
    obtenerItems();
  }, []);

  const Eliminar = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Eliminar item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${appsettings.apiUrl}Product/Eliminar/${id}`, {
          method: "DELETE"
        });
        if (response.ok) await obtenerItems();
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Lista de Productos</h4>
          <hr />
          <Link className="btn btn-success mb-3" to="/nuevoitem">
            Nuevo Producto
          </Link>

          <Table bordered>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.idProduct}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.price}</td>
                  <td>
                    <Link className="btn btn-primary me-2" to={`/editarempleado/${item.idProduct}`}>
                      Editar
                    </Link>
                    <Button color="danger" onClick={() => Eliminar(item.idProduct!)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

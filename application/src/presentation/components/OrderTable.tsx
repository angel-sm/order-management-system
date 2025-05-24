import { Skeleton, Table } from "@mantine/core";
import ProductCardActionsMenu from "./OrderCardActionsMenu";
import currency from "currency.js";
import NoProductsMessage from "./NoOrdersMessage";
import { useOrderStore } from "../../core/Order/applications/order.stores";

function ProductsTable() {
  const {
    orders,
    loading,
  } = useOrderStore();

   if (!orders.length) {
     return <NoProductsMessage />
   }
 

  const LoaderContainer = (
    <>
      {loading &&
        Array(10)
          .fill(() => Math.random())
          .map(() => <Skeleton height={50} mt={6} />)}
    </>
  );

  const rows = orders.map((order) => (
    <Table.Tr key={order.id}>
      <Table.Td>{order.id}</Table.Td>
      <Table.Td>{(order.products as string[]).join(", ")}</Table.Td>
      <Table.Td>{order.quantity}</Table.Td>
      <Table.Td>{currency(order.total as number).format()}</Table.Td>
      <Table.Td>{order.status}</Table.Td>
      <Table.Td>
        <ProductCardActionsMenu />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {LoaderContainer}
      {!loading && (
        <>
          <Table
            stickyHeader
            stickyHeaderOffset={0}
            c="#fff"
            verticalSpacing="md"
            layout="fixed"
          >
            <Table.Thead>
              <Table.Tr bg="rgba(0,0,0,.9)">
                <Table.Th>Id</Table.Th>
                <Table.Th>Product</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </>
      )}
    </>
  );
}

export default ProductsTable;

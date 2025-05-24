import { Container, Flex, Title, Text } from "@mantine/core";
import ProductList from "../components/OrderList";
import ProductForm from "../components/OrderForm";
import { useWindowSize } from "../../hooks/useWindowSize";
import ProductsTable from "../components/OrderTable";
import { useOrderStore } from "../../core/Order/applications/order.stores";
import { useEffect } from "react";
import { useAuthStore } from "../../core/Auth/application/auth.stores";

const OrdersPage: React.FC = () => {
  const { fetchOrders } = useOrderStore();
  const { user } = useAuthStore();
  const { isMobile } = useWindowSize();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Title c="#fff" order={1} pt="xl">
          My 0rders
        </Title>
        <Text c='#fff' mt={15} ta="center" size="md" fw={500}>
          {user?.email}
        </Text>
      </Flex>
      <ProductForm />
      {isMobile && <ProductList />}
      {!isMobile && <ProductsTable />}
    </Container>
  );
};

export default OrdersPage;

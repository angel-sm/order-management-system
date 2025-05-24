import { Flex, Skeleton } from "@mantine/core";
import ProductCard from "./OrderCard";
import NoProductsMessage from "./NoOrdersMessage";
import { useOrderStore } from "../../core/Order/applications/order.stores";

const ProductList = () => {
  const { orders, loading } = useOrderStore();

  if (!orders.length) {
    return <NoProductsMessage />;
  }

  const LoaderContainer = (
    <>
      {loading &&
        Array(10)
          .fill(() => Math.random())
          .map(() => <Skeleton height={280} />)}
    </>
  );

  const ProductContainer = (
    <>{!loading && orders.map((product) => <ProductCard {...product} />)}</>
  );

  return (
    <>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {LoaderContainer}
        {ProductContainer}
      </Flex>
    </>
  );
};

export default ProductList;

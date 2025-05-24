import { Text, Paper, Title, Grid, Flex } from "@mantine/core";
import currency from "currency.js";
import { Order } from "../../core/Order/domain/Order.entity";

export const ProductCard = ({
  id,
  products,
  status,
  total,
  quantity,
}: Order) => (
  <Paper shadow="lg" pr="xl" pl="md" py="md" w="100%">
    <Grid mb={4}>
      <Grid.Col span={8}>
        <Title order={3}>{id}</Title>
      </Grid.Col>
    </Grid>
    <Grid mt={3}>
      <Grid.Col span={8}>
        <Text>{currency(total).format()}</Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Flex>
          <Text>{status}</Text>
        </Flex>
      </Grid.Col>
      <Grid.Col span={12}>
        <Text>{quantity}</Text>
      </Grid.Col>
      <Grid.Col span={12}>
        <Text>{(products as string[]).join(', ')}</Text>
      </Grid.Col>
    </Grid>
  </Paper>
);

export default ProductCard;

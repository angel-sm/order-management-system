import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconClipboardPlus } from "@tabler/icons-react";
import { Order } from "../../core/Order/domain/Order.entity";
import { useOrderStore } from "../../core/Order/applications/order.stores";

function ProductForm() {
  const { createOrder, fetchOrders } = useOrderStore();

  const title = "New Order";

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Order>({
    mode: "uncontrolled",
    validate: {
      products: (value) =>
        value.toString().length > 0 ? null : "Name is required",
      quantity: (value) => (value >= 0 ? null : "Quantity cannot be negative"),
      total: (value) => (value > 0 ? null : "Price must be greater than zero"),
      status: (value) =>
        value.length > 0 ? null : "Select at least one category",
    },
  });

  const handleSubmit = (values: Order) => {
    console.log(values);
    createOrder(values).finally(() => {
      form.reset();
      fetchOrders();
      close();
    });
  };

  const FormContainer = (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <MultiSelect
        withAsterisk
        label="Products"
        placeholder="Enter product name"
        data={["Electronics", "Clothing", "Books", "Furniture", "Groceries"]}
        key={form.key("products")}
        {...form.getInputProps("products")}
        hidePickedOptions
        maxDropdownHeight={100}
        clearable
        mt="sm"
      />

      <NumberInput
        withAsterisk
        label="Quantity"
        placeholder="Enter quantity"
        key={form.key("quantity")}
        {...form.getInputProps("quantity")}
        mt="sm"
      />

      <NumberInput
        withAsterisk
        label="Total"
        placeholder="Enter total"
        key={form.key("total")}
        {...form.getInputProps("total")}
        mt="sm"
      />

      <Select
        withAsterisk
        label="Status"
        placeholder="Enter order status"
        data={["PENDING", "COMPLETED"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
        maxDropdownHeight={100}
        clearable
        mt="sm"
      />

      <Group justify="flex-end" mt="md">
        <Button type="reset" variant="outline" onClick={close}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        {FormContainer}
      </Modal>

      <Button
        onClick={open}
        leftSection={<IconClipboardPlus size={18} />}
        variant="filled"
        size="compact-sm"
        my="lg"
      >
        New Order
      </Button>
    </>
  );
}

export default ProductForm;

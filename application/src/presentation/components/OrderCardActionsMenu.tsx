import { Button, Grid } from "@mantine/core";
import { IconFileDescriptionFilled } from "@tabler/icons-react";

function ProductCardActionsMenu() {
  return (
    <Grid gutter="xs">
      <Grid.Col span={6}>
        <Button size="compact-md" variant="light">
          <IconFileDescriptionFilled className="text-red-50" />
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export default ProductCardActionsMenu;

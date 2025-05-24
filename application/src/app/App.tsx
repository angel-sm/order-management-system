import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Route, Switch } from "wouter";
import OrdersPage from "../presentation/pages/Orders.page";
import { theme } from "./theme";
import LoginPage from "../presentation/pages/Login.page";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Switch>
        <Route path="/" component={OrdersPage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={LoginPage} />
        <Route>404: Page not found</Route>
      </Switch>
    </MantineProvider>
  );
}

export default App;
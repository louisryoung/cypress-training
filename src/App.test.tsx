import { render, screen, queryByAttribute } from "@testing-library/react";
import App from "./App";

const getById = queryByAttribute.bind(null, "id");

test("renders app", () => {
  const dom = render(<App />);
  const staffType = getById(dom.container, "staff-type");
  expect(staffType).toBeInTheDocument();

  const accountType = getById(dom.container, "account-type");
  expect(accountType).toBeInTheDocument();

  const selectColumnButton = getById(dom.container, "select-column");
  expect(selectColumnButton).toBeInTheDocument();

  const logo = screen.getByAltText("logo");
  expect(selectColumnButton).toBeInTheDocument();
});
